package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.Perceptor;
import es.imserso.techfile.repository.PerceptorRepository;
import es.imserso.techfile.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static es.imserso.techfile.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PerceptorResource REST controller.
 *
 * @see PerceptorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class PerceptorResourceIntTest {

    @Autowired
    private PerceptorRepository perceptorRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPerceptorMockMvc;

    private Perceptor perceptor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PerceptorResource perceptorResource = new PerceptorResource(perceptorRepository);
        this.restPerceptorMockMvc = MockMvcBuilders.standaloneSetup(perceptorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Perceptor createEntity(EntityManager em) {
        Perceptor perceptor = new Perceptor();
        return perceptor;
    }

    @Before
    public void initTest() {
        perceptor = createEntity(em);
    }

    @Test
    @Transactional
    public void createPerceptor() throws Exception {
        int databaseSizeBeforeCreate = perceptorRepository.findAll().size();

        // Create the Perceptor
        restPerceptorMockMvc.perform(post("/api/perceptors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perceptor)))
            .andExpect(status().isCreated());

        // Validate the Perceptor in the database
        List<Perceptor> perceptorList = perceptorRepository.findAll();
        assertThat(perceptorList).hasSize(databaseSizeBeforeCreate + 1);
        Perceptor testPerceptor = perceptorList.get(perceptorList.size() - 1);
    }

    @Test
    @Transactional
    public void createPerceptorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = perceptorRepository.findAll().size();

        // Create the Perceptor with an existing ID
        perceptor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPerceptorMockMvc.perform(post("/api/perceptors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perceptor)))
            .andExpect(status().isBadRequest());

        // Validate the Perceptor in the database
        List<Perceptor> perceptorList = perceptorRepository.findAll();
        assertThat(perceptorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPerceptors() throws Exception {
        // Initialize the database
        perceptorRepository.saveAndFlush(perceptor);

        // Get all the perceptorList
        restPerceptorMockMvc.perform(get("/api/perceptors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(perceptor.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getPerceptor() throws Exception {
        // Initialize the database
        perceptorRepository.saveAndFlush(perceptor);

        // Get the perceptor
        restPerceptorMockMvc.perform(get("/api/perceptors/{id}", perceptor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(perceptor.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPerceptor() throws Exception {
        // Get the perceptor
        restPerceptorMockMvc.perform(get("/api/perceptors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePerceptor() throws Exception {
        // Initialize the database
        perceptorRepository.saveAndFlush(perceptor);

        int databaseSizeBeforeUpdate = perceptorRepository.findAll().size();

        // Update the perceptor
        Perceptor updatedPerceptor = perceptorRepository.findById(perceptor.getId()).get();
        // Disconnect from session so that the updates on updatedPerceptor are not directly saved in db
        em.detach(updatedPerceptor);

        restPerceptorMockMvc.perform(put("/api/perceptors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPerceptor)))
            .andExpect(status().isOk());

        // Validate the Perceptor in the database
        List<Perceptor> perceptorList = perceptorRepository.findAll();
        assertThat(perceptorList).hasSize(databaseSizeBeforeUpdate);
        Perceptor testPerceptor = perceptorList.get(perceptorList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPerceptor() throws Exception {
        int databaseSizeBeforeUpdate = perceptorRepository.findAll().size();

        // Create the Perceptor

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPerceptorMockMvc.perform(put("/api/perceptors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perceptor)))
            .andExpect(status().isBadRequest());

        // Validate the Perceptor in the database
        List<Perceptor> perceptorList = perceptorRepository.findAll();
        assertThat(perceptorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePerceptor() throws Exception {
        // Initialize the database
        perceptorRepository.saveAndFlush(perceptor);

        int databaseSizeBeforeDelete = perceptorRepository.findAll().size();

        // Get the perceptor
        restPerceptorMockMvc.perform(delete("/api/perceptors/{id}", perceptor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Perceptor> perceptorList = perceptorRepository.findAll();
        assertThat(perceptorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Perceptor.class);
        Perceptor perceptor1 = new Perceptor();
        perceptor1.setId(1L);
        Perceptor perceptor2 = new Perceptor();
        perceptor2.setId(perceptor1.getId());
        assertThat(perceptor1).isEqualTo(perceptor2);
        perceptor2.setId(2L);
        assertThat(perceptor1).isNotEqualTo(perceptor2);
        perceptor1.setId(null);
        assertThat(perceptor1).isNotEqualTo(perceptor2);
    }
}

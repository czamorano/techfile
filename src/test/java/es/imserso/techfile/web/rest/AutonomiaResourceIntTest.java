package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.Autonomia;
import es.imserso.techfile.repository.AutonomiaRepository;
import es.imserso.techfile.service.AutonomiaService;
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
 * Test class for the AutonomiaResource REST controller.
 *
 * @see AutonomiaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class AutonomiaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private AutonomiaRepository autonomiaRepository;

    

    @Autowired
    private AutonomiaService autonomiaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAutonomiaMockMvc;

    private Autonomia autonomia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AutonomiaResource autonomiaResource = new AutonomiaResource(autonomiaService);
        this.restAutonomiaMockMvc = MockMvcBuilders.standaloneSetup(autonomiaResource)
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
    public static Autonomia createEntity(EntityManager em) {
        Autonomia autonomia = new Autonomia()
            .nombre(DEFAULT_NOMBRE);
        return autonomia;
    }

    @Before
    public void initTest() {
        autonomia = createEntity(em);
    }

    @Test
    @Transactional
    public void createAutonomia() throws Exception {
        int databaseSizeBeforeCreate = autonomiaRepository.findAll().size();

        // Create the Autonomia
        restAutonomiaMockMvc.perform(post("/api/autonomias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autonomia)))
            .andExpect(status().isCreated());

        // Validate the Autonomia in the database
        List<Autonomia> autonomiaList = autonomiaRepository.findAll();
        assertThat(autonomiaList).hasSize(databaseSizeBeforeCreate + 1);
        Autonomia testAutonomia = autonomiaList.get(autonomiaList.size() - 1);
        assertThat(testAutonomia.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createAutonomiaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = autonomiaRepository.findAll().size();

        // Create the Autonomia with an existing ID
        autonomia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAutonomiaMockMvc.perform(post("/api/autonomias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autonomia)))
            .andExpect(status().isBadRequest());

        // Validate the Autonomia in the database
        List<Autonomia> autonomiaList = autonomiaRepository.findAll();
        assertThat(autonomiaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = autonomiaRepository.findAll().size();
        // set the field null
        autonomia.setNombre(null);

        // Create the Autonomia, which fails.

        restAutonomiaMockMvc.perform(post("/api/autonomias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autonomia)))
            .andExpect(status().isBadRequest());

        List<Autonomia> autonomiaList = autonomiaRepository.findAll();
        assertThat(autonomiaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAutonomias() throws Exception {
        // Initialize the database
        autonomiaRepository.saveAndFlush(autonomia);

        // Get all the autonomiaList
        restAutonomiaMockMvc.perform(get("/api/autonomias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(autonomia.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())));
    }
    

    @Test
    @Transactional
    public void getAutonomia() throws Exception {
        // Initialize the database
        autonomiaRepository.saveAndFlush(autonomia);

        // Get the autonomia
        restAutonomiaMockMvc.perform(get("/api/autonomias/{id}", autonomia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(autonomia.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAutonomia() throws Exception {
        // Get the autonomia
        restAutonomiaMockMvc.perform(get("/api/autonomias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAutonomia() throws Exception {
        // Initialize the database
        autonomiaService.save(autonomia);

        int databaseSizeBeforeUpdate = autonomiaRepository.findAll().size();

        // Update the autonomia
        Autonomia updatedAutonomia = autonomiaRepository.findById(autonomia.getId()).get();
        // Disconnect from session so that the updates on updatedAutonomia are not directly saved in db
        em.detach(updatedAutonomia);
        updatedAutonomia
            .nombre(UPDATED_NOMBRE);

        restAutonomiaMockMvc.perform(put("/api/autonomias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAutonomia)))
            .andExpect(status().isOk());

        // Validate the Autonomia in the database
        List<Autonomia> autonomiaList = autonomiaRepository.findAll();
        assertThat(autonomiaList).hasSize(databaseSizeBeforeUpdate);
        Autonomia testAutonomia = autonomiaList.get(autonomiaList.size() - 1);
        assertThat(testAutonomia.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingAutonomia() throws Exception {
        int databaseSizeBeforeUpdate = autonomiaRepository.findAll().size();

        // Create the Autonomia

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAutonomiaMockMvc.perform(put("/api/autonomias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(autonomia)))
            .andExpect(status().isBadRequest());

        // Validate the Autonomia in the database
        List<Autonomia> autonomiaList = autonomiaRepository.findAll();
        assertThat(autonomiaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAutonomia() throws Exception {
        // Initialize the database
        autonomiaService.save(autonomia);

        int databaseSizeBeforeDelete = autonomiaRepository.findAll().size();

        // Get the autonomia
        restAutonomiaMockMvc.perform(delete("/api/autonomias/{id}", autonomia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Autonomia> autonomiaList = autonomiaRepository.findAll();
        assertThat(autonomiaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Autonomia.class);
        Autonomia autonomia1 = new Autonomia();
        autonomia1.setId(1L);
        Autonomia autonomia2 = new Autonomia();
        autonomia2.setId(autonomia1.getId());
        assertThat(autonomia1).isEqualTo(autonomia2);
        autonomia2.setId(2L);
        assertThat(autonomia1).isNotEqualTo(autonomia2);
        autonomia1.setId(null);
        assertThat(autonomia1).isNotEqualTo(autonomia2);
    }
}

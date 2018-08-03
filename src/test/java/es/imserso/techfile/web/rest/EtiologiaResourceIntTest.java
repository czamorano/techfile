package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.Etiologia;
import es.imserso.techfile.repository.EtiologiaRepository;
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
 * Test class for the EtiologiaResource REST controller.
 *
 * @see EtiologiaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class EtiologiaResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private EtiologiaRepository etiologiaRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEtiologiaMockMvc;

    private Etiologia etiologia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EtiologiaResource etiologiaResource = new EtiologiaResource(etiologiaRepository);
        this.restEtiologiaMockMvc = MockMvcBuilders.standaloneSetup(etiologiaResource)
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
    public static Etiologia createEntity(EntityManager em) {
        Etiologia etiologia = new Etiologia()
            .descripcion(DEFAULT_DESCRIPCION);
        return etiologia;
    }

    @Before
    public void initTest() {
        etiologia = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtiologia() throws Exception {
        int databaseSizeBeforeCreate = etiologiaRepository.findAll().size();

        // Create the Etiologia
        restEtiologiaMockMvc.perform(post("/api/etiologias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etiologia)))
            .andExpect(status().isCreated());

        // Validate the Etiologia in the database
        List<Etiologia> etiologiaList = etiologiaRepository.findAll();
        assertThat(etiologiaList).hasSize(databaseSizeBeforeCreate + 1);
        Etiologia testEtiologia = etiologiaList.get(etiologiaList.size() - 1);
        assertThat(testEtiologia.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createEtiologiaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etiologiaRepository.findAll().size();

        // Create the Etiologia with an existing ID
        etiologia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtiologiaMockMvc.perform(post("/api/etiologias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etiologia)))
            .andExpect(status().isBadRequest());

        // Validate the Etiologia in the database
        List<Etiologia> etiologiaList = etiologiaRepository.findAll();
        assertThat(etiologiaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = etiologiaRepository.findAll().size();
        // set the field null
        etiologia.setDescripcion(null);

        // Create the Etiologia, which fails.

        restEtiologiaMockMvc.perform(post("/api/etiologias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etiologia)))
            .andExpect(status().isBadRequest());

        List<Etiologia> etiologiaList = etiologiaRepository.findAll();
        assertThat(etiologiaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEtiologias() throws Exception {
        // Initialize the database
        etiologiaRepository.saveAndFlush(etiologia);

        // Get all the etiologiaList
        restEtiologiaMockMvc.perform(get("/api/etiologias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etiologia.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    

    @Test
    @Transactional
    public void getEtiologia() throws Exception {
        // Initialize the database
        etiologiaRepository.saveAndFlush(etiologia);

        // Get the etiologia
        restEtiologiaMockMvc.perform(get("/api/etiologias/{id}", etiologia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(etiologia.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingEtiologia() throws Exception {
        // Get the etiologia
        restEtiologiaMockMvc.perform(get("/api/etiologias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtiologia() throws Exception {
        // Initialize the database
        etiologiaRepository.saveAndFlush(etiologia);

        int databaseSizeBeforeUpdate = etiologiaRepository.findAll().size();

        // Update the etiologia
        Etiologia updatedEtiologia = etiologiaRepository.findById(etiologia.getId()).get();
        // Disconnect from session so that the updates on updatedEtiologia are not directly saved in db
        em.detach(updatedEtiologia);
        updatedEtiologia
            .descripcion(UPDATED_DESCRIPCION);

        restEtiologiaMockMvc.perform(put("/api/etiologias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEtiologia)))
            .andExpect(status().isOk());

        // Validate the Etiologia in the database
        List<Etiologia> etiologiaList = etiologiaRepository.findAll();
        assertThat(etiologiaList).hasSize(databaseSizeBeforeUpdate);
        Etiologia testEtiologia = etiologiaList.get(etiologiaList.size() - 1);
        assertThat(testEtiologia.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingEtiologia() throws Exception {
        int databaseSizeBeforeUpdate = etiologiaRepository.findAll().size();

        // Create the Etiologia

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEtiologiaMockMvc.perform(put("/api/etiologias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(etiologia)))
            .andExpect(status().isBadRequest());

        // Validate the Etiologia in the database
        List<Etiologia> etiologiaList = etiologiaRepository.findAll();
        assertThat(etiologiaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEtiologia() throws Exception {
        // Initialize the database
        etiologiaRepository.saveAndFlush(etiologia);

        int databaseSizeBeforeDelete = etiologiaRepository.findAll().size();

        // Get the etiologia
        restEtiologiaMockMvc.perform(delete("/api/etiologias/{id}", etiologia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Etiologia> etiologiaList = etiologiaRepository.findAll();
        assertThat(etiologiaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Etiologia.class);
        Etiologia etiologia1 = new Etiologia();
        etiologia1.setId(1L);
        Etiologia etiologia2 = new Etiologia();
        etiologia2.setId(etiologia1.getId());
        assertThat(etiologia1).isEqualTo(etiologia2);
        etiologia2.setId(2L);
        assertThat(etiologia1).isNotEqualTo(etiologia2);
        etiologia1.setId(null);
        assertThat(etiologia1).isNotEqualTo(etiologia2);
    }
}

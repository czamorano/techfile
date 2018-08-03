package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.RegimenProcedencia;
import es.imserso.techfile.repository.RegimenProcedenciaRepository;
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
 * Test class for the RegimenProcedenciaResource REST controller.
 *
 * @see RegimenProcedenciaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class RegimenProcedenciaResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private RegimenProcedenciaRepository regimenProcedenciaRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRegimenProcedenciaMockMvc;

    private RegimenProcedencia regimenProcedencia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RegimenProcedenciaResource regimenProcedenciaResource = new RegimenProcedenciaResource(regimenProcedenciaRepository);
        this.restRegimenProcedenciaMockMvc = MockMvcBuilders.standaloneSetup(regimenProcedenciaResource)
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
    public static RegimenProcedencia createEntity(EntityManager em) {
        RegimenProcedencia regimenProcedencia = new RegimenProcedencia()
            .descripcion(DEFAULT_DESCRIPCION);
        return regimenProcedencia;
    }

    @Before
    public void initTest() {
        regimenProcedencia = createEntity(em);
    }

    @Test
    @Transactional
    public void createRegimenProcedencia() throws Exception {
        int databaseSizeBeforeCreate = regimenProcedenciaRepository.findAll().size();

        // Create the RegimenProcedencia
        restRegimenProcedenciaMockMvc.perform(post("/api/regimen-procedencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(regimenProcedencia)))
            .andExpect(status().isCreated());

        // Validate the RegimenProcedencia in the database
        List<RegimenProcedencia> regimenProcedenciaList = regimenProcedenciaRepository.findAll();
        assertThat(regimenProcedenciaList).hasSize(databaseSizeBeforeCreate + 1);
        RegimenProcedencia testRegimenProcedencia = regimenProcedenciaList.get(regimenProcedenciaList.size() - 1);
        assertThat(testRegimenProcedencia.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createRegimenProcedenciaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = regimenProcedenciaRepository.findAll().size();

        // Create the RegimenProcedencia with an existing ID
        regimenProcedencia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRegimenProcedenciaMockMvc.perform(post("/api/regimen-procedencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(regimenProcedencia)))
            .andExpect(status().isBadRequest());

        // Validate the RegimenProcedencia in the database
        List<RegimenProcedencia> regimenProcedenciaList = regimenProcedenciaRepository.findAll();
        assertThat(regimenProcedenciaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = regimenProcedenciaRepository.findAll().size();
        // set the field null
        regimenProcedencia.setDescripcion(null);

        // Create the RegimenProcedencia, which fails.

        restRegimenProcedenciaMockMvc.perform(post("/api/regimen-procedencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(regimenProcedencia)))
            .andExpect(status().isBadRequest());

        List<RegimenProcedencia> regimenProcedenciaList = regimenProcedenciaRepository.findAll();
        assertThat(regimenProcedenciaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRegimenProcedencias() throws Exception {
        // Initialize the database
        regimenProcedenciaRepository.saveAndFlush(regimenProcedencia);

        // Get all the regimenProcedenciaList
        restRegimenProcedenciaMockMvc.perform(get("/api/regimen-procedencias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(regimenProcedencia.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    

    @Test
    @Transactional
    public void getRegimenProcedencia() throws Exception {
        // Initialize the database
        regimenProcedenciaRepository.saveAndFlush(regimenProcedencia);

        // Get the regimenProcedencia
        restRegimenProcedenciaMockMvc.perform(get("/api/regimen-procedencias/{id}", regimenProcedencia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(regimenProcedencia.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingRegimenProcedencia() throws Exception {
        // Get the regimenProcedencia
        restRegimenProcedenciaMockMvc.perform(get("/api/regimen-procedencias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRegimenProcedencia() throws Exception {
        // Initialize the database
        regimenProcedenciaRepository.saveAndFlush(regimenProcedencia);

        int databaseSizeBeforeUpdate = regimenProcedenciaRepository.findAll().size();

        // Update the regimenProcedencia
        RegimenProcedencia updatedRegimenProcedencia = regimenProcedenciaRepository.findById(regimenProcedencia.getId()).get();
        // Disconnect from session so that the updates on updatedRegimenProcedencia are not directly saved in db
        em.detach(updatedRegimenProcedencia);
        updatedRegimenProcedencia
            .descripcion(UPDATED_DESCRIPCION);

        restRegimenProcedenciaMockMvc.perform(put("/api/regimen-procedencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRegimenProcedencia)))
            .andExpect(status().isOk());

        // Validate the RegimenProcedencia in the database
        List<RegimenProcedencia> regimenProcedenciaList = regimenProcedenciaRepository.findAll();
        assertThat(regimenProcedenciaList).hasSize(databaseSizeBeforeUpdate);
        RegimenProcedencia testRegimenProcedencia = regimenProcedenciaList.get(regimenProcedenciaList.size() - 1);
        assertThat(testRegimenProcedencia.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingRegimenProcedencia() throws Exception {
        int databaseSizeBeforeUpdate = regimenProcedenciaRepository.findAll().size();

        // Create the RegimenProcedencia

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRegimenProcedenciaMockMvc.perform(put("/api/regimen-procedencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(regimenProcedencia)))
            .andExpect(status().isBadRequest());

        // Validate the RegimenProcedencia in the database
        List<RegimenProcedencia> regimenProcedenciaList = regimenProcedenciaRepository.findAll();
        assertThat(regimenProcedenciaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRegimenProcedencia() throws Exception {
        // Initialize the database
        regimenProcedenciaRepository.saveAndFlush(regimenProcedencia);

        int databaseSizeBeforeDelete = regimenProcedenciaRepository.findAll().size();

        // Get the regimenProcedencia
        restRegimenProcedenciaMockMvc.perform(delete("/api/regimen-procedencias/{id}", regimenProcedencia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RegimenProcedencia> regimenProcedenciaList = regimenProcedenciaRepository.findAll();
        assertThat(regimenProcedenciaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RegimenProcedencia.class);
        RegimenProcedencia regimenProcedencia1 = new RegimenProcedencia();
        regimenProcedencia1.setId(1L);
        RegimenProcedencia regimenProcedencia2 = new RegimenProcedencia();
        regimenProcedencia2.setId(regimenProcedencia1.getId());
        assertThat(regimenProcedencia1).isEqualTo(regimenProcedencia2);
        regimenProcedencia2.setId(2L);
        assertThat(regimenProcedencia1).isNotEqualTo(regimenProcedencia2);
        regimenProcedencia1.setId(null);
        assertThat(regimenProcedencia1).isNotEqualTo(regimenProcedencia2);
    }
}

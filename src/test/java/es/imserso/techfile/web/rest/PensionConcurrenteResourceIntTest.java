package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.PensionConcurrente;
import es.imserso.techfile.repository.PensionConcurrenteRepository;
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
 * Test class for the PensionConcurrenteResource REST controller.
 *
 * @see PensionConcurrenteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class PensionConcurrenteResourceIntTest {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private PensionConcurrenteRepository pensionConcurrenteRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPensionConcurrenteMockMvc;

    private PensionConcurrente pensionConcurrente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PensionConcurrenteResource pensionConcurrenteResource = new PensionConcurrenteResource(pensionConcurrenteRepository);
        this.restPensionConcurrenteMockMvc = MockMvcBuilders.standaloneSetup(pensionConcurrenteResource)
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
    public static PensionConcurrente createEntity(EntityManager em) {
        PensionConcurrente pensionConcurrente = new PensionConcurrente()
            .codigo(DEFAULT_CODIGO)
            .descripcion(DEFAULT_DESCRIPCION);
        return pensionConcurrente;
    }

    @Before
    public void initTest() {
        pensionConcurrente = createEntity(em);
    }

    @Test
    @Transactional
    public void createPensionConcurrente() throws Exception {
        int databaseSizeBeforeCreate = pensionConcurrenteRepository.findAll().size();

        // Create the PensionConcurrente
        restPensionConcurrenteMockMvc.perform(post("/api/pension-concurrentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pensionConcurrente)))
            .andExpect(status().isCreated());

        // Validate the PensionConcurrente in the database
        List<PensionConcurrente> pensionConcurrenteList = pensionConcurrenteRepository.findAll();
        assertThat(pensionConcurrenteList).hasSize(databaseSizeBeforeCreate + 1);
        PensionConcurrente testPensionConcurrente = pensionConcurrenteList.get(pensionConcurrenteList.size() - 1);
        assertThat(testPensionConcurrente.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testPensionConcurrente.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createPensionConcurrenteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pensionConcurrenteRepository.findAll().size();

        // Create the PensionConcurrente with an existing ID
        pensionConcurrente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPensionConcurrenteMockMvc.perform(post("/api/pension-concurrentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pensionConcurrente)))
            .andExpect(status().isBadRequest());

        // Validate the PensionConcurrente in the database
        List<PensionConcurrente> pensionConcurrenteList = pensionConcurrenteRepository.findAll();
        assertThat(pensionConcurrenteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodigoIsRequired() throws Exception {
        int databaseSizeBeforeTest = pensionConcurrenteRepository.findAll().size();
        // set the field null
        pensionConcurrente.setCodigo(null);

        // Create the PensionConcurrente, which fails.

        restPensionConcurrenteMockMvc.perform(post("/api/pension-concurrentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pensionConcurrente)))
            .andExpect(status().isBadRequest());

        List<PensionConcurrente> pensionConcurrenteList = pensionConcurrenteRepository.findAll();
        assertThat(pensionConcurrenteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = pensionConcurrenteRepository.findAll().size();
        // set the field null
        pensionConcurrente.setDescripcion(null);

        // Create the PensionConcurrente, which fails.

        restPensionConcurrenteMockMvc.perform(post("/api/pension-concurrentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pensionConcurrente)))
            .andExpect(status().isBadRequest());

        List<PensionConcurrente> pensionConcurrenteList = pensionConcurrenteRepository.findAll();
        assertThat(pensionConcurrenteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPensionConcurrentes() throws Exception {
        // Initialize the database
        pensionConcurrenteRepository.saveAndFlush(pensionConcurrente);

        // Get all the pensionConcurrenteList
        restPensionConcurrenteMockMvc.perform(get("/api/pension-concurrentes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pensionConcurrente.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    

    @Test
    @Transactional
    public void getPensionConcurrente() throws Exception {
        // Initialize the database
        pensionConcurrenteRepository.saveAndFlush(pensionConcurrente);

        // Get the pensionConcurrente
        restPensionConcurrenteMockMvc.perform(get("/api/pension-concurrentes/{id}", pensionConcurrente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pensionConcurrente.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPensionConcurrente() throws Exception {
        // Get the pensionConcurrente
        restPensionConcurrenteMockMvc.perform(get("/api/pension-concurrentes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePensionConcurrente() throws Exception {
        // Initialize the database
        pensionConcurrenteRepository.saveAndFlush(pensionConcurrente);

        int databaseSizeBeforeUpdate = pensionConcurrenteRepository.findAll().size();

        // Update the pensionConcurrente
        PensionConcurrente updatedPensionConcurrente = pensionConcurrenteRepository.findById(pensionConcurrente.getId()).get();
        // Disconnect from session so that the updates on updatedPensionConcurrente are not directly saved in db
        em.detach(updatedPensionConcurrente);
        updatedPensionConcurrente
            .codigo(UPDATED_CODIGO)
            .descripcion(UPDATED_DESCRIPCION);

        restPensionConcurrenteMockMvc.perform(put("/api/pension-concurrentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPensionConcurrente)))
            .andExpect(status().isOk());

        // Validate the PensionConcurrente in the database
        List<PensionConcurrente> pensionConcurrenteList = pensionConcurrenteRepository.findAll();
        assertThat(pensionConcurrenteList).hasSize(databaseSizeBeforeUpdate);
        PensionConcurrente testPensionConcurrente = pensionConcurrenteList.get(pensionConcurrenteList.size() - 1);
        assertThat(testPensionConcurrente.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testPensionConcurrente.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingPensionConcurrente() throws Exception {
        int databaseSizeBeforeUpdate = pensionConcurrenteRepository.findAll().size();

        // Create the PensionConcurrente

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPensionConcurrenteMockMvc.perform(put("/api/pension-concurrentes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pensionConcurrente)))
            .andExpect(status().isBadRequest());

        // Validate the PensionConcurrente in the database
        List<PensionConcurrente> pensionConcurrenteList = pensionConcurrenteRepository.findAll();
        assertThat(pensionConcurrenteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePensionConcurrente() throws Exception {
        // Initialize the database
        pensionConcurrenteRepository.saveAndFlush(pensionConcurrente);

        int databaseSizeBeforeDelete = pensionConcurrenteRepository.findAll().size();

        // Get the pensionConcurrente
        restPensionConcurrenteMockMvc.perform(delete("/api/pension-concurrentes/{id}", pensionConcurrente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PensionConcurrente> pensionConcurrenteList = pensionConcurrenteRepository.findAll();
        assertThat(pensionConcurrenteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PensionConcurrente.class);
        PensionConcurrente pensionConcurrente1 = new PensionConcurrente();
        pensionConcurrente1.setId(1L);
        PensionConcurrente pensionConcurrente2 = new PensionConcurrente();
        pensionConcurrente2.setId(pensionConcurrente1.getId());
        assertThat(pensionConcurrente1).isEqualTo(pensionConcurrente2);
        pensionConcurrente2.setId(2L);
        assertThat(pensionConcurrente1).isNotEqualTo(pensionConcurrente2);
        pensionConcurrente1.setId(null);
        assertThat(pensionConcurrente1).isNotEqualTo(pensionConcurrente2);
    }
}

package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.TipoRelacion;
import es.imserso.techfile.repository.TipoRelacionRepository;
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
 * Test class for the TipoRelacionResource REST controller.
 *
 * @see TipoRelacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class TipoRelacionResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private TipoRelacionRepository tipoRelacionRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTipoRelacionMockMvc;

    private TipoRelacion tipoRelacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoRelacionResource tipoRelacionResource = new TipoRelacionResource(tipoRelacionRepository);
        this.restTipoRelacionMockMvc = MockMvcBuilders.standaloneSetup(tipoRelacionResource)
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
    public static TipoRelacion createEntity(EntityManager em) {
        TipoRelacion tipoRelacion = new TipoRelacion()
            .descripcion(DEFAULT_DESCRIPCION);
        return tipoRelacion;
    }

    @Before
    public void initTest() {
        tipoRelacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoRelacion() throws Exception {
        int databaseSizeBeforeCreate = tipoRelacionRepository.findAll().size();

        // Create the TipoRelacion
        restTipoRelacionMockMvc.perform(post("/api/tipo-relacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoRelacion)))
            .andExpect(status().isCreated());

        // Validate the TipoRelacion in the database
        List<TipoRelacion> tipoRelacionList = tipoRelacionRepository.findAll();
        assertThat(tipoRelacionList).hasSize(databaseSizeBeforeCreate + 1);
        TipoRelacion testTipoRelacion = tipoRelacionList.get(tipoRelacionList.size() - 1);
        assertThat(testTipoRelacion.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createTipoRelacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoRelacionRepository.findAll().size();

        // Create the TipoRelacion with an existing ID
        tipoRelacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoRelacionMockMvc.perform(post("/api/tipo-relacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoRelacion)))
            .andExpect(status().isBadRequest());

        // Validate the TipoRelacion in the database
        List<TipoRelacion> tipoRelacionList = tipoRelacionRepository.findAll();
        assertThat(tipoRelacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoRelacionRepository.findAll().size();
        // set the field null
        tipoRelacion.setDescripcion(null);

        // Create the TipoRelacion, which fails.

        restTipoRelacionMockMvc.perform(post("/api/tipo-relacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoRelacion)))
            .andExpect(status().isBadRequest());

        List<TipoRelacion> tipoRelacionList = tipoRelacionRepository.findAll();
        assertThat(tipoRelacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoRelacions() throws Exception {
        // Initialize the database
        tipoRelacionRepository.saveAndFlush(tipoRelacion);

        // Get all the tipoRelacionList
        restTipoRelacionMockMvc.perform(get("/api/tipo-relacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoRelacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    

    @Test
    @Transactional
    public void getTipoRelacion() throws Exception {
        // Initialize the database
        tipoRelacionRepository.saveAndFlush(tipoRelacion);

        // Get the tipoRelacion
        restTipoRelacionMockMvc.perform(get("/api/tipo-relacions/{id}", tipoRelacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoRelacion.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTipoRelacion() throws Exception {
        // Get the tipoRelacion
        restTipoRelacionMockMvc.perform(get("/api/tipo-relacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoRelacion() throws Exception {
        // Initialize the database
        tipoRelacionRepository.saveAndFlush(tipoRelacion);

        int databaseSizeBeforeUpdate = tipoRelacionRepository.findAll().size();

        // Update the tipoRelacion
        TipoRelacion updatedTipoRelacion = tipoRelacionRepository.findById(tipoRelacion.getId()).get();
        // Disconnect from session so that the updates on updatedTipoRelacion are not directly saved in db
        em.detach(updatedTipoRelacion);
        updatedTipoRelacion
            .descripcion(UPDATED_DESCRIPCION);

        restTipoRelacionMockMvc.perform(put("/api/tipo-relacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoRelacion)))
            .andExpect(status().isOk());

        // Validate the TipoRelacion in the database
        List<TipoRelacion> tipoRelacionList = tipoRelacionRepository.findAll();
        assertThat(tipoRelacionList).hasSize(databaseSizeBeforeUpdate);
        TipoRelacion testTipoRelacion = tipoRelacionList.get(tipoRelacionList.size() - 1);
        assertThat(testTipoRelacion.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoRelacion() throws Exception {
        int databaseSizeBeforeUpdate = tipoRelacionRepository.findAll().size();

        // Create the TipoRelacion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTipoRelacionMockMvc.perform(put("/api/tipo-relacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoRelacion)))
            .andExpect(status().isBadRequest());

        // Validate the TipoRelacion in the database
        List<TipoRelacion> tipoRelacionList = tipoRelacionRepository.findAll();
        assertThat(tipoRelacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoRelacion() throws Exception {
        // Initialize the database
        tipoRelacionRepository.saveAndFlush(tipoRelacion);

        int databaseSizeBeforeDelete = tipoRelacionRepository.findAll().size();

        // Get the tipoRelacion
        restTipoRelacionMockMvc.perform(delete("/api/tipo-relacions/{id}", tipoRelacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TipoRelacion> tipoRelacionList = tipoRelacionRepository.findAll();
        assertThat(tipoRelacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoRelacion.class);
        TipoRelacion tipoRelacion1 = new TipoRelacion();
        tipoRelacion1.setId(1L);
        TipoRelacion tipoRelacion2 = new TipoRelacion();
        tipoRelacion2.setId(tipoRelacion1.getId());
        assertThat(tipoRelacion1).isEqualTo(tipoRelacion2);
        tipoRelacion2.setId(2L);
        assertThat(tipoRelacion1).isNotEqualTo(tipoRelacion2);
        tipoRelacion1.setId(null);
        assertThat(tipoRelacion1).isNotEqualTo(tipoRelacion2);
    }
}

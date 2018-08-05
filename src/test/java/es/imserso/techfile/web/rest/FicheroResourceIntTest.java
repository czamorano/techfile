package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.Fichero;
import es.imserso.techfile.repository.FicheroRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static es.imserso.techfile.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FicheroResource REST controller.
 *
 * @see FicheroResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class FicheroResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_TAMAGNO = "AAAAAAAAAA";
    private static final String UPDATED_TAMAGNO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_CREACION_ORIGEN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION_ORIGEN = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_ALTA_APLICACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ALTA_APLICACION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ENCODING = "AAAAAAAAAA";
    private static final String UPDATED_ENCODING = "BBBBBBBBBB";

    private static final Long DEFAULT_LINEAS = 1L;
    private static final Long UPDATED_LINEAS = 2L;

    @Autowired
    private FicheroRepository ficheroRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFicheroMockMvc;

    private Fichero fichero;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FicheroResource ficheroResource = new FicheroResource(ficheroRepository);
        this.restFicheroMockMvc = MockMvcBuilders.standaloneSetup(ficheroResource)
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
    public static Fichero createEntity(EntityManager em) {
        Fichero fichero = new Fichero()
            .nombre(DEFAULT_NOMBRE)
            .tamagno(DEFAULT_TAMAGNO)
            .fechaCreacionOrigen(DEFAULT_FECHA_CREACION_ORIGEN)
            .fechaAltaAplicacion(DEFAULT_FECHA_ALTA_APLICACION)
            .encoding(DEFAULT_ENCODING)
            .lineas(DEFAULT_LINEAS);
        return fichero;
    }

    @Before
    public void initTest() {
        fichero = createEntity(em);
    }

    @Test
    @Transactional
    public void createFichero() throws Exception {
        int databaseSizeBeforeCreate = ficheroRepository.findAll().size();

        // Create the Fichero
        restFicheroMockMvc.perform(post("/api/ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fichero)))
            .andExpect(status().isCreated());

        // Validate the Fichero in the database
        List<Fichero> ficheroList = ficheroRepository.findAll();
        assertThat(ficheroList).hasSize(databaseSizeBeforeCreate + 1);
        Fichero testFichero = ficheroList.get(ficheroList.size() - 1);
        assertThat(testFichero.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testFichero.getTamagno()).isEqualTo(DEFAULT_TAMAGNO);
        assertThat(testFichero.getFechaCreacionOrigen()).isEqualTo(DEFAULT_FECHA_CREACION_ORIGEN);
        assertThat(testFichero.getFechaAltaAplicacion()).isEqualTo(DEFAULT_FECHA_ALTA_APLICACION);
        assertThat(testFichero.getEncoding()).isEqualTo(DEFAULT_ENCODING);
        assertThat(testFichero.getLineas()).isEqualTo(DEFAULT_LINEAS);
    }

    @Test
    @Transactional
    public void createFicheroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ficheroRepository.findAll().size();

        // Create the Fichero with an existing ID
        fichero.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFicheroMockMvc.perform(post("/api/ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fichero)))
            .andExpect(status().isBadRequest());

        // Validate the Fichero in the database
        List<Fichero> ficheroList = ficheroRepository.findAll();
        assertThat(ficheroList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = ficheroRepository.findAll().size();
        // set the field null
        fichero.setNombre(null);

        // Create the Fichero, which fails.

        restFicheroMockMvc.perform(post("/api/ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fichero)))
            .andExpect(status().isBadRequest());

        List<Fichero> ficheroList = ficheroRepository.findAll();
        assertThat(ficheroList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTamagnoIsRequired() throws Exception {
        int databaseSizeBeforeTest = ficheroRepository.findAll().size();
        // set the field null
        fichero.setTamagno(null);

        // Create the Fichero, which fails.

        restFicheroMockMvc.perform(post("/api/ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fichero)))
            .andExpect(status().isBadRequest());

        List<Fichero> ficheroList = ficheroRepository.findAll();
        assertThat(ficheroList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFechaAltaAplicacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = ficheroRepository.findAll().size();
        // set the field null
        fichero.setFechaAltaAplicacion(null);

        // Create the Fichero, which fails.

        restFicheroMockMvc.perform(post("/api/ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fichero)))
            .andExpect(status().isBadRequest());

        List<Fichero> ficheroList = ficheroRepository.findAll();
        assertThat(ficheroList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLineasIsRequired() throws Exception {
        int databaseSizeBeforeTest = ficheroRepository.findAll().size();
        // set the field null
        fichero.setLineas(null);

        // Create the Fichero, which fails.

        restFicheroMockMvc.perform(post("/api/ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fichero)))
            .andExpect(status().isBadRequest());

        List<Fichero> ficheroList = ficheroRepository.findAll();
        assertThat(ficheroList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFicheroes() throws Exception {
        // Initialize the database
        ficheroRepository.saveAndFlush(fichero);

        // Get all the ficheroList
        restFicheroMockMvc.perform(get("/api/ficheroes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fichero.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].tamagno").value(hasItem(DEFAULT_TAMAGNO.toString())))
            .andExpect(jsonPath("$.[*].fechaCreacionOrigen").value(hasItem(DEFAULT_FECHA_CREACION_ORIGEN.toString())))
            .andExpect(jsonPath("$.[*].fechaAltaAplicacion").value(hasItem(DEFAULT_FECHA_ALTA_APLICACION.toString())))
            .andExpect(jsonPath("$.[*].encoding").value(hasItem(DEFAULT_ENCODING.toString())))
            .andExpect(jsonPath("$.[*].lineas").value(hasItem(DEFAULT_LINEAS.intValue())));
    }
    

    @Test
    @Transactional
    public void getFichero() throws Exception {
        // Initialize the database
        ficheroRepository.saveAndFlush(fichero);

        // Get the fichero
        restFicheroMockMvc.perform(get("/api/ficheroes/{id}", fichero.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fichero.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.tamagno").value(DEFAULT_TAMAGNO.toString()))
            .andExpect(jsonPath("$.fechaCreacionOrigen").value(DEFAULT_FECHA_CREACION_ORIGEN.toString()))
            .andExpect(jsonPath("$.fechaAltaAplicacion").value(DEFAULT_FECHA_ALTA_APLICACION.toString()))
            .andExpect(jsonPath("$.encoding").value(DEFAULT_ENCODING.toString()))
            .andExpect(jsonPath("$.lineas").value(DEFAULT_LINEAS.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingFichero() throws Exception {
        // Get the fichero
        restFicheroMockMvc.perform(get("/api/ficheroes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFichero() throws Exception {
        // Initialize the database
        ficheroRepository.saveAndFlush(fichero);

        int databaseSizeBeforeUpdate = ficheroRepository.findAll().size();

        // Update the fichero
        Fichero updatedFichero = ficheroRepository.findById(fichero.getId()).get();
        // Disconnect from session so that the updates on updatedFichero are not directly saved in db
        em.detach(updatedFichero);
        updatedFichero
            .nombre(UPDATED_NOMBRE)
            .tamagno(UPDATED_TAMAGNO)
            .fechaCreacionOrigen(UPDATED_FECHA_CREACION_ORIGEN)
            .fechaAltaAplicacion(UPDATED_FECHA_ALTA_APLICACION)
            .encoding(UPDATED_ENCODING)
            .lineas(UPDATED_LINEAS);

        restFicheroMockMvc.perform(put("/api/ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFichero)))
            .andExpect(status().isOk());

        // Validate the Fichero in the database
        List<Fichero> ficheroList = ficheroRepository.findAll();
        assertThat(ficheroList).hasSize(databaseSizeBeforeUpdate);
        Fichero testFichero = ficheroList.get(ficheroList.size() - 1);
        assertThat(testFichero.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testFichero.getTamagno()).isEqualTo(UPDATED_TAMAGNO);
        assertThat(testFichero.getFechaCreacionOrigen()).isEqualTo(UPDATED_FECHA_CREACION_ORIGEN);
        assertThat(testFichero.getFechaAltaAplicacion()).isEqualTo(UPDATED_FECHA_ALTA_APLICACION);
        assertThat(testFichero.getEncoding()).isEqualTo(UPDATED_ENCODING);
        assertThat(testFichero.getLineas()).isEqualTo(UPDATED_LINEAS);
    }

    @Test
    @Transactional
    public void updateNonExistingFichero() throws Exception {
        int databaseSizeBeforeUpdate = ficheroRepository.findAll().size();

        // Create the Fichero

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFicheroMockMvc.perform(put("/api/ficheroes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fichero)))
            .andExpect(status().isBadRequest());

        // Validate the Fichero in the database
        List<Fichero> ficheroList = ficheroRepository.findAll();
        assertThat(ficheroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFichero() throws Exception {
        // Initialize the database
        ficheroRepository.saveAndFlush(fichero);

        int databaseSizeBeforeDelete = ficheroRepository.findAll().size();

        // Get the fichero
        restFicheroMockMvc.perform(delete("/api/ficheroes/{id}", fichero.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Fichero> ficheroList = ficheroRepository.findAll();
        assertThat(ficheroList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fichero.class);
        Fichero fichero1 = new Fichero();
        fichero1.setId(1L);
        Fichero fichero2 = new Fichero();
        fichero2.setId(fichero1.getId());
        assertThat(fichero1).isEqualTo(fichero2);
        fichero2.setId(2L);
        assertThat(fichero1).isNotEqualTo(fichero2);
        fichero1.setId(null);
        assertThat(fichero1).isNotEqualTo(fichero2);
    }
}

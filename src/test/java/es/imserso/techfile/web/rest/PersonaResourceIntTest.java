package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.Persona;
import es.imserso.techfile.repository.PersonaRepository;
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

import es.imserso.techfile.domain.enumeration.TipoIdentificacion;
import es.imserso.techfile.domain.enumeration.TipoPension;
import es.imserso.techfile.domain.enumeration.Sexo;
import es.imserso.techfile.domain.enumeration.EstadoCivil;
/**
 * Test class for the PersonaResource REST controller.
 *
 * @see PersonaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class PersonaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDOS = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDOS = "BBBBBBBBBB";

    private static final TipoIdentificacion DEFAULT_TIPO_IDENTIFICACION = TipoIdentificacion.NIF;
    private static final TipoIdentificacion UPDATED_TIPO_IDENTIFICACION = TipoIdentificacion.NIE;

    private static final String DEFAULT_DOCUMENTO_IDENTIFICACION = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENTO_IDENTIFICACION = "BBBBBBBBBB";

    private static final Long DEFAULT_DIGITOS_CONTROL = 1L;
    private static final Long UPDATED_DIGITOS_CONTROL = 2L;

    private static final TipoPension DEFAULT_TIPO_PENSION = TipoPension.JUBILACION;
    private static final TipoPension UPDATED_TIPO_PENSION = TipoPension.INVALIDEZ;

    private static final LocalDate DEFAULT_FECHA_NACIMIENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_NACIMIENTO = LocalDate.now(ZoneId.systemDefault());

    private static final Sexo DEFAULT_SEXO = Sexo.HOMBRE;
    private static final Sexo UPDATED_SEXO = Sexo.MUJER;

    private static final EstadoCivil DEFAULT_ESTADO_CIVIL = EstadoCivil.CASADO;
    private static final EstadoCivil UPDATED_ESTADO_CIVIL = EstadoCivil.DIVORCIADO;

    private static final String DEFAULT_DOMICILIO = "AAAAAAAAAA";
    private static final String UPDATED_DOMICILIO = "BBBBBBBBBB";

    private static final Long DEFAULT_CODIGO_POSTAL = 1L;
    private static final Long UPDATED_CODIGO_POSTAL = 2L;

    private static final String DEFAULT_LOCALIDAD = "AAAAAAAAAA";
    private static final String UPDATED_LOCALIDAD = "BBBBBBBBBB";

    private static final Long DEFAULT_MUNICIPIO = 1L;
    private static final Long UPDATED_MUNICIPIO = 2L;

    private static final Long DEFAULT_NACIONALIDAD = 1L;
    private static final Long UPDATED_NACIONALIDAD = 2L;

    private static final Long DEFAULT_NUMERO_SS = 1L;
    private static final Long UPDATED_NUMERO_SS = 2L;

    @Autowired
    private PersonaRepository personaRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPersonaMockMvc;

    private Persona persona;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PersonaResource personaResource = new PersonaResource(personaRepository);
        this.restPersonaMockMvc = MockMvcBuilders.standaloneSetup(personaResource)
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
    public static Persona createEntity(EntityManager em) {
        Persona persona = new Persona()
            .nombre(DEFAULT_NOMBRE)
            .apellidos(DEFAULT_APELLIDOS)
            .tipoIdentificacion(DEFAULT_TIPO_IDENTIFICACION)
            .documentoIdentificacion(DEFAULT_DOCUMENTO_IDENTIFICACION)
            .digitosControl(DEFAULT_DIGITOS_CONTROL)
            .tipoPension(DEFAULT_TIPO_PENSION)
            .fechaNacimiento(DEFAULT_FECHA_NACIMIENTO)
            .sexo(DEFAULT_SEXO)
            .estadoCivil(DEFAULT_ESTADO_CIVIL)
            .domicilio(DEFAULT_DOMICILIO)
            .codigoPostal(DEFAULT_CODIGO_POSTAL)
            .localidad(DEFAULT_LOCALIDAD)
            .municipio(DEFAULT_MUNICIPIO)
            .nacionalidad(DEFAULT_NACIONALIDAD)
            .numeroSS(DEFAULT_NUMERO_SS);
        return persona;
    }

    @Before
    public void initTest() {
        persona = createEntity(em);
    }

    @Test
    @Transactional
    public void createPersona() throws Exception {
        int databaseSizeBeforeCreate = personaRepository.findAll().size();

        // Create the Persona
        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isCreated());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeCreate + 1);
        Persona testPersona = personaList.get(personaList.size() - 1);
        assertThat(testPersona.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPersona.getApellidos()).isEqualTo(DEFAULT_APELLIDOS);
        assertThat(testPersona.getTipoIdentificacion()).isEqualTo(DEFAULT_TIPO_IDENTIFICACION);
        assertThat(testPersona.getDocumentoIdentificacion()).isEqualTo(DEFAULT_DOCUMENTO_IDENTIFICACION);
        assertThat(testPersona.getDigitosControl()).isEqualTo(DEFAULT_DIGITOS_CONTROL);
        assertThat(testPersona.getTipoPension()).isEqualTo(DEFAULT_TIPO_PENSION);
        assertThat(testPersona.getFechaNacimiento()).isEqualTo(DEFAULT_FECHA_NACIMIENTO);
        assertThat(testPersona.getSexo()).isEqualTo(DEFAULT_SEXO);
        assertThat(testPersona.getEstadoCivil()).isEqualTo(DEFAULT_ESTADO_CIVIL);
        assertThat(testPersona.getDomicilio()).isEqualTo(DEFAULT_DOMICILIO);
        assertThat(testPersona.getCodigoPostal()).isEqualTo(DEFAULT_CODIGO_POSTAL);
        assertThat(testPersona.getLocalidad()).isEqualTo(DEFAULT_LOCALIDAD);
        assertThat(testPersona.getMunicipio()).isEqualTo(DEFAULT_MUNICIPIO);
        assertThat(testPersona.getNacionalidad()).isEqualTo(DEFAULT_NACIONALIDAD);
        assertThat(testPersona.getNumeroSS()).isEqualTo(DEFAULT_NUMERO_SS);
    }

    @Test
    @Transactional
    public void createPersonaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personaRepository.findAll().size();

        // Create the Persona with an existing ID
        persona.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = personaRepository.findAll().size();
        // set the field null
        persona.setNombre(null);

        // Create the Persona, which fails.

        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkApellidosIsRequired() throws Exception {
        int databaseSizeBeforeTest = personaRepository.findAll().size();
        // set the field null
        persona.setApellidos(null);

        // Create the Persona, which fails.

        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTipoIdentificacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = personaRepository.findAll().size();
        // set the field null
        persona.setTipoIdentificacion(null);

        // Create the Persona, which fails.

        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDocumentoIdentificacionIsRequired() throws Exception {
        int databaseSizeBeforeTest = personaRepository.findAll().size();
        // set the field null
        persona.setDocumentoIdentificacion(null);

        // Create the Persona, which fails.

        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDigitosControlIsRequired() throws Exception {
        int databaseSizeBeforeTest = personaRepository.findAll().size();
        // set the field null
        persona.setDigitosControl(null);

        // Create the Persona, which fails.

        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTipoPensionIsRequired() throws Exception {
        int databaseSizeBeforeTest = personaRepository.findAll().size();
        // set the field null
        persona.setTipoPension(null);

        // Create the Persona, which fails.

        restPersonaMockMvc.perform(post("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPersonas() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get all the personaList
        restPersonaMockMvc.perform(get("/api/personas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(persona.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].apellidos").value(hasItem(DEFAULT_APELLIDOS.toString())))
            .andExpect(jsonPath("$.[*].tipoIdentificacion").value(hasItem(DEFAULT_TIPO_IDENTIFICACION.toString())))
            .andExpect(jsonPath("$.[*].documentoIdentificacion").value(hasItem(DEFAULT_DOCUMENTO_IDENTIFICACION.toString())))
            .andExpect(jsonPath("$.[*].digitosControl").value(hasItem(DEFAULT_DIGITOS_CONTROL.intValue())))
            .andExpect(jsonPath("$.[*].tipoPension").value(hasItem(DEFAULT_TIPO_PENSION.toString())))
            .andExpect(jsonPath("$.[*].fechaNacimiento").value(hasItem(DEFAULT_FECHA_NACIMIENTO.toString())))
            .andExpect(jsonPath("$.[*].sexo").value(hasItem(DEFAULT_SEXO.toString())))
            .andExpect(jsonPath("$.[*].estadoCivil").value(hasItem(DEFAULT_ESTADO_CIVIL.toString())))
            .andExpect(jsonPath("$.[*].domicilio").value(hasItem(DEFAULT_DOMICILIO.toString())))
            .andExpect(jsonPath("$.[*].codigoPostal").value(hasItem(DEFAULT_CODIGO_POSTAL.intValue())))
            .andExpect(jsonPath("$.[*].localidad").value(hasItem(DEFAULT_LOCALIDAD.toString())))
            .andExpect(jsonPath("$.[*].municipio").value(hasItem(DEFAULT_MUNICIPIO.intValue())))
            .andExpect(jsonPath("$.[*].nacionalidad").value(hasItem(DEFAULT_NACIONALIDAD.intValue())))
            .andExpect(jsonPath("$.[*].numeroSS").value(hasItem(DEFAULT_NUMERO_SS.intValue())));
    }
    

    @Test
    @Transactional
    public void getPersona() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        // Get the persona
        restPersonaMockMvc.perform(get("/api/personas/{id}", persona.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(persona.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.apellidos").value(DEFAULT_APELLIDOS.toString()))
            .andExpect(jsonPath("$.tipoIdentificacion").value(DEFAULT_TIPO_IDENTIFICACION.toString()))
            .andExpect(jsonPath("$.documentoIdentificacion").value(DEFAULT_DOCUMENTO_IDENTIFICACION.toString()))
            .andExpect(jsonPath("$.digitosControl").value(DEFAULT_DIGITOS_CONTROL.intValue()))
            .andExpect(jsonPath("$.tipoPension").value(DEFAULT_TIPO_PENSION.toString()))
            .andExpect(jsonPath("$.fechaNacimiento").value(DEFAULT_FECHA_NACIMIENTO.toString()))
            .andExpect(jsonPath("$.sexo").value(DEFAULT_SEXO.toString()))
            .andExpect(jsonPath("$.estadoCivil").value(DEFAULT_ESTADO_CIVIL.toString()))
            .andExpect(jsonPath("$.domicilio").value(DEFAULT_DOMICILIO.toString()))
            .andExpect(jsonPath("$.codigoPostal").value(DEFAULT_CODIGO_POSTAL.intValue()))
            .andExpect(jsonPath("$.localidad").value(DEFAULT_LOCALIDAD.toString()))
            .andExpect(jsonPath("$.municipio").value(DEFAULT_MUNICIPIO.intValue()))
            .andExpect(jsonPath("$.nacionalidad").value(DEFAULT_NACIONALIDAD.intValue()))
            .andExpect(jsonPath("$.numeroSS").value(DEFAULT_NUMERO_SS.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPersona() throws Exception {
        // Get the persona
        restPersonaMockMvc.perform(get("/api/personas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePersona() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        int databaseSizeBeforeUpdate = personaRepository.findAll().size();

        // Update the persona
        Persona updatedPersona = personaRepository.findById(persona.getId()).get();
        // Disconnect from session so that the updates on updatedPersona are not directly saved in db
        em.detach(updatedPersona);
        updatedPersona
            .nombre(UPDATED_NOMBRE)
            .apellidos(UPDATED_APELLIDOS)
            .tipoIdentificacion(UPDATED_TIPO_IDENTIFICACION)
            .documentoIdentificacion(UPDATED_DOCUMENTO_IDENTIFICACION)
            .digitosControl(UPDATED_DIGITOS_CONTROL)
            .tipoPension(UPDATED_TIPO_PENSION)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .sexo(UPDATED_SEXO)
            .estadoCivil(UPDATED_ESTADO_CIVIL)
            .domicilio(UPDATED_DOMICILIO)
            .codigoPostal(UPDATED_CODIGO_POSTAL)
            .localidad(UPDATED_LOCALIDAD)
            .municipio(UPDATED_MUNICIPIO)
            .nacionalidad(UPDATED_NACIONALIDAD)
            .numeroSS(UPDATED_NUMERO_SS);

        restPersonaMockMvc.perform(put("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPersona)))
            .andExpect(status().isOk());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate);
        Persona testPersona = personaList.get(personaList.size() - 1);
        assertThat(testPersona.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPersona.getApellidos()).isEqualTo(UPDATED_APELLIDOS);
        assertThat(testPersona.getTipoIdentificacion()).isEqualTo(UPDATED_TIPO_IDENTIFICACION);
        assertThat(testPersona.getDocumentoIdentificacion()).isEqualTo(UPDATED_DOCUMENTO_IDENTIFICACION);
        assertThat(testPersona.getDigitosControl()).isEqualTo(UPDATED_DIGITOS_CONTROL);
        assertThat(testPersona.getTipoPension()).isEqualTo(UPDATED_TIPO_PENSION);
        assertThat(testPersona.getFechaNacimiento()).isEqualTo(UPDATED_FECHA_NACIMIENTO);
        assertThat(testPersona.getSexo()).isEqualTo(UPDATED_SEXO);
        assertThat(testPersona.getEstadoCivil()).isEqualTo(UPDATED_ESTADO_CIVIL);
        assertThat(testPersona.getDomicilio()).isEqualTo(UPDATED_DOMICILIO);
        assertThat(testPersona.getCodigoPostal()).isEqualTo(UPDATED_CODIGO_POSTAL);
        assertThat(testPersona.getLocalidad()).isEqualTo(UPDATED_LOCALIDAD);
        assertThat(testPersona.getMunicipio()).isEqualTo(UPDATED_MUNICIPIO);
        assertThat(testPersona.getNacionalidad()).isEqualTo(UPDATED_NACIONALIDAD);
        assertThat(testPersona.getNumeroSS()).isEqualTo(UPDATED_NUMERO_SS);
    }

    @Test
    @Transactional
    public void updateNonExistingPersona() throws Exception {
        int databaseSizeBeforeUpdate = personaRepository.findAll().size();

        // Create the Persona

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPersonaMockMvc.perform(put("/api/personas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(persona)))
            .andExpect(status().isBadRequest());

        // Validate the Persona in the database
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePersona() throws Exception {
        // Initialize the database
        personaRepository.saveAndFlush(persona);

        int databaseSizeBeforeDelete = personaRepository.findAll().size();

        // Get the persona
        restPersonaMockMvc.perform(delete("/api/personas/{id}", persona.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Persona> personaList = personaRepository.findAll();
        assertThat(personaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Persona.class);
        Persona persona1 = new Persona();
        persona1.setId(1L);
        Persona persona2 = new Persona();
        persona2.setId(persona1.getId());
        assertThat(persona1).isEqualTo(persona2);
        persona2.setId(2L);
        assertThat(persona1).isNotEqualTo(persona2);
        persona1.setId(null);
        assertThat(persona1).isNotEqualTo(persona2);
    }
}

package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.Pensionista;
import es.imserso.techfile.repository.PensionistaRepository;
import es.imserso.techfile.service.PensionistaService;
import es.imserso.techfile.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;


import static es.imserso.techfile.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import es.imserso.techfile.domain.enumeration.FormaCobro;
/**
 * Test class for the PensionistaResource REST controller.
 *
 * @see PensionistaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class PensionistaResourceIntTest {

    private static final Long DEFAULT_SITUACION_PENSION = 1L;
    private static final Long UPDATED_SITUACION_PENSION = 2L;

    private static final BigDecimal DEFAULT_INGRESOS_TOTALES = new BigDecimal(1);
    private static final BigDecimal UPDATED_INGRESOS_TOTALES = new BigDecimal(2);

    private static final Boolean DEFAULT_TRABAJA = false;
    private static final Boolean UPDATED_TRABAJA = true;

    private static final Long DEFAULT_TOTAL_CONVIVIENTES = 1L;
    private static final Long UPDATED_TOTAL_CONVIVIENTES = 2L;

    private static final BigDecimal DEFAULT_INGRESOS_ANUALES_CONVIVIENTES = new BigDecimal(1);
    private static final BigDecimal UPDATED_INGRESOS_ANUALES_CONVIVIENTES = new BigDecimal(2);

    private static final Long DEFAULT_GRADO_MINUSVALIA = 1L;
    private static final Long UPDATED_GRADO_MINUSVALIA = 2L;

    private static final Long DEFAULT_PORCENTAJE_DISCAPACIDAD = 1L;
    private static final Long UPDATED_PORCENTAJE_DISCAPACIDAD = 2L;

    private static final Long DEFAULT_BAREMO_FACTORES_SOCIALES_COMPLEMENTARIOS = 1L;
    private static final Long UPDATED_BAREMO_FACTORES_SOCIALES_COMPLEMENTARIOS = 2L;

    private static final Long DEFAULT_BAREMO_NECESIDAD_TERCERA_PERSONA = 1L;
    private static final Long UPDATED_BAREMO_NECESIDAD_TERCERA_PERSONA = 2L;

    private static final LocalDate DEFAULT_FECHA_SOLICITUD_PENSION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_SOLICITUD_PENSION = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_RESOLUCION_PENSION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_RESOLUCION_PENSION = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_ALTA_NOMINA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ALTA_NOMINA = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_IMPORTE_MENSUAL_PENSION = new BigDecimal(1);
    private static final BigDecimal UPDATED_IMPORTE_MENSUAL_PENSION = new BigDecimal(2);

    private static final BigDecimal DEFAULT_IMPORTE_MENSUAL_COMPLEMENTO_TERCERA_PERSONA = new BigDecimal(1);
    private static final BigDecimal UPDATED_IMPORTE_MENSUAL_COMPLEMENTO_TERCERA_PERSONA = new BigDecimal(2);

    private static final FormaCobro DEFAULT_FORMA_COBRO = FormaCobro.DIRECTO_EN_VENTANILLA;
    private static final FormaCobro UPDATED_FORMA_COBRO = FormaCobro.INGRESO_EN_CUENTA;

    private static final Long DEFAULT_ENTIDAD_BANCARIA = 1L;
    private static final Long UPDATED_ENTIDAD_BANCARIA = 2L;

    private static final Long DEFAULT_CUENTA_BANCARIA = 1L;
    private static final Long UPDATED_CUENTA_BANCARIA = 2L;

    private static final String DEFAULT_NUMERO_CUENTA = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_CUENTA = "BBBBBBBBBB";

    @Autowired
    private PensionistaRepository pensionistaRepository;
    @Mock
    private PensionistaRepository pensionistaRepositoryMock;
    
    @Mock
    private PensionistaService pensionistaServiceMock;

    @Autowired
    private PensionistaService pensionistaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPensionistaMockMvc;

    private Pensionista pensionista;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PensionistaResource pensionistaResource = new PensionistaResource(pensionistaService);
        this.restPensionistaMockMvc = MockMvcBuilders.standaloneSetup(pensionistaResource)
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
    public static Pensionista createEntity(EntityManager em) {
        Pensionista pensionista = new Pensionista()
            .situacionPension(DEFAULT_SITUACION_PENSION)
            .ingresosTotales(DEFAULT_INGRESOS_TOTALES)
            .trabaja(DEFAULT_TRABAJA)
            .totalConvivientes(DEFAULT_TOTAL_CONVIVIENTES)
            .ingresosAnualesConvivientes(DEFAULT_INGRESOS_ANUALES_CONVIVIENTES)
            .gradoMinusvalia(DEFAULT_GRADO_MINUSVALIA)
            .porcentajeDiscapacidad(DEFAULT_PORCENTAJE_DISCAPACIDAD)
            .baremoFactoresSocialesComplementarios(DEFAULT_BAREMO_FACTORES_SOCIALES_COMPLEMENTARIOS)
            .baremoNecesidadTerceraPersona(DEFAULT_BAREMO_NECESIDAD_TERCERA_PERSONA)
            .fechaSolicitudPension(DEFAULT_FECHA_SOLICITUD_PENSION)
            .fechaResolucionPension(DEFAULT_FECHA_RESOLUCION_PENSION)
            .fechaAltaNomina(DEFAULT_FECHA_ALTA_NOMINA)
            .importeMensualPension(DEFAULT_IMPORTE_MENSUAL_PENSION)
            .importeMensualComplementoTerceraPersona(DEFAULT_IMPORTE_MENSUAL_COMPLEMENTO_TERCERA_PERSONA)
            .formaCobro(DEFAULT_FORMA_COBRO)
            .entidadBancaria(DEFAULT_ENTIDAD_BANCARIA)
            .cuentaBancaria(DEFAULT_CUENTA_BANCARIA)
            .numeroCuenta(DEFAULT_NUMERO_CUENTA);
        return pensionista;
    }

    @Before
    public void initTest() {
        pensionista = createEntity(em);
    }

    @Test
    @Transactional
    public void createPensionista() throws Exception {
        int databaseSizeBeforeCreate = pensionistaRepository.findAll().size();

        // Create the Pensionista
        restPensionistaMockMvc.perform(post("/api/pensionistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pensionista)))
            .andExpect(status().isCreated());

        // Validate the Pensionista in the database
        List<Pensionista> pensionistaList = pensionistaRepository.findAll();
        assertThat(pensionistaList).hasSize(databaseSizeBeforeCreate + 1);
        Pensionista testPensionista = pensionistaList.get(pensionistaList.size() - 1);
        assertThat(testPensionista.getSituacionPension()).isEqualTo(DEFAULT_SITUACION_PENSION);
        assertThat(testPensionista.getIngresosTotales()).isEqualTo(DEFAULT_INGRESOS_TOTALES);
        assertThat(testPensionista.isTrabaja()).isEqualTo(DEFAULT_TRABAJA);
        assertThat(testPensionista.getTotalConvivientes()).isEqualTo(DEFAULT_TOTAL_CONVIVIENTES);
        assertThat(testPensionista.getIngresosAnualesConvivientes()).isEqualTo(DEFAULT_INGRESOS_ANUALES_CONVIVIENTES);
        assertThat(testPensionista.getGradoMinusvalia()).isEqualTo(DEFAULT_GRADO_MINUSVALIA);
        assertThat(testPensionista.getPorcentajeDiscapacidad()).isEqualTo(DEFAULT_PORCENTAJE_DISCAPACIDAD);
        assertThat(testPensionista.getBaremoFactoresSocialesComplementarios()).isEqualTo(DEFAULT_BAREMO_FACTORES_SOCIALES_COMPLEMENTARIOS);
        assertThat(testPensionista.getBaremoNecesidadTerceraPersona()).isEqualTo(DEFAULT_BAREMO_NECESIDAD_TERCERA_PERSONA);
        assertThat(testPensionista.getFechaSolicitudPension()).isEqualTo(DEFAULT_FECHA_SOLICITUD_PENSION);
        assertThat(testPensionista.getFechaResolucionPension()).isEqualTo(DEFAULT_FECHA_RESOLUCION_PENSION);
        assertThat(testPensionista.getFechaAltaNomina()).isEqualTo(DEFAULT_FECHA_ALTA_NOMINA);
        assertThat(testPensionista.getImporteMensualPension()).isEqualTo(DEFAULT_IMPORTE_MENSUAL_PENSION);
        assertThat(testPensionista.getImporteMensualComplementoTerceraPersona()).isEqualTo(DEFAULT_IMPORTE_MENSUAL_COMPLEMENTO_TERCERA_PERSONA);
        assertThat(testPensionista.getFormaCobro()).isEqualTo(DEFAULT_FORMA_COBRO);
        assertThat(testPensionista.getEntidadBancaria()).isEqualTo(DEFAULT_ENTIDAD_BANCARIA);
        assertThat(testPensionista.getCuentaBancaria()).isEqualTo(DEFAULT_CUENTA_BANCARIA);
        assertThat(testPensionista.getNumeroCuenta()).isEqualTo(DEFAULT_NUMERO_CUENTA);
    }

    @Test
    @Transactional
    public void createPensionistaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pensionistaRepository.findAll().size();

        // Create the Pensionista with an existing ID
        pensionista.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPensionistaMockMvc.perform(post("/api/pensionistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pensionista)))
            .andExpect(status().isBadRequest());

        // Validate the Pensionista in the database
        List<Pensionista> pensionistaList = pensionistaRepository.findAll();
        assertThat(pensionistaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPensionistas() throws Exception {
        // Initialize the database
        pensionistaRepository.saveAndFlush(pensionista);

        // Get all the pensionistaList
        restPensionistaMockMvc.perform(get("/api/pensionistas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pensionista.getId().intValue())))
            .andExpect(jsonPath("$.[*].situacionPension").value(hasItem(DEFAULT_SITUACION_PENSION.intValue())))
            .andExpect(jsonPath("$.[*].ingresosTotales").value(hasItem(DEFAULT_INGRESOS_TOTALES.intValue())))
            .andExpect(jsonPath("$.[*].trabaja").value(hasItem(DEFAULT_TRABAJA.booleanValue())))
            .andExpect(jsonPath("$.[*].totalConvivientes").value(hasItem(DEFAULT_TOTAL_CONVIVIENTES.intValue())))
            .andExpect(jsonPath("$.[*].ingresosAnualesConvivientes").value(hasItem(DEFAULT_INGRESOS_ANUALES_CONVIVIENTES.intValue())))
            .andExpect(jsonPath("$.[*].gradoMinusvalia").value(hasItem(DEFAULT_GRADO_MINUSVALIA.intValue())))
            .andExpect(jsonPath("$.[*].porcentajeDiscapacidad").value(hasItem(DEFAULT_PORCENTAJE_DISCAPACIDAD.intValue())))
            .andExpect(jsonPath("$.[*].baremoFactoresSocialesComplementarios").value(hasItem(DEFAULT_BAREMO_FACTORES_SOCIALES_COMPLEMENTARIOS.intValue())))
            .andExpect(jsonPath("$.[*].baremoNecesidadTerceraPersona").value(hasItem(DEFAULT_BAREMO_NECESIDAD_TERCERA_PERSONA.intValue())))
            .andExpect(jsonPath("$.[*].fechaSolicitudPension").value(hasItem(DEFAULT_FECHA_SOLICITUD_PENSION.toString())))
            .andExpect(jsonPath("$.[*].fechaResolucionPension").value(hasItem(DEFAULT_FECHA_RESOLUCION_PENSION.toString())))
            .andExpect(jsonPath("$.[*].fechaAltaNomina").value(hasItem(DEFAULT_FECHA_ALTA_NOMINA.toString())))
            .andExpect(jsonPath("$.[*].importeMensualPension").value(hasItem(DEFAULT_IMPORTE_MENSUAL_PENSION.intValue())))
            .andExpect(jsonPath("$.[*].importeMensualComplementoTerceraPersona").value(hasItem(DEFAULT_IMPORTE_MENSUAL_COMPLEMENTO_TERCERA_PERSONA.intValue())))
            .andExpect(jsonPath("$.[*].formaCobro").value(hasItem(DEFAULT_FORMA_COBRO.toString())))
            .andExpect(jsonPath("$.[*].entidadBancaria").value(hasItem(DEFAULT_ENTIDAD_BANCARIA.intValue())))
            .andExpect(jsonPath("$.[*].cuentaBancaria").value(hasItem(DEFAULT_CUENTA_BANCARIA.intValue())))
            .andExpect(jsonPath("$.[*].numeroCuenta").value(hasItem(DEFAULT_NUMERO_CUENTA.toString())));
    }
    
    public void getAllPensionistasWithEagerRelationshipsIsEnabled() throws Exception {
        PensionistaResource pensionistaResource = new PensionistaResource(pensionistaServiceMock);
        when(pensionistaServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restPensionistaMockMvc = MockMvcBuilders.standaloneSetup(pensionistaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPensionistaMockMvc.perform(get("/api/pensionistas?eagerload=true"))
        .andExpect(status().isOk());

        verify(pensionistaServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllPensionistasWithEagerRelationshipsIsNotEnabled() throws Exception {
        PensionistaResource pensionistaResource = new PensionistaResource(pensionistaServiceMock);
            when(pensionistaServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restPensionistaMockMvc = MockMvcBuilders.standaloneSetup(pensionistaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPensionistaMockMvc.perform(get("/api/pensionistas?eagerload=true"))
        .andExpect(status().isOk());

            verify(pensionistaServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPensionista() throws Exception {
        // Initialize the database
        pensionistaRepository.saveAndFlush(pensionista);

        // Get the pensionista
        restPensionistaMockMvc.perform(get("/api/pensionistas/{id}", pensionista.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pensionista.getId().intValue()))
            .andExpect(jsonPath("$.situacionPension").value(DEFAULT_SITUACION_PENSION.intValue()))
            .andExpect(jsonPath("$.ingresosTotales").value(DEFAULT_INGRESOS_TOTALES.intValue()))
            .andExpect(jsonPath("$.trabaja").value(DEFAULT_TRABAJA.booleanValue()))
            .andExpect(jsonPath("$.totalConvivientes").value(DEFAULT_TOTAL_CONVIVIENTES.intValue()))
            .andExpect(jsonPath("$.ingresosAnualesConvivientes").value(DEFAULT_INGRESOS_ANUALES_CONVIVIENTES.intValue()))
            .andExpect(jsonPath("$.gradoMinusvalia").value(DEFAULT_GRADO_MINUSVALIA.intValue()))
            .andExpect(jsonPath("$.porcentajeDiscapacidad").value(DEFAULT_PORCENTAJE_DISCAPACIDAD.intValue()))
            .andExpect(jsonPath("$.baremoFactoresSocialesComplementarios").value(DEFAULT_BAREMO_FACTORES_SOCIALES_COMPLEMENTARIOS.intValue()))
            .andExpect(jsonPath("$.baremoNecesidadTerceraPersona").value(DEFAULT_BAREMO_NECESIDAD_TERCERA_PERSONA.intValue()))
            .andExpect(jsonPath("$.fechaSolicitudPension").value(DEFAULT_FECHA_SOLICITUD_PENSION.toString()))
            .andExpect(jsonPath("$.fechaResolucionPension").value(DEFAULT_FECHA_RESOLUCION_PENSION.toString()))
            .andExpect(jsonPath("$.fechaAltaNomina").value(DEFAULT_FECHA_ALTA_NOMINA.toString()))
            .andExpect(jsonPath("$.importeMensualPension").value(DEFAULT_IMPORTE_MENSUAL_PENSION.intValue()))
            .andExpect(jsonPath("$.importeMensualComplementoTerceraPersona").value(DEFAULT_IMPORTE_MENSUAL_COMPLEMENTO_TERCERA_PERSONA.intValue()))
            .andExpect(jsonPath("$.formaCobro").value(DEFAULT_FORMA_COBRO.toString()))
            .andExpect(jsonPath("$.entidadBancaria").value(DEFAULT_ENTIDAD_BANCARIA.intValue()))
            .andExpect(jsonPath("$.cuentaBancaria").value(DEFAULT_CUENTA_BANCARIA.intValue()))
            .andExpect(jsonPath("$.numeroCuenta").value(DEFAULT_NUMERO_CUENTA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPensionista() throws Exception {
        // Get the pensionista
        restPensionistaMockMvc.perform(get("/api/pensionistas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePensionista() throws Exception {
        // Initialize the database
        pensionistaService.save(pensionista);

        int databaseSizeBeforeUpdate = pensionistaRepository.findAll().size();

        // Update the pensionista
        Pensionista updatedPensionista = pensionistaRepository.findById(pensionista.getId()).get();
        // Disconnect from session so that the updates on updatedPensionista are not directly saved in db
        em.detach(updatedPensionista);
        updatedPensionista
            .situacionPension(UPDATED_SITUACION_PENSION)
            .ingresosTotales(UPDATED_INGRESOS_TOTALES)
            .trabaja(UPDATED_TRABAJA)
            .totalConvivientes(UPDATED_TOTAL_CONVIVIENTES)
            .ingresosAnualesConvivientes(UPDATED_INGRESOS_ANUALES_CONVIVIENTES)
            .gradoMinusvalia(UPDATED_GRADO_MINUSVALIA)
            .porcentajeDiscapacidad(UPDATED_PORCENTAJE_DISCAPACIDAD)
            .baremoFactoresSocialesComplementarios(UPDATED_BAREMO_FACTORES_SOCIALES_COMPLEMENTARIOS)
            .baremoNecesidadTerceraPersona(UPDATED_BAREMO_NECESIDAD_TERCERA_PERSONA)
            .fechaSolicitudPension(UPDATED_FECHA_SOLICITUD_PENSION)
            .fechaResolucionPension(UPDATED_FECHA_RESOLUCION_PENSION)
            .fechaAltaNomina(UPDATED_FECHA_ALTA_NOMINA)
            .importeMensualPension(UPDATED_IMPORTE_MENSUAL_PENSION)
            .importeMensualComplementoTerceraPersona(UPDATED_IMPORTE_MENSUAL_COMPLEMENTO_TERCERA_PERSONA)
            .formaCobro(UPDATED_FORMA_COBRO)
            .entidadBancaria(UPDATED_ENTIDAD_BANCARIA)
            .cuentaBancaria(UPDATED_CUENTA_BANCARIA)
            .numeroCuenta(UPDATED_NUMERO_CUENTA);

        restPensionistaMockMvc.perform(put("/api/pensionistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPensionista)))
            .andExpect(status().isOk());

        // Validate the Pensionista in the database
        List<Pensionista> pensionistaList = pensionistaRepository.findAll();
        assertThat(pensionistaList).hasSize(databaseSizeBeforeUpdate);
        Pensionista testPensionista = pensionistaList.get(pensionistaList.size() - 1);
        assertThat(testPensionista.getSituacionPension()).isEqualTo(UPDATED_SITUACION_PENSION);
        assertThat(testPensionista.getIngresosTotales()).isEqualTo(UPDATED_INGRESOS_TOTALES);
        assertThat(testPensionista.isTrabaja()).isEqualTo(UPDATED_TRABAJA);
        assertThat(testPensionista.getTotalConvivientes()).isEqualTo(UPDATED_TOTAL_CONVIVIENTES);
        assertThat(testPensionista.getIngresosAnualesConvivientes()).isEqualTo(UPDATED_INGRESOS_ANUALES_CONVIVIENTES);
        assertThat(testPensionista.getGradoMinusvalia()).isEqualTo(UPDATED_GRADO_MINUSVALIA);
        assertThat(testPensionista.getPorcentajeDiscapacidad()).isEqualTo(UPDATED_PORCENTAJE_DISCAPACIDAD);
        assertThat(testPensionista.getBaremoFactoresSocialesComplementarios()).isEqualTo(UPDATED_BAREMO_FACTORES_SOCIALES_COMPLEMENTARIOS);
        assertThat(testPensionista.getBaremoNecesidadTerceraPersona()).isEqualTo(UPDATED_BAREMO_NECESIDAD_TERCERA_PERSONA);
        assertThat(testPensionista.getFechaSolicitudPension()).isEqualTo(UPDATED_FECHA_SOLICITUD_PENSION);
        assertThat(testPensionista.getFechaResolucionPension()).isEqualTo(UPDATED_FECHA_RESOLUCION_PENSION);
        assertThat(testPensionista.getFechaAltaNomina()).isEqualTo(UPDATED_FECHA_ALTA_NOMINA);
        assertThat(testPensionista.getImporteMensualPension()).isEqualTo(UPDATED_IMPORTE_MENSUAL_PENSION);
        assertThat(testPensionista.getImporteMensualComplementoTerceraPersona()).isEqualTo(UPDATED_IMPORTE_MENSUAL_COMPLEMENTO_TERCERA_PERSONA);
        assertThat(testPensionista.getFormaCobro()).isEqualTo(UPDATED_FORMA_COBRO);
        assertThat(testPensionista.getEntidadBancaria()).isEqualTo(UPDATED_ENTIDAD_BANCARIA);
        assertThat(testPensionista.getCuentaBancaria()).isEqualTo(UPDATED_CUENTA_BANCARIA);
        assertThat(testPensionista.getNumeroCuenta()).isEqualTo(UPDATED_NUMERO_CUENTA);
    }

    @Test
    @Transactional
    public void updateNonExistingPensionista() throws Exception {
        int databaseSizeBeforeUpdate = pensionistaRepository.findAll().size();

        // Create the Pensionista

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPensionistaMockMvc.perform(put("/api/pensionistas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pensionista)))
            .andExpect(status().isBadRequest());

        // Validate the Pensionista in the database
        List<Pensionista> pensionistaList = pensionistaRepository.findAll();
        assertThat(pensionistaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePensionista() throws Exception {
        // Initialize the database
        pensionistaService.save(pensionista);

        int databaseSizeBeforeDelete = pensionistaRepository.findAll().size();

        // Get the pensionista
        restPensionistaMockMvc.perform(delete("/api/pensionistas/{id}", pensionista.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Pensionista> pensionistaList = pensionistaRepository.findAll();
        assertThat(pensionistaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pensionista.class);
        Pensionista pensionista1 = new Pensionista();
        pensionista1.setId(1L);
        Pensionista pensionista2 = new Pensionista();
        pensionista2.setId(pensionista1.getId());
        assertThat(pensionista1).isEqualTo(pensionista2);
        pensionista2.setId(2L);
        assertThat(pensionista1).isNotEqualTo(pensionista2);
        pensionista1.setId(null);
        assertThat(pensionista1).isNotEqualTo(pensionista2);
    }
}

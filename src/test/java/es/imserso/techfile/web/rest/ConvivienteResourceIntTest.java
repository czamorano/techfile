package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.Conviviente;
import es.imserso.techfile.repository.ConvivienteRepository;
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
 * Test class for the ConvivienteResource REST controller.
 *
 * @see ConvivienteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class ConvivienteResourceIntTest {

    private static final Long DEFAULT_ORDEN = 1L;
    private static final Long UPDATED_ORDEN = 2L;

    @Autowired
    private ConvivienteRepository convivienteRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConvivienteMockMvc;

    private Conviviente conviviente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConvivienteResource convivienteResource = new ConvivienteResource(convivienteRepository);
        this.restConvivienteMockMvc = MockMvcBuilders.standaloneSetup(convivienteResource)
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
    public static Conviviente createEntity(EntityManager em) {
        Conviviente conviviente = new Conviviente()
            .orden(DEFAULT_ORDEN);
        return conviviente;
    }

    @Before
    public void initTest() {
        conviviente = createEntity(em);
    }

    @Test
    @Transactional
    public void createConviviente() throws Exception {
        int databaseSizeBeforeCreate = convivienteRepository.findAll().size();

        // Create the Conviviente
        restConvivienteMockMvc.perform(post("/api/convivientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conviviente)))
            .andExpect(status().isCreated());

        // Validate the Conviviente in the database
        List<Conviviente> convivienteList = convivienteRepository.findAll();
        assertThat(convivienteList).hasSize(databaseSizeBeforeCreate + 1);
        Conviviente testConviviente = convivienteList.get(convivienteList.size() - 1);
        assertThat(testConviviente.getOrden()).isEqualTo(DEFAULT_ORDEN);
    }

    @Test
    @Transactional
    public void createConvivienteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = convivienteRepository.findAll().size();

        // Create the Conviviente with an existing ID
        conviviente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConvivienteMockMvc.perform(post("/api/convivientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conviviente)))
            .andExpect(status().isBadRequest());

        // Validate the Conviviente in the database
        List<Conviviente> convivienteList = convivienteRepository.findAll();
        assertThat(convivienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkOrdenIsRequired() throws Exception {
        int databaseSizeBeforeTest = convivienteRepository.findAll().size();
        // set the field null
        conviviente.setOrden(null);

        // Create the Conviviente, which fails.

        restConvivienteMockMvc.perform(post("/api/convivientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conviviente)))
            .andExpect(status().isBadRequest());

        List<Conviviente> convivienteList = convivienteRepository.findAll();
        assertThat(convivienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConvivientes() throws Exception {
        // Initialize the database
        convivienteRepository.saveAndFlush(conviviente);

        // Get all the convivienteList
        restConvivienteMockMvc.perform(get("/api/convivientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(conviviente.getId().intValue())))
            .andExpect(jsonPath("$.[*].orden").value(hasItem(DEFAULT_ORDEN.intValue())));
    }
    

    @Test
    @Transactional
    public void getConviviente() throws Exception {
        // Initialize the database
        convivienteRepository.saveAndFlush(conviviente);

        // Get the conviviente
        restConvivienteMockMvc.perform(get("/api/convivientes/{id}", conviviente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(conviviente.getId().intValue()))
            .andExpect(jsonPath("$.orden").value(DEFAULT_ORDEN.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingConviviente() throws Exception {
        // Get the conviviente
        restConvivienteMockMvc.perform(get("/api/convivientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConviviente() throws Exception {
        // Initialize the database
        convivienteRepository.saveAndFlush(conviviente);

        int databaseSizeBeforeUpdate = convivienteRepository.findAll().size();

        // Update the conviviente
        Conviviente updatedConviviente = convivienteRepository.findById(conviviente.getId()).get();
        // Disconnect from session so that the updates on updatedConviviente are not directly saved in db
        em.detach(updatedConviviente);
        updatedConviviente
            .orden(UPDATED_ORDEN);

        restConvivienteMockMvc.perform(put("/api/convivientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConviviente)))
            .andExpect(status().isOk());

        // Validate the Conviviente in the database
        List<Conviviente> convivienteList = convivienteRepository.findAll();
        assertThat(convivienteList).hasSize(databaseSizeBeforeUpdate);
        Conviviente testConviviente = convivienteList.get(convivienteList.size() - 1);
        assertThat(testConviviente.getOrden()).isEqualTo(UPDATED_ORDEN);
    }

    @Test
    @Transactional
    public void updateNonExistingConviviente() throws Exception {
        int databaseSizeBeforeUpdate = convivienteRepository.findAll().size();

        // Create the Conviviente

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restConvivienteMockMvc.perform(put("/api/convivientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conviviente)))
            .andExpect(status().isBadRequest());

        // Validate the Conviviente in the database
        List<Conviviente> convivienteList = convivienteRepository.findAll();
        assertThat(convivienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConviviente() throws Exception {
        // Initialize the database
        convivienteRepository.saveAndFlush(conviviente);

        int databaseSizeBeforeDelete = convivienteRepository.findAll().size();

        // Get the conviviente
        restConvivienteMockMvc.perform(delete("/api/convivientes/{id}", conviviente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Conviviente> convivienteList = convivienteRepository.findAll();
        assertThat(convivienteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Conviviente.class);
        Conviviente conviviente1 = new Conviviente();
        conviviente1.setId(1L);
        Conviviente conviviente2 = new Conviviente();
        conviviente2.setId(conviviente1.getId());
        assertThat(conviviente1).isEqualTo(conviviente2);
        conviviente2.setId(2L);
        assertThat(conviviente1).isNotEqualTo(conviviente2);
        conviviente1.setId(null);
        assertThat(conviviente1).isNotEqualTo(conviviente2);
    }
}

package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.Mes;
import es.imserso.techfile.repository.MesRepository;
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
 * Test class for the MesResource REST controller.
 *
 * @see MesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class MesResourceIntTest {

    private static final Long DEFAULT_AGNO = 1L;
    private static final Long UPDATED_AGNO = 2L;

    private static final Long DEFAULT_MES = 1L;
    private static final Long UPDATED_MES = 2L;

    @Autowired
    private MesRepository mesRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMesMockMvc;

    private Mes mes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MesResource mesResource = new MesResource(mesRepository);
        this.restMesMockMvc = MockMvcBuilders.standaloneSetup(mesResource)
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
    public static Mes createEntity(EntityManager em) {
        Mes mes = new Mes()
            .agno(DEFAULT_AGNO)
            .mes(DEFAULT_MES);
        return mes;
    }

    @Before
    public void initTest() {
        mes = createEntity(em);
    }

    @Test
    @Transactional
    public void createMes() throws Exception {
        int databaseSizeBeforeCreate = mesRepository.findAll().size();

        // Create the Mes
        restMesMockMvc.perform(post("/api/mes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mes)))
            .andExpect(status().isCreated());

        // Validate the Mes in the database
        List<Mes> mesList = mesRepository.findAll();
        assertThat(mesList).hasSize(databaseSizeBeforeCreate + 1);
        Mes testMes = mesList.get(mesList.size() - 1);
        assertThat(testMes.getAgno()).isEqualTo(DEFAULT_AGNO);
        assertThat(testMes.getMes()).isEqualTo(DEFAULT_MES);
    }

    @Test
    @Transactional
    public void createMesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mesRepository.findAll().size();

        // Create the Mes with an existing ID
        mes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMesMockMvc.perform(post("/api/mes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mes)))
            .andExpect(status().isBadRequest());

        // Validate the Mes in the database
        List<Mes> mesList = mesRepository.findAll();
        assertThat(mesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAgnoIsRequired() throws Exception {
        int databaseSizeBeforeTest = mesRepository.findAll().size();
        // set the field null
        mes.setAgno(null);

        // Create the Mes, which fails.

        restMesMockMvc.perform(post("/api/mes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mes)))
            .andExpect(status().isBadRequest());

        List<Mes> mesList = mesRepository.findAll();
        assertThat(mesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMesIsRequired() throws Exception {
        int databaseSizeBeforeTest = mesRepository.findAll().size();
        // set the field null
        mes.setMes(null);

        // Create the Mes, which fails.

        restMesMockMvc.perform(post("/api/mes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mes)))
            .andExpect(status().isBadRequest());

        List<Mes> mesList = mesRepository.findAll();
        assertThat(mesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMes() throws Exception {
        // Initialize the database
        mesRepository.saveAndFlush(mes);

        // Get all the mesList
        restMesMockMvc.perform(get("/api/mes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mes.getId().intValue())))
            .andExpect(jsonPath("$.[*].agno").value(hasItem(DEFAULT_AGNO.intValue())))
            .andExpect(jsonPath("$.[*].mes").value(hasItem(DEFAULT_MES.intValue())));
    }
    

    @Test
    @Transactional
    public void getMes() throws Exception {
        // Initialize the database
        mesRepository.saveAndFlush(mes);

        // Get the mes
        restMesMockMvc.perform(get("/api/mes/{id}", mes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mes.getId().intValue()))
            .andExpect(jsonPath("$.agno").value(DEFAULT_AGNO.intValue()))
            .andExpect(jsonPath("$.mes").value(DEFAULT_MES.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingMes() throws Exception {
        // Get the mes
        restMesMockMvc.perform(get("/api/mes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMes() throws Exception {
        // Initialize the database
        mesRepository.saveAndFlush(mes);

        int databaseSizeBeforeUpdate = mesRepository.findAll().size();

        // Update the mes
        Mes updatedMes = mesRepository.findById(mes.getId()).get();
        // Disconnect from session so that the updates on updatedMes are not directly saved in db
        em.detach(updatedMes);
        updatedMes
            .agno(UPDATED_AGNO)
            .mes(UPDATED_MES);

        restMesMockMvc.perform(put("/api/mes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMes)))
            .andExpect(status().isOk());

        // Validate the Mes in the database
        List<Mes> mesList = mesRepository.findAll();
        assertThat(mesList).hasSize(databaseSizeBeforeUpdate);
        Mes testMes = mesList.get(mesList.size() - 1);
        assertThat(testMes.getAgno()).isEqualTo(UPDATED_AGNO);
        assertThat(testMes.getMes()).isEqualTo(UPDATED_MES);
    }

    @Test
    @Transactional
    public void updateNonExistingMes() throws Exception {
        int databaseSizeBeforeUpdate = mesRepository.findAll().size();

        // Create the Mes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMesMockMvc.perform(put("/api/mes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mes)))
            .andExpect(status().isBadRequest());

        // Validate the Mes in the database
        List<Mes> mesList = mesRepository.findAll();
        assertThat(mesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMes() throws Exception {
        // Initialize the database
        mesRepository.saveAndFlush(mes);

        int databaseSizeBeforeDelete = mesRepository.findAll().size();

        // Get the mes
        restMesMockMvc.perform(delete("/api/mes/{id}", mes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mes> mesList = mesRepository.findAll();
        assertThat(mesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mes.class);
        Mes mes1 = new Mes();
        mes1.setId(1L);
        Mes mes2 = new Mes();
        mes2.setId(mes1.getId());
        assertThat(mes1).isEqualTo(mes2);
        mes2.setId(2L);
        assertThat(mes1).isNotEqualTo(mes2);
        mes1.setId(null);
        assertThat(mes1).isNotEqualTo(mes2);
    }
}

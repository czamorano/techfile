package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.Discapacidad;
import es.imserso.techfile.repository.DiscapacidadRepository;
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
 * Test class for the DiscapacidadResource REST controller.
 *
 * @see DiscapacidadResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class DiscapacidadResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private DiscapacidadRepository discapacidadRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDiscapacidadMockMvc;

    private Discapacidad discapacidad;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DiscapacidadResource discapacidadResource = new DiscapacidadResource(discapacidadRepository);
        this.restDiscapacidadMockMvc = MockMvcBuilders.standaloneSetup(discapacidadResource)
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
    public static Discapacidad createEntity(EntityManager em) {
        Discapacidad discapacidad = new Discapacidad()
            .descripcion(DEFAULT_DESCRIPCION);
        return discapacidad;
    }

    @Before
    public void initTest() {
        discapacidad = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiscapacidad() throws Exception {
        int databaseSizeBeforeCreate = discapacidadRepository.findAll().size();

        // Create the Discapacidad
        restDiscapacidadMockMvc.perform(post("/api/discapacidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(discapacidad)))
            .andExpect(status().isCreated());

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeCreate + 1);
        Discapacidad testDiscapacidad = discapacidadList.get(discapacidadList.size() - 1);
        assertThat(testDiscapacidad.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createDiscapacidadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = discapacidadRepository.findAll().size();

        // Create the Discapacidad with an existing ID
        discapacidad.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiscapacidadMockMvc.perform(post("/api/discapacidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(discapacidad)))
            .andExpect(status().isBadRequest());

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = discapacidadRepository.findAll().size();
        // set the field null
        discapacidad.setDescripcion(null);

        // Create the Discapacidad, which fails.

        restDiscapacidadMockMvc.perform(post("/api/discapacidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(discapacidad)))
            .andExpect(status().isBadRequest());

        List<Discapacidad> discapacidadList = discapacidadRepository.findAll();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDiscapacidads() throws Exception {
        // Initialize the database
        discapacidadRepository.saveAndFlush(discapacidad);

        // Get all the discapacidadList
        restDiscapacidadMockMvc.perform(get("/api/discapacidads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(discapacidad.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    

    @Test
    @Transactional
    public void getDiscapacidad() throws Exception {
        // Initialize the database
        discapacidadRepository.saveAndFlush(discapacidad);

        // Get the discapacidad
        restDiscapacidadMockMvc.perform(get("/api/discapacidads/{id}", discapacidad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(discapacidad.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDiscapacidad() throws Exception {
        // Get the discapacidad
        restDiscapacidadMockMvc.perform(get("/api/discapacidads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiscapacidad() throws Exception {
        // Initialize the database
        discapacidadRepository.saveAndFlush(discapacidad);

        int databaseSizeBeforeUpdate = discapacidadRepository.findAll().size();

        // Update the discapacidad
        Discapacidad updatedDiscapacidad = discapacidadRepository.findById(discapacidad.getId()).get();
        // Disconnect from session so that the updates on updatedDiscapacidad are not directly saved in db
        em.detach(updatedDiscapacidad);
        updatedDiscapacidad
            .descripcion(UPDATED_DESCRIPCION);

        restDiscapacidadMockMvc.perform(put("/api/discapacidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiscapacidad)))
            .andExpect(status().isOk());

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeUpdate);
        Discapacidad testDiscapacidad = discapacidadList.get(discapacidadList.size() - 1);
        assertThat(testDiscapacidad.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingDiscapacidad() throws Exception {
        int databaseSizeBeforeUpdate = discapacidadRepository.findAll().size();

        // Create the Discapacidad

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDiscapacidadMockMvc.perform(put("/api/discapacidads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(discapacidad)))
            .andExpect(status().isBadRequest());

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDiscapacidad() throws Exception {
        // Initialize the database
        discapacidadRepository.saveAndFlush(discapacidad);

        int databaseSizeBeforeDelete = discapacidadRepository.findAll().size();

        // Get the discapacidad
        restDiscapacidadMockMvc.perform(delete("/api/discapacidads/{id}", discapacidad.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Discapacidad.class);
        Discapacidad discapacidad1 = new Discapacidad();
        discapacidad1.setId(1L);
        Discapacidad discapacidad2 = new Discapacidad();
        discapacidad2.setId(discapacidad1.getId());
        assertThat(discapacidad1).isEqualTo(discapacidad2);
        discapacidad2.setId(2L);
        assertThat(discapacidad1).isNotEqualTo(discapacidad2);
        discapacidad1.setId(null);
        assertThat(discapacidad1).isNotEqualTo(discapacidad2);
    }
}

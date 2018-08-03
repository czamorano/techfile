package es.imserso.techfile.web.rest;

import es.imserso.techfile.TechfileApp;

import es.imserso.techfile.domain.FicheroByte;
import es.imserso.techfile.repository.FicheroByteRepository;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;


import static es.imserso.techfile.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FicheroByteResource REST controller.
 *
 * @see FicheroByteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TechfileApp.class)
public class FicheroByteResourceIntTest {

    private static final byte[] DEFAULT_FILE_BYTES = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FILE_BYTES = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_FILE_BYTES_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FILE_BYTES_CONTENT_TYPE = "image/png";

    @Autowired
    private FicheroByteRepository ficheroByteRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFicheroByteMockMvc;

    private FicheroByte ficheroByte;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FicheroByteResource ficheroByteResource = new FicheroByteResource(ficheroByteRepository);
        this.restFicheroByteMockMvc = MockMvcBuilders.standaloneSetup(ficheroByteResource)
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
    public static FicheroByte createEntity(EntityManager em) {
        FicheroByte ficheroByte = new FicheroByte()
            .fileBytes(DEFAULT_FILE_BYTES)
            .fileBytesContentType(DEFAULT_FILE_BYTES_CONTENT_TYPE);
        return ficheroByte;
    }

    @Before
    public void initTest() {
        ficheroByte = createEntity(em);
    }

    @Test
    @Transactional
    public void createFicheroByte() throws Exception {
        int databaseSizeBeforeCreate = ficheroByteRepository.findAll().size();

        // Create the FicheroByte
        restFicheroByteMockMvc.perform(post("/api/fichero-bytes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheroByte)))
            .andExpect(status().isCreated());

        // Validate the FicheroByte in the database
        List<FicheroByte> ficheroByteList = ficheroByteRepository.findAll();
        assertThat(ficheroByteList).hasSize(databaseSizeBeforeCreate + 1);
        FicheroByte testFicheroByte = ficheroByteList.get(ficheroByteList.size() - 1);
        assertThat(testFicheroByte.getFileBytes()).isEqualTo(DEFAULT_FILE_BYTES);
        assertThat(testFicheroByte.getFileBytesContentType()).isEqualTo(DEFAULT_FILE_BYTES_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createFicheroByteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ficheroByteRepository.findAll().size();

        // Create the FicheroByte with an existing ID
        ficheroByte.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFicheroByteMockMvc.perform(post("/api/fichero-bytes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheroByte)))
            .andExpect(status().isBadRequest());

        // Validate the FicheroByte in the database
        List<FicheroByte> ficheroByteList = ficheroByteRepository.findAll();
        assertThat(ficheroByteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFicheroBytes() throws Exception {
        // Initialize the database
        ficheroByteRepository.saveAndFlush(ficheroByte);

        // Get all the ficheroByteList
        restFicheroByteMockMvc.perform(get("/api/fichero-bytes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ficheroByte.getId().intValue())))
            .andExpect(jsonPath("$.[*].fileBytesContentType").value(hasItem(DEFAULT_FILE_BYTES_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fileBytes").value(hasItem(Base64Utils.encodeToString(DEFAULT_FILE_BYTES))));
    }
    

    @Test
    @Transactional
    public void getFicheroByte() throws Exception {
        // Initialize the database
        ficheroByteRepository.saveAndFlush(ficheroByte);

        // Get the ficheroByte
        restFicheroByteMockMvc.perform(get("/api/fichero-bytes/{id}", ficheroByte.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ficheroByte.getId().intValue()))
            .andExpect(jsonPath("$.fileBytesContentType").value(DEFAULT_FILE_BYTES_CONTENT_TYPE))
            .andExpect(jsonPath("$.fileBytes").value(Base64Utils.encodeToString(DEFAULT_FILE_BYTES)));
    }
    @Test
    @Transactional
    public void getNonExistingFicheroByte() throws Exception {
        // Get the ficheroByte
        restFicheroByteMockMvc.perform(get("/api/fichero-bytes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFicheroByte() throws Exception {
        // Initialize the database
        ficheroByteRepository.saveAndFlush(ficheroByte);

        int databaseSizeBeforeUpdate = ficheroByteRepository.findAll().size();

        // Update the ficheroByte
        FicheroByte updatedFicheroByte = ficheroByteRepository.findById(ficheroByte.getId()).get();
        // Disconnect from session so that the updates on updatedFicheroByte are not directly saved in db
        em.detach(updatedFicheroByte);
        updatedFicheroByte
            .fileBytes(UPDATED_FILE_BYTES)
            .fileBytesContentType(UPDATED_FILE_BYTES_CONTENT_TYPE);

        restFicheroByteMockMvc.perform(put("/api/fichero-bytes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFicheroByte)))
            .andExpect(status().isOk());

        // Validate the FicheroByte in the database
        List<FicheroByte> ficheroByteList = ficheroByteRepository.findAll();
        assertThat(ficheroByteList).hasSize(databaseSizeBeforeUpdate);
        FicheroByte testFicheroByte = ficheroByteList.get(ficheroByteList.size() - 1);
        assertThat(testFicheroByte.getFileBytes()).isEqualTo(UPDATED_FILE_BYTES);
        assertThat(testFicheroByte.getFileBytesContentType()).isEqualTo(UPDATED_FILE_BYTES_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingFicheroByte() throws Exception {
        int databaseSizeBeforeUpdate = ficheroByteRepository.findAll().size();

        // Create the FicheroByte

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFicheroByteMockMvc.perform(put("/api/fichero-bytes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ficheroByte)))
            .andExpect(status().isBadRequest());

        // Validate the FicheroByte in the database
        List<FicheroByte> ficheroByteList = ficheroByteRepository.findAll();
        assertThat(ficheroByteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFicheroByte() throws Exception {
        // Initialize the database
        ficheroByteRepository.saveAndFlush(ficheroByte);

        int databaseSizeBeforeDelete = ficheroByteRepository.findAll().size();

        // Get the ficheroByte
        restFicheroByteMockMvc.perform(delete("/api/fichero-bytes/{id}", ficheroByte.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FicheroByte> ficheroByteList = ficheroByteRepository.findAll();
        assertThat(ficheroByteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FicheroByte.class);
        FicheroByte ficheroByte1 = new FicheroByte();
        ficheroByte1.setId(1L);
        FicheroByte ficheroByte2 = new FicheroByte();
        ficheroByte2.setId(ficheroByte1.getId());
        assertThat(ficheroByte1).isEqualTo(ficheroByte2);
        ficheroByte2.setId(2L);
        assertThat(ficheroByte1).isNotEqualTo(ficheroByte2);
        ficheroByte1.setId(null);
        assertThat(ficheroByte1).isNotEqualTo(ficheroByte2);
    }
}

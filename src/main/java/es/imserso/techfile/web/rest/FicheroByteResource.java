package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.FicheroByte;
import es.imserso.techfile.repository.FicheroByteRepository;
import es.imserso.techfile.web.rest.errors.BadRequestAlertException;
import es.imserso.techfile.web.rest.util.HeaderUtil;
import es.imserso.techfile.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing FicheroByte.
 */
@RestController
@RequestMapping("/api")
public class FicheroByteResource {

    private final Logger log = LoggerFactory.getLogger(FicheroByteResource.class);

    private static final String ENTITY_NAME = "ficheroByte";

    private final FicheroByteRepository ficheroByteRepository;

    public FicheroByteResource(FicheroByteRepository ficheroByteRepository) {
        this.ficheroByteRepository = ficheroByteRepository;
    }

    /**
     * POST  /fichero-bytes : Create a new ficheroByte.
     *
     * @param ficheroByte the ficheroByte to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ficheroByte, or with status 400 (Bad Request) if the ficheroByte has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fichero-bytes")
    @Timed
    public ResponseEntity<FicheroByte> createFicheroByte(@RequestBody FicheroByte ficheroByte) throws URISyntaxException {
        log.debug("REST request to save FicheroByte : {}", ficheroByte);
        if (ficheroByte.getId() != null) {
            throw new BadRequestAlertException("A new ficheroByte cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FicheroByte result = ficheroByteRepository.save(ficheroByte);
        return ResponseEntity.created(new URI("/api/fichero-bytes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fichero-bytes : Updates an existing ficheroByte.
     *
     * @param ficheroByte the ficheroByte to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ficheroByte,
     * or with status 400 (Bad Request) if the ficheroByte is not valid,
     * or with status 500 (Internal Server Error) if the ficheroByte couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fichero-bytes")
    @Timed
    public ResponseEntity<FicheroByte> updateFicheroByte(@RequestBody FicheroByte ficheroByte) throws URISyntaxException {
        log.debug("REST request to update FicheroByte : {}", ficheroByte);
        if (ficheroByte.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FicheroByte result = ficheroByteRepository.save(ficheroByte);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ficheroByte.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fichero-bytes : get all the ficheroBytes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ficheroBytes in body
     */
    @GetMapping("/fichero-bytes")
    @Timed
    public ResponseEntity<List<FicheroByte>> getAllFicheroBytes(Pageable pageable) {
        log.debug("REST request to get a page of FicheroBytes");
        Page<FicheroByte> page = ficheroByteRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/fichero-bytes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /fichero-bytes/:id : get the "id" ficheroByte.
     *
     * @param id the id of the ficheroByte to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ficheroByte, or with status 404 (Not Found)
     */
    @GetMapping("/fichero-bytes/{id}")
    @Timed
    public ResponseEntity<FicheroByte> getFicheroByte(@PathVariable Long id) {
        log.debug("REST request to get FicheroByte : {}", id);
        Optional<FicheroByte> ficheroByte = ficheroByteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ficheroByte);
    }

    /**
     * DELETE  /fichero-bytes/:id : delete the "id" ficheroByte.
     *
     * @param id the id of the ficheroByte to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fichero-bytes/{id}")
    @Timed
    public ResponseEntity<Void> deleteFicheroByte(@PathVariable Long id) {
        log.debug("REST request to delete FicheroByte : {}", id);

        ficheroByteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

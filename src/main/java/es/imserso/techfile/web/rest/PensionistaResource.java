package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.Pensionista;
import es.imserso.techfile.repository.PensionistaRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Pensionista.
 */
@RestController
@RequestMapping("/api")
public class PensionistaResource {

    private final Logger log = LoggerFactory.getLogger(PensionistaResource.class);

    private static final String ENTITY_NAME = "pensionista";

    private final PensionistaRepository pensionistaRepository;

    public PensionistaResource(PensionistaRepository pensionistaRepository) {
        this.pensionistaRepository = pensionistaRepository;
    }

    /**
     * POST  /pensionistas : Create a new pensionista.
     *
     * @param pensionista the pensionista to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pensionista, or with status 400 (Bad Request) if the pensionista has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pensionistas")
    @Timed
    public ResponseEntity<Pensionista> createPensionista(@Valid @RequestBody Pensionista pensionista) throws URISyntaxException {
        log.debug("REST request to save Pensionista : {}", pensionista);
        if (pensionista.getId() != null) {
            throw new BadRequestAlertException("A new pensionista cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pensionista result = pensionistaRepository.save(pensionista);
        return ResponseEntity.created(new URI("/api/pensionistas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pensionistas : Updates an existing pensionista.
     *
     * @param pensionista the pensionista to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pensionista,
     * or with status 400 (Bad Request) if the pensionista is not valid,
     * or with status 500 (Internal Server Error) if the pensionista couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pensionistas")
    @Timed
    public ResponseEntity<Pensionista> updatePensionista(@Valid @RequestBody Pensionista pensionista) throws URISyntaxException {
        log.debug("REST request to update Pensionista : {}", pensionista);
        if (pensionista.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pensionista result = pensionistaRepository.save(pensionista);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pensionista.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pensionistas : get all the pensionistas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of pensionistas in body
     */
    @GetMapping("/pensionistas")
    @Timed
    public ResponseEntity<List<Pensionista>> getAllPensionistas(Pageable pageable) {
        log.debug("REST request to get a page of Pensionistas");
        Page<Pensionista> page = pensionistaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/pensionistas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /pensionistas/:id : get the "id" pensionista.
     *
     * @param id the id of the pensionista to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pensionista, or with status 404 (Not Found)
     */
    @GetMapping("/pensionistas/{id}")
    @Timed
    public ResponseEntity<Pensionista> getPensionista(@PathVariable Long id) {
        log.debug("REST request to get Pensionista : {}", id);
        Optional<Pensionista> pensionista = pensionistaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pensionista);
    }

    /**
     * DELETE  /pensionistas/:id : delete the "id" pensionista.
     *
     * @param id the id of the pensionista to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pensionistas/{id}")
    @Timed
    public ResponseEntity<Void> deletePensionista(@PathVariable Long id) {
        log.debug("REST request to delete Pensionista : {}", id);

        pensionistaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

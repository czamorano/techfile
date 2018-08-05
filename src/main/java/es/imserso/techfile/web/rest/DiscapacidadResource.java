package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.Discapacidad;
import es.imserso.techfile.repository.DiscapacidadRepository;
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
 * REST controller for managing Discapacidad.
 */
@RestController
@RequestMapping("/api")
public class DiscapacidadResource {

    private final Logger log = LoggerFactory.getLogger(DiscapacidadResource.class);

    private static final String ENTITY_NAME = "discapacidad";

    private final DiscapacidadRepository discapacidadRepository;

    public DiscapacidadResource(DiscapacidadRepository discapacidadRepository) {
        this.discapacidadRepository = discapacidadRepository;
    }

    /**
     * POST  /discapacidads : Create a new discapacidad.
     *
     * @param discapacidad the discapacidad to create
     * @return the ResponseEntity with status 201 (Created) and with body the new discapacidad, or with status 400 (Bad Request) if the discapacidad has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/discapacidads")
    @Timed
    public ResponseEntity<Discapacidad> createDiscapacidad(@Valid @RequestBody Discapacidad discapacidad) throws URISyntaxException {
        log.debug("REST request to save Discapacidad : {}", discapacidad);
        if (discapacidad.getId() != null) {
            throw new BadRequestAlertException("A new discapacidad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Discapacidad result = discapacidadRepository.save(discapacidad);
        return ResponseEntity.created(new URI("/api/discapacidads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /discapacidads : Updates an existing discapacidad.
     *
     * @param discapacidad the discapacidad to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated discapacidad,
     * or with status 400 (Bad Request) if the discapacidad is not valid,
     * or with status 500 (Internal Server Error) if the discapacidad couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/discapacidads")
    @Timed
    public ResponseEntity<Discapacidad> updateDiscapacidad(@Valid @RequestBody Discapacidad discapacidad) throws URISyntaxException {
        log.debug("REST request to update Discapacidad : {}", discapacidad);
        if (discapacidad.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Discapacidad result = discapacidadRepository.save(discapacidad);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, discapacidad.getId().toString()))
            .body(result);
    }

    /**
     * GET  /discapacidads : get all the discapacidads.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of discapacidads in body
     */
    @GetMapping("/discapacidads")
    @Timed
    public ResponseEntity<List<Discapacidad>> getAllDiscapacidads(Pageable pageable) {
        log.debug("REST request to get a page of Discapacidads");
        Page<Discapacidad> page = discapacidadRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/discapacidads");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /discapacidads/:id : get the "id" discapacidad.
     *
     * @param id the id of the discapacidad to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the discapacidad, or with status 404 (Not Found)
     */
    @GetMapping("/discapacidads/{id}")
    @Timed
    public ResponseEntity<Discapacidad> getDiscapacidad(@PathVariable Long id) {
        log.debug("REST request to get Discapacidad : {}", id);
        Optional<Discapacidad> discapacidad = discapacidadRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(discapacidad);
    }

    /**
     * DELETE  /discapacidads/:id : delete the "id" discapacidad.
     *
     * @param id the id of the discapacidad to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/discapacidads/{id}")
    @Timed
    public ResponseEntity<Void> deleteDiscapacidad(@PathVariable Long id) {
        log.debug("REST request to delete Discapacidad : {}", id);

        discapacidadRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

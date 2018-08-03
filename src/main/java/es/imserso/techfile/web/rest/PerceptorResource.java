package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.Perceptor;
import es.imserso.techfile.repository.PerceptorRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Perceptor.
 */
@RestController
@RequestMapping("/api")
public class PerceptorResource {

    private final Logger log = LoggerFactory.getLogger(PerceptorResource.class);

    private static final String ENTITY_NAME = "perceptor";

    private final PerceptorRepository perceptorRepository;

    public PerceptorResource(PerceptorRepository perceptorRepository) {
        this.perceptorRepository = perceptorRepository;
    }

    /**
     * POST  /perceptors : Create a new perceptor.
     *
     * @param perceptor the perceptor to create
     * @return the ResponseEntity with status 201 (Created) and with body the new perceptor, or with status 400 (Bad Request) if the perceptor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/perceptors")
    @Timed
    public ResponseEntity<Perceptor> createPerceptor(@RequestBody Perceptor perceptor) throws URISyntaxException {
        log.debug("REST request to save Perceptor : {}", perceptor);
        if (perceptor.getId() != null) {
            throw new BadRequestAlertException("A new perceptor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Perceptor result = perceptorRepository.save(perceptor);
        return ResponseEntity.created(new URI("/api/perceptors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /perceptors : Updates an existing perceptor.
     *
     * @param perceptor the perceptor to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated perceptor,
     * or with status 400 (Bad Request) if the perceptor is not valid,
     * or with status 500 (Internal Server Error) if the perceptor couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/perceptors")
    @Timed
    public ResponseEntity<Perceptor> updatePerceptor(@RequestBody Perceptor perceptor) throws URISyntaxException {
        log.debug("REST request to update Perceptor : {}", perceptor);
        if (perceptor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Perceptor result = perceptorRepository.save(perceptor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, perceptor.getId().toString()))
            .body(result);
    }

    /**
     * GET  /perceptors : get all the perceptors.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of perceptors in body
     */
    @GetMapping("/perceptors")
    @Timed
    public ResponseEntity<List<Perceptor>> getAllPerceptors(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("pensionista-is-null".equals(filter)) {
            log.debug("REST request to get all Perceptors where pensionista is null");
            return new ResponseEntity<>(StreamSupport
                .stream(perceptorRepository.findAll().spliterator(), false)
                .filter(perceptor -> perceptor.getPensionista() == null)
                .collect(Collectors.toList()), HttpStatus.OK);
        }
        log.debug("REST request to get a page of Perceptors");
        Page<Perceptor> page = perceptorRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/perceptors");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /perceptors/:id : get the "id" perceptor.
     *
     * @param id the id of the perceptor to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the perceptor, or with status 404 (Not Found)
     */
    @GetMapping("/perceptors/{id}")
    @Timed
    public ResponseEntity<Perceptor> getPerceptor(@PathVariable Long id) {
        log.debug("REST request to get Perceptor : {}", id);
        Optional<Perceptor> perceptor = perceptorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(perceptor);
    }

    /**
     * DELETE  /perceptors/:id : delete the "id" perceptor.
     *
     * @param id the id of the perceptor to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/perceptors/{id}")
    @Timed
    public ResponseEntity<Void> deletePerceptor(@PathVariable Long id) {
        log.debug("REST request to delete Perceptor : {}", id);

        perceptorRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

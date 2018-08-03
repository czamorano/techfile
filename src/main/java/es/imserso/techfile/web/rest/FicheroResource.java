package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.Fichero;
import es.imserso.techfile.service.FicheroService;
import es.imserso.techfile.web.rest.errors.BadRequestAlertException;
import es.imserso.techfile.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Fichero.
 */
@RestController
@RequestMapping("/api")
public class FicheroResource {

    private final Logger log = LoggerFactory.getLogger(FicheroResource.class);

    private static final String ENTITY_NAME = "fichero";

    private final FicheroService ficheroService;

    public FicheroResource(FicheroService ficheroService) {
        this.ficheroService = ficheroService;
    }

    /**
     * POST  /ficheroes : Create a new fichero.
     *
     * @param fichero the fichero to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fichero, or with status 400 (Bad Request) if the fichero has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ficheroes")
    @Timed
    public ResponseEntity<Fichero> createFichero(@Valid @RequestBody Fichero fichero) throws URISyntaxException {
        log.debug("REST request to save Fichero : {}", fichero);
        if (fichero.getId() != null) {
            throw new BadRequestAlertException("A new fichero cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fichero result = ficheroService.save(fichero);
        return ResponseEntity.created(new URI("/api/ficheroes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ficheroes : Updates an existing fichero.
     *
     * @param fichero the fichero to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fichero,
     * or with status 400 (Bad Request) if the fichero is not valid,
     * or with status 500 (Internal Server Error) if the fichero couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ficheroes")
    @Timed
    public ResponseEntity<Fichero> updateFichero(@Valid @RequestBody Fichero fichero) throws URISyntaxException {
        log.debug("REST request to update Fichero : {}", fichero);
        if (fichero.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fichero result = ficheroService.save(fichero);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fichero.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ficheroes : get all the ficheroes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ficheroes in body
     */
    @GetMapping("/ficheroes")
    @Timed
    public List<Fichero> getAllFicheroes() {
        log.debug("REST request to get all Ficheroes");
        return ficheroService.findAll();
    }

    /**
     * GET  /ficheroes/:id : get the "id" fichero.
     *
     * @param id the id of the fichero to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fichero, or with status 404 (Not Found)
     */
    @GetMapping("/ficheroes/{id}")
    @Timed
    public ResponseEntity<Fichero> getFichero(@PathVariable Long id) {
        log.debug("REST request to get Fichero : {}", id);
        Optional<Fichero> fichero = ficheroService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fichero);
    }

    /**
     * DELETE  /ficheroes/:id : delete the "id" fichero.
     *
     * @param id the id of the fichero to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ficheroes/{id}")
    @Timed
    public ResponseEntity<Void> deleteFichero(@PathVariable Long id) {
        log.debug("REST request to delete Fichero : {}", id);
        ficheroService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

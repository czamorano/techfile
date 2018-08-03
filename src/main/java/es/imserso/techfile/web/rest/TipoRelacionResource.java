package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.TipoRelacion;
import es.imserso.techfile.repository.TipoRelacionRepository;
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
 * REST controller for managing TipoRelacion.
 */
@RestController
@RequestMapping("/api")
public class TipoRelacionResource {

    private final Logger log = LoggerFactory.getLogger(TipoRelacionResource.class);

    private static final String ENTITY_NAME = "tipoRelacion";

    private final TipoRelacionRepository tipoRelacionRepository;

    public TipoRelacionResource(TipoRelacionRepository tipoRelacionRepository) {
        this.tipoRelacionRepository = tipoRelacionRepository;
    }

    /**
     * POST  /tipo-relacions : Create a new tipoRelacion.
     *
     * @param tipoRelacion the tipoRelacion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoRelacion, or with status 400 (Bad Request) if the tipoRelacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-relacions")
    @Timed
    public ResponseEntity<TipoRelacion> createTipoRelacion(@Valid @RequestBody TipoRelacion tipoRelacion) throws URISyntaxException {
        log.debug("REST request to save TipoRelacion : {}", tipoRelacion);
        if (tipoRelacion.getId() != null) {
            throw new BadRequestAlertException("A new tipoRelacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoRelacion result = tipoRelacionRepository.save(tipoRelacion);
        return ResponseEntity.created(new URI("/api/tipo-relacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-relacions : Updates an existing tipoRelacion.
     *
     * @param tipoRelacion the tipoRelacion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoRelacion,
     * or with status 400 (Bad Request) if the tipoRelacion is not valid,
     * or with status 500 (Internal Server Error) if the tipoRelacion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-relacions")
    @Timed
    public ResponseEntity<TipoRelacion> updateTipoRelacion(@Valid @RequestBody TipoRelacion tipoRelacion) throws URISyntaxException {
        log.debug("REST request to update TipoRelacion : {}", tipoRelacion);
        if (tipoRelacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoRelacion result = tipoRelacionRepository.save(tipoRelacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoRelacion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-relacions : get all the tipoRelacions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoRelacions in body
     */
    @GetMapping("/tipo-relacions")
    @Timed
    public List<TipoRelacion> getAllTipoRelacions() {
        log.debug("REST request to get all TipoRelacions");
        return tipoRelacionRepository.findAll();
    }

    /**
     * GET  /tipo-relacions/:id : get the "id" tipoRelacion.
     *
     * @param id the id of the tipoRelacion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoRelacion, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-relacions/{id}")
    @Timed
    public ResponseEntity<TipoRelacion> getTipoRelacion(@PathVariable Long id) {
        log.debug("REST request to get TipoRelacion : {}", id);
        Optional<TipoRelacion> tipoRelacion = tipoRelacionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoRelacion);
    }

    /**
     * DELETE  /tipo-relacions/:id : delete the "id" tipoRelacion.
     *
     * @param id the id of the tipoRelacion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-relacions/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipoRelacion(@PathVariable Long id) {
        log.debug("REST request to delete TipoRelacion : {}", id);

        tipoRelacionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

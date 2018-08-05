package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.Mes;
import es.imserso.techfile.repository.MesRepository;
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
 * REST controller for managing Mes.
 */
@RestController
@RequestMapping("/api")
public class MesResource {

    private final Logger log = LoggerFactory.getLogger(MesResource.class);

    private static final String ENTITY_NAME = "mes";

    private final MesRepository mesRepository;

    public MesResource(MesRepository mesRepository) {
        this.mesRepository = mesRepository;
    }

    /**
     * POST  /mes : Create a new mes.
     *
     * @param mes the mes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mes, or with status 400 (Bad Request) if the mes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mes")
    @Timed
    public ResponseEntity<Mes> createMes(@Valid @RequestBody Mes mes) throws URISyntaxException {
        log.debug("REST request to save Mes : {}", mes);
        if (mes.getId() != null) {
            throw new BadRequestAlertException("A new mes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mes result = mesRepository.save(mes);
        return ResponseEntity.created(new URI("/api/mes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mes : Updates an existing mes.
     *
     * @param mes the mes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mes,
     * or with status 400 (Bad Request) if the mes is not valid,
     * or with status 500 (Internal Server Error) if the mes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mes")
    @Timed
    public ResponseEntity<Mes> updateMes(@Valid @RequestBody Mes mes) throws URISyntaxException {
        log.debug("REST request to update Mes : {}", mes);
        if (mes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Mes result = mesRepository.save(mes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mes : get all the mes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of mes in body
     */
    @GetMapping("/mes")
    @Timed
    public ResponseEntity<List<Mes>> getAllMes(Pageable pageable) {
        log.debug("REST request to get a page of Mes");
        Page<Mes> page = mesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/mes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /mes/:id : get the "id" mes.
     *
     * @param id the id of the mes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mes, or with status 404 (Not Found)
     */
    @GetMapping("/mes/{id}")
    @Timed
    public ResponseEntity<Mes> getMes(@PathVariable Long id) {
        log.debug("REST request to get Mes : {}", id);
        Optional<Mes> mes = mesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mes);
    }

    /**
     * DELETE  /mes/:id : delete the "id" mes.
     *
     * @param id the id of the mes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mes/{id}")
    @Timed
    public ResponseEntity<Void> deleteMes(@PathVariable Long id) {
        log.debug("REST request to delete Mes : {}", id);

        mesRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

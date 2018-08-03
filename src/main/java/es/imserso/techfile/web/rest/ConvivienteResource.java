package es.imserso.techfile.web.rest;

import com.codahale.metrics.annotation.Timed;
import es.imserso.techfile.domain.Conviviente;
import es.imserso.techfile.repository.ConvivienteRepository;
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
 * REST controller for managing Conviviente.
 */
@RestController
@RequestMapping("/api")
public class ConvivienteResource {

    private final Logger log = LoggerFactory.getLogger(ConvivienteResource.class);

    private static final String ENTITY_NAME = "conviviente";

    private final ConvivienteRepository convivienteRepository;

    public ConvivienteResource(ConvivienteRepository convivienteRepository) {
        this.convivienteRepository = convivienteRepository;
    }

    /**
     * POST  /convivientes : Create a new conviviente.
     *
     * @param conviviente the conviviente to create
     * @return the ResponseEntity with status 201 (Created) and with body the new conviviente, or with status 400 (Bad Request) if the conviviente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/convivientes")
    @Timed
    public ResponseEntity<Conviviente> createConviviente(@Valid @RequestBody Conviviente conviviente) throws URISyntaxException {
        log.debug("REST request to save Conviviente : {}", conviviente);
        if (conviviente.getId() != null) {
            throw new BadRequestAlertException("A new conviviente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Conviviente result = convivienteRepository.save(conviviente);
        return ResponseEntity.created(new URI("/api/convivientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /convivientes : Updates an existing conviviente.
     *
     * @param conviviente the conviviente to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated conviviente,
     * or with status 400 (Bad Request) if the conviviente is not valid,
     * or with status 500 (Internal Server Error) if the conviviente couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/convivientes")
    @Timed
    public ResponseEntity<Conviviente> updateConviviente(@Valid @RequestBody Conviviente conviviente) throws URISyntaxException {
        log.debug("REST request to update Conviviente : {}", conviviente);
        if (conviviente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Conviviente result = convivienteRepository.save(conviviente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, conviviente.getId().toString()))
            .body(result);
    }

    /**
     * GET  /convivientes : get all the convivientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of convivientes in body
     */
    @GetMapping("/convivientes")
    @Timed
    public ResponseEntity<List<Conviviente>> getAllConvivientes(Pageable pageable) {
        log.debug("REST request to get a page of Convivientes");
        Page<Conviviente> page = convivienteRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/convivientes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /convivientes/:id : get the "id" conviviente.
     *
     * @param id the id of the conviviente to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the conviviente, or with status 404 (Not Found)
     */
    @GetMapping("/convivientes/{id}")
    @Timed
    public ResponseEntity<Conviviente> getConviviente(@PathVariable Long id) {
        log.debug("REST request to get Conviviente : {}", id);
        Optional<Conviviente> conviviente = convivienteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(conviviente);
    }

    /**
     * DELETE  /convivientes/:id : delete the "id" conviviente.
     *
     * @param id the id of the conviviente to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/convivientes/{id}")
    @Timed
    public ResponseEntity<Void> deleteConviviente(@PathVariable Long id) {
        log.debug("REST request to delete Conviviente : {}", id);

        convivienteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

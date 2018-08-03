package es.imserso.techfile.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Conviviente.
 */
@Entity
@Table(name = "conviviente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Conviviente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "orden", nullable = false)
    private Long orden;

    @ManyToOne
    @JsonIgnoreProperties("convivientes")
    private Pensionista pensionista;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrden() {
        return orden;
    }

    public Conviviente orden(Long orden) {
        this.orden = orden;
        return this;
    }

    public void setOrden(Long orden) {
        this.orden = orden;
    }

    public Pensionista getPensionista() {
        return pensionista;
    }

    public Conviviente pensionista(Pensionista pensionista) {
        this.pensionista = pensionista;
        return this;
    }

    public void setPensionista(Pensionista pensionista) {
        this.pensionista = pensionista;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Conviviente conviviente = (Conviviente) o;
        if (conviviente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), conviviente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Conviviente{" +
            "id=" + getId() +
            ", orden=" + getOrden() +
            "}";
    }
}

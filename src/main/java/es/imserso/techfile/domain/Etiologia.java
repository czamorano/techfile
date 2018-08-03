package es.imserso.techfile.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Etiologia.
 */
@Entity
@Table(name = "etiologia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Etiologia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @ManyToMany(mappedBy = "etiologias")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Pensionista> pensionistas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Etiologia descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Pensionista> getPensionistas() {
        return pensionistas;
    }

    public Etiologia pensionistas(Set<Pensionista> pensionistas) {
        this.pensionistas = pensionistas;
        return this;
    }

    public Etiologia addPensionista(Pensionista pensionista) {
        this.pensionistas.add(pensionista);
        pensionista.getEtiologias().add(this);
        return this;
    }

    public Etiologia removePensionista(Pensionista pensionista) {
        this.pensionistas.remove(pensionista);
        pensionista.getEtiologias().remove(this);
        return this;
    }

    public void setPensionistas(Set<Pensionista> pensionistas) {
        this.pensionistas = pensionistas;
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
        Etiologia etiologia = (Etiologia) o;
        if (etiologia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), etiologia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Etiologia{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}

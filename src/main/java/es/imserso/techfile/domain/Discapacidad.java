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
 * A Discapacidad.
 */
@Entity
@Table(name = "discapacidad")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Discapacidad implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @ManyToMany(mappedBy = "discapacidads")
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

    public Discapacidad descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Pensionista> getPensionistas() {
        return pensionistas;
    }

    public Discapacidad pensionistas(Set<Pensionista> pensionistas) {
        this.pensionistas = pensionistas;
        return this;
    }

    public Discapacidad addPensionista(Pensionista pensionista) {
        this.pensionistas.add(pensionista);
        pensionista.getDiscapacidads().add(this);
        return this;
    }

    public Discapacidad removePensionista(Pensionista pensionista) {
        this.pensionistas.remove(pensionista);
        pensionista.getDiscapacidads().remove(this);
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
        Discapacidad discapacidad = (Discapacidad) o;
        if (discapacidad.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), discapacidad.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Discapacidad{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}

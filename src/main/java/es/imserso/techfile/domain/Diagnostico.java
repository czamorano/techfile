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
 * A Diagnostico.
 */
@Entity
@Table(name = "diagnostico")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Diagnostico implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @ManyToMany(mappedBy = "diagnosticos")
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

    public Diagnostico descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Pensionista> getPensionistas() {
        return pensionistas;
    }

    public Diagnostico pensionistas(Set<Pensionista> pensionistas) {
        this.pensionistas = pensionistas;
        return this;
    }

    public Diagnostico addPensionista(Pensionista pensionista) {
        this.pensionistas.add(pensionista);
        pensionista.getDiagnosticos().add(this);
        return this;
    }

    public Diagnostico removePensionista(Pensionista pensionista) {
        this.pensionistas.remove(pensionista);
        pensionista.getDiagnosticos().remove(this);
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
        Diagnostico diagnostico = (Diagnostico) o;
        if (diagnostico.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), diagnostico.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Diagnostico{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}

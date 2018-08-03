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
 * A Autonomia.
 */
@Entity
@Table(name = "autonomia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Autonomia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "autonomia")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Provincia> provincias = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Autonomia nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<Provincia> getProvincias() {
        return provincias;
    }

    public Autonomia provincias(Set<Provincia> provincias) {
        this.provincias = provincias;
        return this;
    }

    public Autonomia addProvincia(Provincia provincia) {
        this.provincias.add(provincia);
        provincia.setAutonomia(this);
        return this;
    }

    public Autonomia removeProvincia(Provincia provincia) {
        this.provincias.remove(provincia);
        provincia.setAutonomia(null);
        return this;
    }

    public void setProvincias(Set<Provincia> provincias) {
        this.provincias = provincias;
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
        Autonomia autonomia = (Autonomia) o;
        if (autonomia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), autonomia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Autonomia{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}

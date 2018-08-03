package es.imserso.techfile.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Perceptor.
 */
@Entity
@Table(name = "perceptor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Perceptor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Persona persona;

    @OneToOne(mappedBy = "perceptor")
    @JsonIgnore
    private Pensionista pensionista;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Persona getPersona() {
        return persona;
    }

    public Perceptor persona(Persona persona) {
        this.persona = persona;
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Pensionista getPensionista() {
        return pensionista;
    }

    public Perceptor pensionista(Pensionista pensionista) {
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
        Perceptor perceptor = (Perceptor) o;
        if (perceptor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), perceptor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Perceptor{" +
            "id=" + getId() +
            "}";
    }
}

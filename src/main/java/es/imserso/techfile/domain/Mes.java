package es.imserso.techfile.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "mes")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Mes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "agno", nullable = false)
    private Long agno;

    @NotNull
    @Column(name = "mes", nullable = false)
    private Long mes;

    @ManyToOne
    @JsonIgnoreProperties("mes")
    private Fichero fichero;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAgno() {
        return agno;
    }

    public Mes agno(Long agno) {
        this.agno = agno;
        return this;
    }

    public void setAgno(Long agno) {
        this.agno = agno;
    }

    public Long getMes() {
        return mes;
    }

    public Mes mes(Long mes) {
        this.mes = mes;
        return this;
    }

    public void setMes(Long mes) {
        this.mes = mes;
    }

    public Fichero getFichero() {
        return fichero;
    }

    public Mes fichero(Fichero fichero) {
        this.fichero = fichero;
        return this;
    }

    public void setFichero(Fichero fichero) {
        this.fichero = fichero;
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
        Mes mes = (Mes) o;
        if (mes.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mes.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mes{" +
            "id=" + getId() +
            ", agno=" + getAgno() +
            ", mes=" + getMes() +
            "}";
    }
}

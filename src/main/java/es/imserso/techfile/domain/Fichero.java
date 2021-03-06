package es.imserso.techfile.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A Fichero.
 */
@Entity
@Table(name = "fichero")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fichero implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Column(name = "tamagno", nullable = false)
    private String tamagno;

    @Column(name = "fecha_creacion_origen")
    private LocalDate fechaCreacionOrigen;

    @NotNull
    @Column(name = "fecha_alta_aplicacion", nullable = false)
    private LocalDate fechaAltaAplicacion;

    @Column(name = "encoding")
    private String encoding;

    @NotNull
    @Column(name = "lineas", nullable = false)
    private Long lineas;

    @OneToOne
    @JoinColumn(unique = true)
    private FicheroByte ficheroByte;

    @OneToMany(mappedBy = "fichero")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Proceso> procesos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("")
    private Autonomia autonomia;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Provincia provincia;

    @ManyToOne
    @JsonIgnoreProperties("")
	private Mes mes;

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

    public Fichero nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTamagno() {
        return tamagno;
    }

    public Fichero tamagno(String tamagno) {
        this.tamagno = tamagno;
        return this;
    }

    public void setTamagno(String tamagno) {
        this.tamagno = tamagno;
    }

    public LocalDate getFechaCreacionOrigen() {
        return fechaCreacionOrigen;
    }

    public Fichero fechaCreacionOrigen(LocalDate fechaCreacionOrigen) {
        this.fechaCreacionOrigen = fechaCreacionOrigen;
        return this;
    }

    public void setFechaCreacionOrigen(LocalDate fechaCreacionOrigen) {
        this.fechaCreacionOrigen = fechaCreacionOrigen;
    }

    public LocalDate getFechaAltaAplicacion() {
        return fechaAltaAplicacion;
    }

    public Fichero fechaAltaAplicacion(LocalDate fechaAltaAplicacion) {
        this.fechaAltaAplicacion = fechaAltaAplicacion;
        return this;
    }

    public void setFechaAltaAplicacion(LocalDate fechaAltaAplicacion) {
        this.fechaAltaAplicacion = fechaAltaAplicacion;
    }

    public String getEncoding() {
        return encoding;
    }

    public Fichero encoding(String encoding) {
        this.encoding = encoding;
        return this;
    }

    public void setEncoding(String encoding) {
        this.encoding = encoding;
    }

    public Long getLineas() {
        return lineas;
    }

    public Fichero lineas(Long lineas) {
        this.lineas = lineas;
        return this;
    }

    public void setLineas(Long lineas) {
        this.lineas = lineas;
    }

    public FicheroByte getFicheroByte() {
        return ficheroByte;
    }

    public Fichero ficheroByte(FicheroByte ficheroByte) {
        this.ficheroByte = ficheroByte;
        return this;
    }

    public void setFicheroByte(FicheroByte ficheroByte) {
        this.ficheroByte = ficheroByte;
    }

    public Set<Proceso> getProcesos() {
        return procesos;
    }

    public Fichero procesos(Set<Proceso> procesos) {
        this.procesos = procesos;
        return this;
    }

    public Fichero addProceso(Proceso proceso) {
        this.procesos.add(proceso);
        proceso.setFichero(this);
        return this;
    }

    public Fichero removeProceso(Proceso proceso) {
        this.procesos.remove(proceso);
        proceso.setFichero(null);
        return this;
    }

    public void setProcesos(Set<Proceso> procesos) {
        this.procesos = procesos;
    }

    public Autonomia getAutonomia() {
        return autonomia;
    }

    public Fichero autonomia(Autonomia autonomia) {
        this.autonomia = autonomia;
        return this;
    }

    public void setAutonomia(Autonomia autonomia) {
        this.autonomia = autonomia;
    }

    public Provincia getProvincia() {
        return provincia;
    }

    public Fichero provincia(Provincia provincia) {
        this.provincia = provincia;
        return this;
    }

    public void setProvincia(Provincia provincia) {
        this.provincia = provincia;
    }

    public Mes getMes() {
        return mes;
    }

    public Fichero mes(Mes mes) {
        this.mes = mes;
        return this;
    }

    public void setMes(Mes mes) {
        this.mes = mes;
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
        Fichero fichero = (Fichero) o;
        if (fichero.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fichero.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Fichero{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", tamagno='" + getTamagno() + "'" +
            ", fechaCreacionOrigen='" + getFechaCreacionOrigen() + "'" +
            ", fechaAltaAplicacion='" + getFechaAltaAplicacion() + "'" +
            ", encoding='" + getEncoding() + "'" +
            ", lineas=" + getLineas() +
            "}";
    }
}

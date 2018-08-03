package es.imserso.techfile.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import es.imserso.techfile.domain.enumeration.TipoIdentificacion;

import es.imserso.techfile.domain.enumeration.TipoPension;

import es.imserso.techfile.domain.enumeration.Sexo;

import es.imserso.techfile.domain.enumeration.EstadoCivil;

/**
 * A Persona.
 */
@Entity
@Table(name = "persona")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Persona implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Column(name = "apellidos", nullable = false)
    private String apellidos;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_identificacion", nullable = false)
    private TipoIdentificacion tipoIdentificacion;

    @NotNull
    @Column(name = "documento_identificacion", nullable = false)
    private String documentoIdentificacion;

    @NotNull
    @Column(name = "digitos_control", nullable = false)
    private Long digitosControl;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pension", nullable = false)
    private TipoPension tipoPension;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Enumerated(EnumType.STRING)
    @Column(name = "sexo")
    private Sexo sexo;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_civil")
    private EstadoCivil estadoCivil;

    @Column(name = "domicilio")
    private String domicilio;

    @Column(name = "codigo_postal")
    private Long codigoPostal;

    @Column(name = "localidad")
    private String localidad;

    @Column(name = "municipio")
    private Long municipio;

    @Column(name = "nacionalidad")
    private Long nacionalidad;

    @Column(name = "numero_ss")
    private Long numeroSS;

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

    public Persona nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public Persona apellidos(String apellidos) {
        this.apellidos = apellidos;
        return this;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public TipoIdentificacion getTipoIdentificacion() {
        return tipoIdentificacion;
    }

    public Persona tipoIdentificacion(TipoIdentificacion tipoIdentificacion) {
        this.tipoIdentificacion = tipoIdentificacion;
        return this;
    }

    public void setTipoIdentificacion(TipoIdentificacion tipoIdentificacion) {
        this.tipoIdentificacion = tipoIdentificacion;
    }

    public String getDocumentoIdentificacion() {
        return documentoIdentificacion;
    }

    public Persona documentoIdentificacion(String documentoIdentificacion) {
        this.documentoIdentificacion = documentoIdentificacion;
        return this;
    }

    public void setDocumentoIdentificacion(String documentoIdentificacion) {
        this.documentoIdentificacion = documentoIdentificacion;
    }

    public Long getDigitosControl() {
        return digitosControl;
    }

    public Persona digitosControl(Long digitosControl) {
        this.digitosControl = digitosControl;
        return this;
    }

    public void setDigitosControl(Long digitosControl) {
        this.digitosControl = digitosControl;
    }

    public TipoPension getTipoPension() {
        return tipoPension;
    }

    public Persona tipoPension(TipoPension tipoPension) {
        this.tipoPension = tipoPension;
        return this;
    }

    public void setTipoPension(TipoPension tipoPension) {
        this.tipoPension = tipoPension;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public Persona fechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
        return this;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Sexo getSexo() {
        return sexo;
    }

    public Persona sexo(Sexo sexo) {
        this.sexo = sexo;
        return this;
    }

    public void setSexo(Sexo sexo) {
        this.sexo = sexo;
    }

    public EstadoCivil getEstadoCivil() {
        return estadoCivil;
    }

    public Persona estadoCivil(EstadoCivil estadoCivil) {
        this.estadoCivil = estadoCivil;
        return this;
    }

    public void setEstadoCivil(EstadoCivil estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public String getDomicilio() {
        return domicilio;
    }

    public Persona domicilio(String domicilio) {
        this.domicilio = domicilio;
        return this;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public Long getCodigoPostal() {
        return codigoPostal;
    }

    public Persona codigoPostal(Long codigoPostal) {
        this.codigoPostal = codigoPostal;
        return this;
    }

    public void setCodigoPostal(Long codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public String getLocalidad() {
        return localidad;
    }

    public Persona localidad(String localidad) {
        this.localidad = localidad;
        return this;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public Long getMunicipio() {
        return municipio;
    }

    public Persona municipio(Long municipio) {
        this.municipio = municipio;
        return this;
    }

    public void setMunicipio(Long municipio) {
        this.municipio = municipio;
    }

    public Long getNacionalidad() {
        return nacionalidad;
    }

    public Persona nacionalidad(Long nacionalidad) {
        this.nacionalidad = nacionalidad;
        return this;
    }

    public void setNacionalidad(Long nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

    public Long getNumeroSS() {
        return numeroSS;
    }

    public Persona numeroSS(Long numeroSS) {
        this.numeroSS = numeroSS;
        return this;
    }

    public void setNumeroSS(Long numeroSS) {
        this.numeroSS = numeroSS;
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
        Persona persona = (Persona) o;
        if (persona.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), persona.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Persona{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", apellidos='" + getApellidos() + "'" +
            ", tipoIdentificacion='" + getTipoIdentificacion() + "'" +
            ", documentoIdentificacion='" + getDocumentoIdentificacion() + "'" +
            ", digitosControl=" + getDigitosControl() +
            ", tipoPension='" + getTipoPension() + "'" +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", sexo='" + getSexo() + "'" +
            ", estadoCivil='" + getEstadoCivil() + "'" +
            ", domicilio='" + getDomicilio() + "'" +
            ", codigoPostal=" + getCodigoPostal() +
            ", localidad='" + getLocalidad() + "'" +
            ", municipio=" + getMunicipio() +
            ", nacionalidad=" + getNacionalidad() +
            ", numeroSS=" + getNumeroSS() +
            "}";
    }
}

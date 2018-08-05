package es.imserso.techfile.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import es.imserso.techfile.domain.enumeration.FormaCobro;

/**
 * A Pensionista.
 */
@Entity
@Table(name = "pensionista")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pensionista implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "situacion_pension")
    private Long situacionPension;

    @Column(name = "ingresos_totales", precision = 10, scale = 2)
    private BigDecimal ingresosTotales;

    @Column(name = "trabaja")
    private Boolean trabaja;

    @Column(name = "total_convivientes")
    private Long totalConvivientes;

    @Column(name = "ingresos_anuales_convivientes", precision = 10, scale = 2)
    private BigDecimal ingresosAnualesConvivientes;

    @Column(name = "grado_minusvalia")
    private Long gradoMinusvalia;

    @Column(name = "porcentaje_discapacidad")
    private Long porcentajeDiscapacidad;

    @Column(name = "baremo_factores_sociales_complementarios")
    private Long baremoFactoresSocialesComplementarios;

    @Column(name = "baremo_necesidad_tercera_persona")
    private Long baremoNecesidadTerceraPersona;

    @Column(name = "fecha_solicitud_pension")
    private LocalDate fechaSolicitudPension;

    @Column(name = "fecha_resolucion_pension")
    private LocalDate fechaResolucionPension;

    @Column(name = "fecha_alta_nomina")
    private LocalDate fechaAltaNomina;

    @Column(name = "importe_mensual_pension", precision = 10, scale = 2)
    private BigDecimal importeMensualPension;

    @Column(name = "importe_mensual_complemento_tercera_persona", precision = 10, scale = 2)
    private BigDecimal importeMensualComplementoTerceraPersona;

    @Enumerated(EnumType.STRING)
    @Column(name = "forma_cobro")
    private FormaCobro formaCobro;

    @Column(name = "entidad_bancaria")
    private Long entidadBancaria;

    @Column(name = "cuenta_bancaria")
    private Long cuentaBancaria;

    @Column(name = "numero_cuenta")
    private String numeroCuenta;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Persona persona;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Perceptor perceptor;

    @OneToMany(mappedBy = "pensionista")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Conviviente> convivientes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("")
    private RegimenProcedencia regimenProcedencia;

    @ManyToOne
    @JsonIgnoreProperties("")
    private PensionConcurrente pensionConcurrente;

    @ManyToOne
    @JsonIgnoreProperties("")
    private TipoRelacion tipoRelacion;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Fichero fichero;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Discapacidad discapacidad;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Diagnostico diagnostico;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Etiologia etiologia;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSituacionPension() {
        return situacionPension;
    }

    public Pensionista situacionPension(Long situacionPension) {
        this.situacionPension = situacionPension;
        return this;
    }

    public void setSituacionPension(Long situacionPension) {
        this.situacionPension = situacionPension;
    }

    public BigDecimal getIngresosTotales() {
        return ingresosTotales;
    }

    public Pensionista ingresosTotales(BigDecimal ingresosTotales) {
        this.ingresosTotales = ingresosTotales;
        return this;
    }

    public void setIngresosTotales(BigDecimal ingresosTotales) {
        this.ingresosTotales = ingresosTotales;
    }

    public Boolean isTrabaja() {
        return trabaja;
    }

    public Pensionista trabaja(Boolean trabaja) {
        this.trabaja = trabaja;
        return this;
    }

    public void setTrabaja(Boolean trabaja) {
        this.trabaja = trabaja;
    }

    public Long getTotalConvivientes() {
        return totalConvivientes;
    }

    public Pensionista totalConvivientes(Long totalConvivientes) {
        this.totalConvivientes = totalConvivientes;
        return this;
    }

    public void setTotalConvivientes(Long totalConvivientes) {
        this.totalConvivientes = totalConvivientes;
    }

    public BigDecimal getIngresosAnualesConvivientes() {
        return ingresosAnualesConvivientes;
    }

    public Pensionista ingresosAnualesConvivientes(BigDecimal ingresosAnualesConvivientes) {
        this.ingresosAnualesConvivientes = ingresosAnualesConvivientes;
        return this;
    }

    public void setIngresosAnualesConvivientes(BigDecimal ingresosAnualesConvivientes) {
        this.ingresosAnualesConvivientes = ingresosAnualesConvivientes;
    }

    public Long getGradoMinusvalia() {
        return gradoMinusvalia;
    }

    public Pensionista gradoMinusvalia(Long gradoMinusvalia) {
        this.gradoMinusvalia = gradoMinusvalia;
        return this;
    }

    public void setGradoMinusvalia(Long gradoMinusvalia) {
        this.gradoMinusvalia = gradoMinusvalia;
    }

    public Long getPorcentajeDiscapacidad() {
        return porcentajeDiscapacidad;
    }

    public Pensionista porcentajeDiscapacidad(Long porcentajeDiscapacidad) {
        this.porcentajeDiscapacidad = porcentajeDiscapacidad;
        return this;
    }

    public void setPorcentajeDiscapacidad(Long porcentajeDiscapacidad) {
        this.porcentajeDiscapacidad = porcentajeDiscapacidad;
    }

    public Long getBaremoFactoresSocialesComplementarios() {
        return baremoFactoresSocialesComplementarios;
    }

    public Pensionista baremoFactoresSocialesComplementarios(Long baremoFactoresSocialesComplementarios) {
        this.baremoFactoresSocialesComplementarios = baremoFactoresSocialesComplementarios;
        return this;
    }

    public void setBaremoFactoresSocialesComplementarios(Long baremoFactoresSocialesComplementarios) {
        this.baremoFactoresSocialesComplementarios = baremoFactoresSocialesComplementarios;
    }

    public Long getBaremoNecesidadTerceraPersona() {
        return baremoNecesidadTerceraPersona;
    }

    public Pensionista baremoNecesidadTerceraPersona(Long baremoNecesidadTerceraPersona) {
        this.baremoNecesidadTerceraPersona = baremoNecesidadTerceraPersona;
        return this;
    }

    public void setBaremoNecesidadTerceraPersona(Long baremoNecesidadTerceraPersona) {
        this.baremoNecesidadTerceraPersona = baremoNecesidadTerceraPersona;
    }

    public LocalDate getFechaSolicitudPension() {
        return fechaSolicitudPension;
    }

    public Pensionista fechaSolicitudPension(LocalDate fechaSolicitudPension) {
        this.fechaSolicitudPension = fechaSolicitudPension;
        return this;
    }

    public void setFechaSolicitudPension(LocalDate fechaSolicitudPension) {
        this.fechaSolicitudPension = fechaSolicitudPension;
    }

    public LocalDate getFechaResolucionPension() {
        return fechaResolucionPension;
    }

    public Pensionista fechaResolucionPension(LocalDate fechaResolucionPension) {
        this.fechaResolucionPension = fechaResolucionPension;
        return this;
    }

    public void setFechaResolucionPension(LocalDate fechaResolucionPension) {
        this.fechaResolucionPension = fechaResolucionPension;
    }

    public LocalDate getFechaAltaNomina() {
        return fechaAltaNomina;
    }

    public Pensionista fechaAltaNomina(LocalDate fechaAltaNomina) {
        this.fechaAltaNomina = fechaAltaNomina;
        return this;
    }

    public void setFechaAltaNomina(LocalDate fechaAltaNomina) {
        this.fechaAltaNomina = fechaAltaNomina;
    }

    public BigDecimal getImporteMensualPension() {
        return importeMensualPension;
    }

    public Pensionista importeMensualPension(BigDecimal importeMensualPension) {
        this.importeMensualPension = importeMensualPension;
        return this;
    }

    public void setImporteMensualPension(BigDecimal importeMensualPension) {
        this.importeMensualPension = importeMensualPension;
    }

    public BigDecimal getImporteMensualComplementoTerceraPersona() {
        return importeMensualComplementoTerceraPersona;
    }

    public Pensionista importeMensualComplementoTerceraPersona(BigDecimal importeMensualComplementoTerceraPersona) {
        this.importeMensualComplementoTerceraPersona = importeMensualComplementoTerceraPersona;
        return this;
    }

    public void setImporteMensualComplementoTerceraPersona(BigDecimal importeMensualComplementoTerceraPersona) {
        this.importeMensualComplementoTerceraPersona = importeMensualComplementoTerceraPersona;
    }

    public FormaCobro getFormaCobro() {
        return formaCobro;
    }

    public Pensionista formaCobro(FormaCobro formaCobro) {
        this.formaCobro = formaCobro;
        return this;
    }

    public void setFormaCobro(FormaCobro formaCobro) {
        this.formaCobro = formaCobro;
    }

    public Long getEntidadBancaria() {
        return entidadBancaria;
    }

    public Pensionista entidadBancaria(Long entidadBancaria) {
        this.entidadBancaria = entidadBancaria;
        return this;
    }

    public void setEntidadBancaria(Long entidadBancaria) {
        this.entidadBancaria = entidadBancaria;
    }

    public Long getCuentaBancaria() {
        return cuentaBancaria;
    }

    public Pensionista cuentaBancaria(Long cuentaBancaria) {
        this.cuentaBancaria = cuentaBancaria;
        return this;
    }

    public void setCuentaBancaria(Long cuentaBancaria) {
        this.cuentaBancaria = cuentaBancaria;
    }

    public String getNumeroCuenta() {
        return numeroCuenta;
    }

    public Pensionista numeroCuenta(String numeroCuenta) {
        this.numeroCuenta = numeroCuenta;
        return this;
    }

    public void setNumeroCuenta(String numeroCuenta) {
        this.numeroCuenta = numeroCuenta;
    }

    public Persona getPersona() {
        return persona;
    }

    public Pensionista persona(Persona persona) {
        this.persona = persona;
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Perceptor getPerceptor() {
        return perceptor;
    }

    public Pensionista perceptor(Perceptor perceptor) {
        this.perceptor = perceptor;
        return this;
    }

    public void setPerceptor(Perceptor perceptor) {
        this.perceptor = perceptor;
    }

    public Set<Conviviente> getConvivientes() {
        return convivientes;
    }

    public Pensionista convivientes(Set<Conviviente> convivientes) {
        this.convivientes = convivientes;
        return this;
    }

    public Pensionista addConviviente(Conviviente conviviente) {
        this.convivientes.add(conviviente);
        conviviente.setPensionista(this);
        return this;
    }

    public Pensionista removeConviviente(Conviviente conviviente) {
        this.convivientes.remove(conviviente);
        conviviente.setPensionista(null);
        return this;
    }

    public void setConvivientes(Set<Conviviente> convivientes) {
        this.convivientes = convivientes;
    }

    public RegimenProcedencia getRegimenProcedencia() {
        return regimenProcedencia;
    }

    public Pensionista regimenProcedencia(RegimenProcedencia regimenProcedencia) {
        this.regimenProcedencia = regimenProcedencia;
        return this;
    }

    public void setRegimenProcedencia(RegimenProcedencia regimenProcedencia) {
        this.regimenProcedencia = regimenProcedencia;
    }

    public PensionConcurrente getPensionConcurrente() {
        return pensionConcurrente;
    }

    public Pensionista pensionConcurrente(PensionConcurrente pensionConcurrente) {
        this.pensionConcurrente = pensionConcurrente;
        return this;
    }

    public void setPensionConcurrente(PensionConcurrente pensionConcurrente) {
        this.pensionConcurrente = pensionConcurrente;
    }

    public TipoRelacion getTipoRelacion() {
        return tipoRelacion;
    }

    public Pensionista tipoRelacion(TipoRelacion tipoRelacion) {
        this.tipoRelacion = tipoRelacion;
        return this;
    }

    public void setTipoRelacion(TipoRelacion tipoRelacion) {
        this.tipoRelacion = tipoRelacion;
    }

    public Fichero getFichero() {
        return fichero;
    }

    public Pensionista fichero(Fichero fichero) {
        this.fichero = fichero;
        return this;
    }

    public void setFichero(Fichero fichero) {
        this.fichero = fichero;
    }

    public Discapacidad getDiscapacidad() {
        return discapacidad;
    }

    public Pensionista discapacidad(Discapacidad discapacidad) {
        this.discapacidad = discapacidad;
        return this;
    }

    public void setDiscapacidad(Discapacidad discapacidad) {
        this.discapacidad = discapacidad;
    }

    public Diagnostico getDiagnostico() {
        return diagnostico;
    }

    public Pensionista diagnostico(Diagnostico diagnostico) {
        this.diagnostico = diagnostico;
        return this;
    }

    public void setDiagnostico(Diagnostico diagnostico) {
        this.diagnostico = diagnostico;
    }

    public Etiologia getEtiologia() {
        return etiologia;
    }

    public Pensionista etiologia(Etiologia etiologia) {
        this.etiologia = etiologia;
        return this;
    }

    public void setEtiologia(Etiologia etiologia) {
        this.etiologia = etiologia;
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
        Pensionista pensionista = (Pensionista) o;
        if (pensionista.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pensionista.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pensionista{" +
            "id=" + getId() +
            ", situacionPension=" + getSituacionPension() +
            ", ingresosTotales=" + getIngresosTotales() +
            ", trabaja='" + isTrabaja() + "'" +
            ", totalConvivientes=" + getTotalConvivientes() +
            ", ingresosAnualesConvivientes=" + getIngresosAnualesConvivientes() +
            ", gradoMinusvalia=" + getGradoMinusvalia() +
            ", porcentajeDiscapacidad=" + getPorcentajeDiscapacidad() +
            ", baremoFactoresSocialesComplementarios=" + getBaremoFactoresSocialesComplementarios() +
            ", baremoNecesidadTerceraPersona=" + getBaremoNecesidadTerceraPersona() +
            ", fechaSolicitudPension='" + getFechaSolicitudPension() + "'" +
            ", fechaResolucionPension='" + getFechaResolucionPension() + "'" +
            ", fechaAltaNomina='" + getFechaAltaNomina() + "'" +
            ", importeMensualPension=" + getImporteMensualPension() +
            ", importeMensualComplementoTerceraPersona=" + getImporteMensualComplementoTerceraPersona() +
            ", formaCobro='" + getFormaCobro() + "'" +
            ", entidadBancaria=" + getEntidadBancaria() +
            ", cuentaBancaria=" + getCuentaBancaria() +
            ", numeroCuenta='" + getNumeroCuenta() + "'" +
            "}";
    }
}

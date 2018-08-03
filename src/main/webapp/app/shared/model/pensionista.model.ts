import { Moment } from 'moment';
import { IPersona } from 'app/shared/model//persona.model';
import { IPerceptor } from 'app/shared/model//perceptor.model';
import { IConviviente } from 'app/shared/model//conviviente.model';
import { IRegimenProcedencia } from 'app/shared/model//regimen-procedencia.model';
import { IPensionConcurrente } from 'app/shared/model//pension-concurrente.model';
import { ITipoRelacion } from 'app/shared/model//tipo-relacion.model';
import { IDiscapacidad } from 'app/shared/model//discapacidad.model';
import { IDiagnostico } from 'app/shared/model//diagnostico.model';
import { IEtiologia } from 'app/shared/model//etiologia.model';
import { IFichero } from 'app/shared/model//fichero.model';

export const enum FormaCobro {
    DIRECTO_EN_VENTANILLA = 'DIRECTO_EN_VENTANILLA',
    INGRESO_EN_CUENTA = 'INGRESO_EN_CUENTA'
}

export interface IPensionista {
    id?: number;
    situacionPension?: number;
    ingresosTotales?: number;
    trabaja?: boolean;
    totalConvivientes?: number;
    ingresosAnualesConvivientes?: number;
    gradoMinusvalia?: number;
    porcentajeDiscapacidad?: number;
    baremoFactoresSocialesComplementarios?: number;
    baremoNecesidadTerceraPersona?: number;
    fechaSolicitudPension?: Moment;
    fechaResolucionPension?: Moment;
    fechaAltaNomina?: Moment;
    importeMensualPension?: number;
    importeMensualComplementoTerceraPersona?: number;
    formaCobro?: FormaCobro;
    entidadBancaria?: number;
    cuentaBancaria?: number;
    numeroCuenta?: string;
    persona?: IPersona;
    perceptor?: IPerceptor;
    convivientes?: IConviviente[];
    regimenProcedencia?: IRegimenProcedencia;
    pensionConcurrente?: IPensionConcurrente;
    tipoRelacion?: ITipoRelacion;
    discapacidads?: IDiscapacidad[];
    diagnosticos?: IDiagnostico[];
    etiologias?: IEtiologia[];
    fichero?: IFichero;
}

export class Pensionista implements IPensionista {
    constructor(
        public id?: number,
        public situacionPension?: number,
        public ingresosTotales?: number,
        public trabaja?: boolean,
        public totalConvivientes?: number,
        public ingresosAnualesConvivientes?: number,
        public gradoMinusvalia?: number,
        public porcentajeDiscapacidad?: number,
        public baremoFactoresSocialesComplementarios?: number,
        public baremoNecesidadTerceraPersona?: number,
        public fechaSolicitudPension?: Moment,
        public fechaResolucionPension?: Moment,
        public fechaAltaNomina?: Moment,
        public importeMensualPension?: number,
        public importeMensualComplementoTerceraPersona?: number,
        public formaCobro?: FormaCobro,
        public entidadBancaria?: number,
        public cuentaBancaria?: number,
        public numeroCuenta?: string,
        public persona?: IPersona,
        public perceptor?: IPerceptor,
        public convivientes?: IConviviente[],
        public regimenProcedencia?: IRegimenProcedencia,
        public pensionConcurrente?: IPensionConcurrente,
        public tipoRelacion?: ITipoRelacion,
        public discapacidads?: IDiscapacidad[],
        public diagnosticos?: IDiagnostico[],
        public etiologias?: IEtiologia[],
        public fichero?: IFichero
    ) {
        this.trabaja = false;
    }
}

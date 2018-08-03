import { Moment } from 'moment';
import { IPersonaMySuffix } from 'app/shared/model//persona-my-suffix.model';
import { IPerceptorMySuffix } from 'app/shared/model//perceptor-my-suffix.model';
import { IConvivienteMySuffix } from 'app/shared/model//conviviente-my-suffix.model';
import { IRegimenProcedenciaMySuffix } from 'app/shared/model//regimen-procedencia-my-suffix.model';
import { IPensionConcurrenteMySuffix } from 'app/shared/model//pension-concurrente-my-suffix.model';
import { ITipoRelacionMySuffix } from 'app/shared/model//tipo-relacion-my-suffix.model';
import { IDiscapacidadMySuffix } from 'app/shared/model//discapacidad-my-suffix.model';
import { IDiagnosticoMySuffix } from 'app/shared/model//diagnostico-my-suffix.model';
import { IEtiologiaMySuffix } from 'app/shared/model//etiologia-my-suffix.model';
import { IFicheroMySuffix } from 'app/shared/model//fichero-my-suffix.model';

export const enum FormaCobro {
    DIRECTO_EN_VENTANILLA = 'DIRECTO_EN_VENTANILLA',
    INGRESO_EN_CUENTA = 'INGRESO_EN_CUENTA'
}

export interface IPensionistaMySuffix {
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
    persona?: IPersonaMySuffix;
    perceptor?: IPerceptorMySuffix;
    convivientes?: IConvivienteMySuffix[];
    regimenProcedencia?: IRegimenProcedenciaMySuffix;
    pensionConcurrente?: IPensionConcurrenteMySuffix;
    tipoRelacion?: ITipoRelacionMySuffix;
    discapacidads?: IDiscapacidadMySuffix[];
    diagnosticos?: IDiagnosticoMySuffix[];
    etiologias?: IEtiologiaMySuffix[];
    fichero?: IFicheroMySuffix;
}

export class PensionistaMySuffix implements IPensionistaMySuffix {
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
        public persona?: IPersonaMySuffix,
        public perceptor?: IPerceptorMySuffix,
        public convivientes?: IConvivienteMySuffix[],
        public regimenProcedencia?: IRegimenProcedenciaMySuffix,
        public pensionConcurrente?: IPensionConcurrenteMySuffix,
        public tipoRelacion?: ITipoRelacionMySuffix,
        public discapacidads?: IDiscapacidadMySuffix[],
        public diagnosticos?: IDiagnosticoMySuffix[],
        public etiologias?: IEtiologiaMySuffix[],
        public fichero?: IFicheroMySuffix
    ) {
        this.trabaja = false;
    }
}

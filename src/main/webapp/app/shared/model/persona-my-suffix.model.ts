import { Moment } from 'moment';

export const enum TipoIdentificacion {
    NIF = 'NIF',
    NIE = 'NIE',
    CODIGO_FISCAL = 'CODIGO_FISCAL',
    OTRO = 'OTRO'
}

export const enum TipoPension {
    JUBILACION = 'JUBILACION',
    INVALIDEZ = 'INVALIDEZ'
}

export const enum Sexo {
    HOMBRE = 'HOMBRE',
    MUJER = 'MUJER'
}

export const enum EstadoCivil {
    CASADO = 'CASADO',
    DIVORCIADO = 'DIVORCIADO',
    SEPARADO = 'SEPARADO',
    SOLTERO = 'SOLTERO',
    VIUDO = 'VIUDO'
}

export interface IPersonaMySuffix {
    id?: number;
    nombre?: string;
    apellidos?: string;
    tipoIdentificacion?: TipoIdentificacion;
    documentoIdentificacion?: string;
    digitosControl?: number;
    tipoPension?: TipoPension;
    fechaNacimiento?: Moment;
    sexo?: Sexo;
    estadoCivil?: EstadoCivil;
    domicilio?: string;
    codigoPostal?: number;
    localidad?: string;
    municipio?: number;
    nacionalidad?: number;
    numeroSS?: number;
}

export class PersonaMySuffix implements IPersonaMySuffix {
    constructor(
        public id?: number,
        public nombre?: string,
        public apellidos?: string,
        public tipoIdentificacion?: TipoIdentificacion,
        public documentoIdentificacion?: string,
        public digitosControl?: number,
        public tipoPension?: TipoPension,
        public fechaNacimiento?: Moment,
        public sexo?: Sexo,
        public estadoCivil?: EstadoCivil,
        public domicilio?: string,
        public codigoPostal?: number,
        public localidad?: string,
        public municipio?: number,
        public nacionalidad?: number,
        public numeroSS?: number
    ) {}
}

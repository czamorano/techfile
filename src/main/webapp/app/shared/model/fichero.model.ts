import { Moment } from 'moment';
import { IFicheroByte } from 'app/shared/model//fichero-byte.model';
import { IPensionista } from 'app/shared/model//pensionista.model';
import { IMes } from 'app/shared/model//mes.model';
import { IAutonomia } from 'app/shared/model//autonomia.model';
import { IProvincia } from 'app/shared/model//provincia.model';

export interface IFichero {
    id?: number;
    nombre?: string;
    tamagno?: string;
    fechaCreacionOrigen?: Moment;
    fechaAltaAplicacion?: Moment;
    encoding?: string;
    lineas?: number;
    ficheroByte?: IFicheroByte;
    pensionistas?: IPensionista[];
    mes?: IMes[];
    autonomia?: IAutonomia;
    provincia?: IProvincia;
}

export class Fichero implements IFichero {
    constructor(
        public id?: number,
        public nombre?: string,
        public tamagno?: string,
        public fechaCreacionOrigen?: Moment,
        public fechaAltaAplicacion?: Moment,
        public encoding?: string,
        public lineas?: number,
        public ficheroByte?: IFicheroByte,
        public pensionistas?: IPensionista[],
        public mes?: IMes[],
        public autonomia?: IAutonomia,
        public provincia?: IProvincia
    ) {}
}

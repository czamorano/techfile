import { Moment } from 'moment';
import { IFicheroByteMySuffix } from 'app/shared/model//fichero-byte-my-suffix.model';
import { IPensionistaMySuffix } from 'app/shared/model//pensionista-my-suffix.model';
import { IMesMySuffix } from 'app/shared/model//mes-my-suffix.model';
import { IAutonomiaMySuffix } from 'app/shared/model//autonomia-my-suffix.model';
import { IProvinciaMySuffix } from 'app/shared/model//provincia-my-suffix.model';

export interface IFicheroMySuffix {
    id?: number;
    nombre?: string;
    tamagno?: string;
    fechaCreacionOrigen?: Moment;
    fechaAltaAplicacion?: Moment;
    encoding?: string;
    lineas?: number;
    ficheroByte?: IFicheroByteMySuffix;
    pensionistas?: IPensionistaMySuffix[];
    mes?: IMesMySuffix[];
    autonomia?: IAutonomiaMySuffix;
    provincia?: IProvinciaMySuffix;
}

export class FicheroMySuffix implements IFicheroMySuffix {
    constructor(
        public id?: number,
        public nombre?: string,
        public tamagno?: string,
        public fechaCreacionOrigen?: Moment,
        public fechaAltaAplicacion?: Moment,
        public encoding?: string,
        public lineas?: number,
        public ficheroByte?: IFicheroByteMySuffix,
        public pensionistas?: IPensionistaMySuffix[],
        public mes?: IMesMySuffix[],
        public autonomia?: IAutonomiaMySuffix,
        public provincia?: IProvinciaMySuffix
    ) {}
}

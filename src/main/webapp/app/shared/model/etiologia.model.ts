import { IPensionista } from 'app/shared/model//pensionista.model';

export interface IEtiologia {
    id?: number;
    descripcion?: string;
    pensionistas?: IPensionista[];
}

export class Etiologia implements IEtiologia {
    constructor(public id?: number, public descripcion?: string, public pensionistas?: IPensionista[]) {}
}

import { IPensionista } from 'app/shared/model//pensionista.model';

export interface IDiscapacidad {
    id?: number;
    descripcion?: string;
    pensionistas?: IPensionista[];
}

export class Discapacidad implements IDiscapacidad {
    constructor(public id?: number, public descripcion?: string, public pensionistas?: IPensionista[]) {}
}

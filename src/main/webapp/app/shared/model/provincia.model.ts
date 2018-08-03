import { IAutonomia } from 'app/shared/model//autonomia.model';

export interface IProvincia {
    id?: number;
    nombre?: string;
    autonomia?: IAutonomia;
}

export class Provincia implements IProvincia {
    constructor(public id?: number, public nombre?: string, public autonomia?: IAutonomia) {}
}

import { IProvincia } from 'app/shared/model//provincia.model';

export interface IAutonomia {
    id?: number;
    nombre?: string;
    provincias?: IProvincia[];
}

export class Autonomia implements IAutonomia {
    constructor(public id?: number, public nombre?: string, public provincias?: IProvincia[]) {}
}

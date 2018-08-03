import { IAutonomiaMySuffix } from 'app/shared/model//autonomia-my-suffix.model';

export interface IProvinciaMySuffix {
    id?: number;
    nombre?: string;
    autonomia?: IAutonomiaMySuffix;
}

export class ProvinciaMySuffix implements IProvinciaMySuffix {
    constructor(public id?: number, public nombre?: string, public autonomia?: IAutonomiaMySuffix) {}
}

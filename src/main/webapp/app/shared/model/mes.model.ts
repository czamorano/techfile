import { IFichero } from 'app/shared/model//fichero.model';

export interface IMes {
    id?: number;
    agno?: number;
    mes?: number;
    fichero?: IFichero;
}

export class Mes implements IMes {
    constructor(public id?: number, public agno?: number, public mes?: number, public fichero?: IFichero) {}
}

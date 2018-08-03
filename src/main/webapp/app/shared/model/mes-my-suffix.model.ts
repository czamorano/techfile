import { IFicheroMySuffix } from 'app/shared/model//fichero-my-suffix.model';

export interface IMesMySuffix {
    id?: number;
    agno?: number;
    mes?: number;
    fichero?: IFicheroMySuffix;
}

export class MesMySuffix implements IMesMySuffix {
    constructor(public id?: number, public agno?: number, public mes?: number, public fichero?: IFicheroMySuffix) {}
}

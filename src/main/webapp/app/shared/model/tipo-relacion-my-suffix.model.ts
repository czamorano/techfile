export interface ITipoRelacionMySuffix {
    id?: number;
    descripcion?: string;
}

export class TipoRelacionMySuffix implements ITipoRelacionMySuffix {
    constructor(public id?: number, public descripcion?: string) {}
}

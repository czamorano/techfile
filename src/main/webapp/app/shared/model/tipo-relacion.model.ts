export interface ITipoRelacion {
    id?: number;
    descripcion?: string;
}

export class TipoRelacion implements ITipoRelacion {
    constructor(public id?: number, public descripcion?: string) {}
}

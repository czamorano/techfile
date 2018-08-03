export interface IRegimenProcedencia {
    id?: number;
    descripcion?: string;
}

export class RegimenProcedencia implements IRegimenProcedencia {
    constructor(public id?: number, public descripcion?: string) {}
}

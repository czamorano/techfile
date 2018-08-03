export interface IRegimenProcedenciaMySuffix {
    id?: number;
    descripcion?: string;
}

export class RegimenProcedenciaMySuffix implements IRegimenProcedenciaMySuffix {
    constructor(public id?: number, public descripcion?: string) {}
}

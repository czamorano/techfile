export interface IPensionConcurrente {
    id?: number;
    codigo?: string;
    descripcion?: string;
}

export class PensionConcurrente implements IPensionConcurrente {
    constructor(public id?: number, public codigo?: string, public descripcion?: string) {}
}

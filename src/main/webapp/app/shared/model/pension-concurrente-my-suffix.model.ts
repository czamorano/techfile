export interface IPensionConcurrenteMySuffix {
    id?: number;
    codigo?: string;
    descripcion?: string;
}

export class PensionConcurrenteMySuffix implements IPensionConcurrenteMySuffix {
    constructor(public id?: number, public codigo?: string, public descripcion?: string) {}
}

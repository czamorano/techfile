import { IPensionista } from 'app/shared/model//pensionista.model';

export interface IDiagnostico {
    id?: number;
    descripcion?: string;
    pensionistas?: IPensionista[];
}

export class Diagnostico implements IDiagnostico {
    constructor(public id?: number, public descripcion?: string, public pensionistas?: IPensionista[]) {}
}

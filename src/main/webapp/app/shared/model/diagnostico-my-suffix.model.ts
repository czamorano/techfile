import { IPensionistaMySuffix } from 'app/shared/model//pensionista-my-suffix.model';

export interface IDiagnosticoMySuffix {
    id?: number;
    descripcion?: string;
    pensionistas?: IPensionistaMySuffix[];
}

export class DiagnosticoMySuffix implements IDiagnosticoMySuffix {
    constructor(public id?: number, public descripcion?: string, public pensionistas?: IPensionistaMySuffix[]) {}
}

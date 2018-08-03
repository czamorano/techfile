import { IPensionistaMySuffix } from 'app/shared/model//pensionista-my-suffix.model';

export interface IDiscapacidadMySuffix {
    id?: number;
    descripcion?: string;
    pensionistas?: IPensionistaMySuffix[];
}

export class DiscapacidadMySuffix implements IDiscapacidadMySuffix {
    constructor(public id?: number, public descripcion?: string, public pensionistas?: IPensionistaMySuffix[]) {}
}

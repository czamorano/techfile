import { IPensionistaMySuffix } from 'app/shared/model//pensionista-my-suffix.model';

export interface IEtiologiaMySuffix {
    id?: number;
    descripcion?: string;
    pensionistas?: IPensionistaMySuffix[];
}

export class EtiologiaMySuffix implements IEtiologiaMySuffix {
    constructor(public id?: number, public descripcion?: string, public pensionistas?: IPensionistaMySuffix[]) {}
}

import { IPensionistaMySuffix } from 'app/shared/model//pensionista-my-suffix.model';

export interface IConvivienteMySuffix {
    id?: number;
    orden?: number;
    pensionista?: IPensionistaMySuffix;
}

export class ConvivienteMySuffix implements IConvivienteMySuffix {
    constructor(public id?: number, public orden?: number, public pensionista?: IPensionistaMySuffix) {}
}

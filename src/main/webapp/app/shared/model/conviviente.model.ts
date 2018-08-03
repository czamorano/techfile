import { IPensionista } from 'app/shared/model//pensionista.model';

export interface IConviviente {
    id?: number;
    orden?: number;
    pensionista?: IPensionista;
}

export class Conviviente implements IConviviente {
    constructor(public id?: number, public orden?: number, public pensionista?: IPensionista) {}
}

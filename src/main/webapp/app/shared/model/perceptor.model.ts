import { IPersona } from 'app/shared/model//persona.model';
import { IPensionista } from 'app/shared/model//pensionista.model';

export interface IPerceptor {
    id?: number;
    persona?: IPersona;
    pensionista?: IPensionista;
}

export class Perceptor implements IPerceptor {
    constructor(public id?: number, public persona?: IPersona, public pensionista?: IPensionista) {}
}

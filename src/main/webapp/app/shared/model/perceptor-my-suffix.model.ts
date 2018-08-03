import { IPersonaMySuffix } from 'app/shared/model//persona-my-suffix.model';
import { IPensionistaMySuffix } from 'app/shared/model//pensionista-my-suffix.model';

export interface IPerceptorMySuffix {
    id?: number;
    persona?: IPersonaMySuffix;
    pensionista?: IPensionistaMySuffix;
}

export class PerceptorMySuffix implements IPerceptorMySuffix {
    constructor(public id?: number, public persona?: IPersonaMySuffix, public pensionista?: IPensionistaMySuffix) {}
}

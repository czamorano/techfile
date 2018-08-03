export const enum Role {
    FIT_PLANIFICADOR = 'FIT_PLANIFICADOR',
    FIT_AUTONOMIA = 'FIT_AUTONOMIA',
    FIT_GESTOR = 'FIT_GESTOR'
}

export interface IUsuarioMySuffix {
    id?: number;
    nombre?: string;
    role?: Role;
}

export class UsuarioMySuffix implements IUsuarioMySuffix {
    constructor(public id?: number, public nombre?: string, public role?: Role) {}
}

export const enum Role {
    FIT_PLANIFICADOR = 'FIT_PLANIFICADOR',
    FIT_AUTONOMIA = 'FIT_AUTONOMIA',
    FIT_GESTOR = 'FIT_GESTOR'
}

export interface IUsuario {
    id?: number;
    nombre?: string;
    role?: Role;
}

export class Usuario implements IUsuario {
    constructor(public id?: number, public nombre?: string, public role?: Role) {}
}

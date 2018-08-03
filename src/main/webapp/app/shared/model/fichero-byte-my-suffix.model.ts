export interface IFicheroByteMySuffix {
    id?: number;
    fileBytesContentType?: string;
    fileBytes?: any;
}

export class FicheroByteMySuffix implements IFicheroByteMySuffix {
    constructor(public id?: number, public fileBytesContentType?: string, public fileBytes?: any) {}
}

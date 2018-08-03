export interface IFicheroByte {
    id?: number;
    fileBytesContentType?: string;
    fileBytes?: any;
}

export class FicheroByte implements IFicheroByte {
    constructor(public id?: number, public fileBytesContentType?: string, public fileBytes?: any) {}
}

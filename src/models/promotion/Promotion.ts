export class Promotion {
    constructor(
        private promoteId : number,
        private code : string,
        private discound : number,
        private descript : string,
        private isActive : boolean,
    ){}
}
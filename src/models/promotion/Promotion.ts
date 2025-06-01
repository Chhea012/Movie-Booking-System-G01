export class Promotion {
    constructor(
        private promoteId : number,
        private code : string,
        private discound : number,
        private descript : string,
        private isActive : boolean,
    ){
        this.discound = discound >= 0 && discound < 100 ? discound : 0
    }

    applyDiscount(amount : number) : number{
        if(amount <= 0 || !this.isActive) return amount;
        return amount - (amount * this.discound / 100);
    }
}   
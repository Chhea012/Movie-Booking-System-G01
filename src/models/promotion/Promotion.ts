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
    updateDiscount(code : string, discound : number, descript : string, isActive : boolean) : void{
        this.code = code;
        this.discound = discound >= 0 && discound <= 100 ? discound : 0;
        this.descript = descript;
        this.isActive = isActive
    }
    getisActive(): boolean {
        return this.isActive; 
    }

    validateCode(inputCode: string): boolean {
        return this.code === inputCode && this.isActive; 
    }
}   
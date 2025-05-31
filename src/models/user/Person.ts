export abstract class Person{
    constructor(
        private name: string,
        private email: string,
        private phone: string,
    ){}

    public getName(): string{
        return this.name
    }
    public getEmail():string{
        return this.email
    }
    public getPhone(): string{
        return this.phone
    }
}
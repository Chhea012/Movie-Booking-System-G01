export class Notifications {
    constructor(
        private idNotification: string,
        private message: string,
        private type: string,
        private sentAt: Date,
    ){}
}
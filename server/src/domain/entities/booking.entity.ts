export class Booking {
    constructor(
        public cabanaId: number,
        public room: number,
        public guestName: string,
        public bookedAt: string
    ) {}
}
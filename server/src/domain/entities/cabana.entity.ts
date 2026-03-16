export class Cabana {
    constructor(
        public row: number,
        public col: number,
        public type: string,
        public id: number,
        public isAvailable: boolean
    ) {}

    book() {
        if (this.type !== "W") {
            return false
        }

        if (this.isAvailable) {
            this.isAvailable = false;
            return true
        }

        return false
    }
}
import {Cabana} from "@domain/entities/cabana.entity.js";

describe("Cabana Entity", () => {
    it("should book cabana", () => {

        const cabana = new Cabana(1, 2, 'W', 3, true)
        expect(cabana.book()).toBe(true)
        expect(cabana.isAvailable).toBe(false)
    });

    it('should not allow object to be booked because it does not cabana type', () => {
        const fakeCabana = new Cabana(1, 2, 'c', 3, true)
        expect(fakeCabana.book()).toBe(false)
        expect(fakeCabana.isAvailable).toBe(true)
    });

    it('should not change the status if the cabana has already been booked', () => {
        const bookedCabana = new Cabana(0, 2, 'W', 4, false)
        expect(bookedCabana.book()).toBe(false)
        expect(bookedCabana.isAvailable).toBe(false)
    });
})
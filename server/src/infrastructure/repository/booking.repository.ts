import {IBooking} from "@domain/interfaces/booking.interface.js";

export class BookingRepository {
    private bookings: Map<number, IBooking> = new Map();

    public createBooking(booking: IBooking): void {
        this.bookings.set(booking.cabanaId, booking);
    }

    public getBookingByCabanaId(id: number): IBooking | undefined {
        return this.bookings.get(id);
    }

    public getAllBookings(): IBooking[] {
        return Array.from(this.bookings.values());
    }
}
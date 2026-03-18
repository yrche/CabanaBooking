import {IBooking} from "@domain/interfaces/booking.interface.js";

export interface IBookingRepository {
    createBooking(booking: IBooking): void
}
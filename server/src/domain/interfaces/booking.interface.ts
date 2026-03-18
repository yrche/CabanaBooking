import {IGuest} from "@domain/interfaces/guest.interface.js";

export interface IBooking extends IGuest{
    cabanaId: number
    bookedAt: string
}
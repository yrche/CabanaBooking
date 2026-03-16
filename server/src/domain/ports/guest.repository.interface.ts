import {IGuest} from "@domain/interfaces/guest.interface.js";

export interface IGuestRepository {
    findGuest(guest: IGuest): IGuest | undefined
}
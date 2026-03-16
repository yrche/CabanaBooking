import {IGuest} from "@domain/interfaces/guest.interface.js";

export class GuestRepository {
    private readonly guests: Map<number, IGuest> = new Map<number, IGuest>()

    constructor(guestList: IGuest[]) {
        this.guests = GuestRepository.normalize(guestList)
    }

    private static normalize(guestList: IGuest[]): Map<number, IGuest> {
        const guests: Map<number, IGuest> = new Map<number, IGuest>()

        guestList.forEach((guest) => {
            guests.set(guest.room, guest)
        })

        return guests
    }

    public findGuest(guest: IGuest): IGuest | undefined {
        const _guest = this.guests.get(guest.room)
        if (!_guest) {
            return undefined
        }

        if (_guest.guestName !== guest.guestName) {
            return undefined
        }

        return _guest;
    }
}
import {IGuest} from "@domain/interfaces/guest.interface.js";
import {IResortRepository} from "@domain/ports/resort.repository.interface.js";
import {Cabana} from "@domain/entities/cabana.entity.js";
import ApiError from "@gateways/exeptions/api.error.js";
import {IGuestRepository} from "@domain/ports/guest.repository.interface.js";
import {IBookingRepository} from "@domain/ports/booking.repository.interface.js";
import {Booking} from "@domain/entities/booking.entity.js";
import {ICabana} from "@domain/interfaces/cabana.interface.js";

interface BookCabanaUseCasePayload {
    room: number;
    guestName: string;
    id: number
}

export class BookCabanaUseCase {
    constructor(
        private readonly resortRepository: IResortRepository,
        private readonly guestRepository: IGuestRepository,
        private readonly bookingRepository: IBookingRepository,
    ) {}

    execute(payload: BookCabanaUseCasePayload) {
        const _guest: IGuest = {
            room: payload.room,
            guestName: payload.guestName
        };

        const guest = this.guestRepository.findGuest(_guest);
        const cell = this.resortRepository.findById(payload.id);

        if (!guest) throw ApiError.BadRequest("Guest info Invalid", ["Room or Name mismatch"]);
        if (!cell) throw ApiError.BadRequest("Wrong Cabana ID");
        if (!cell.isAvailable) {
            throw ApiError.Conflict("Cabana is unavailable");
        }

        const updatedCabana = new Cabana(
            cell.row,
            cell.col,
            cell.type,
            cell.id,
            cell.isAvailable
        );
        updatedCabana.book()

        const cabana = this.resortRepository.updateCabana(updatedCabana)

        const booking = new Booking(
            cell.id,
            guest.room,
            guest.guestName,
            new Date().toDateString()
        )
        this.bookingRepository.createBooking(booking)

        return {
            booking,
            cabana: (cabana as ICabana)
        }
    }
}
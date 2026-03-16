import {BookCabanaUseCase} from "@domain/usecases/cabana/bookCabana.usecase.js";
import {ICabana} from "@domain/interfaces/cabana.interface.js";
import { jest } from '@jest/globals';
import ApiError from "@gateways/exeptions/api.error.js";
import {IBooking} from "@domain/interfaces/booking.interface.js";
import {Booking} from "@domain/entities/booking.entity.js";
import {IGuest} from "@domain/interfaces/guest.interface.js";

describe('Book Cabana UseCase', () => {
    let useCase: BookCabanaUseCase;
    let mockResortRepository: any;
    let mockGuestRepository: any;
    let mockBookingRepository: any;
    let cabanaMock: ICabana = {
        row: 1,
        col: 2,
        type: "W",
        id: 1,
        isAvailable: true
    }
    let bookingMock: IBooking = {
        cabanaId: 1,
        room: 101,
        guestName: 'John',
        bookedAt: new Date().toDateString()
    }
    let guestMock: IGuest = {
        room: 101,
        guestName: 'John'
    }

    beforeEach(() => {
        mockResortRepository = {
            findById: jest.fn(),
            updateCabana: jest.fn()
        };
        mockGuestRepository = {
            findGuest: jest.fn(),
        };
        mockBookingRepository = {
            createBooking: jest.fn()
        }
        useCase = new BookCabanaUseCase(mockResortRepository, mockGuestRepository, mockBookingRepository);
    });

    it('should allow book cabana and update cabana status in repository', () => {
        mockGuestRepository.findGuest.mockReturnValue(guestMock);
        mockResortRepository.findById.mockReturnValue({ ...cabanaMock });

        const expectedCabana = { ...cabanaMock, isAvailable: false }
        mockResortRepository.updateCabana.mockReturnValue(expectedCabana);

        const payload = { room: 101, guestName: "John", id: 1 };

        const expectedResult = new Booking(bookingMock.cabanaId, bookingMock.room, bookingMock.guestName, bookingMock.bookedAt)

        const result = useCase.execute(payload);

        expect(result).toEqual({booking: expectedResult, cabana: expectedCabana});
        expect(result.booking.cabanaId).toBe(payload.id);
        expect(result.cabana.id).toBe(payload.id)

        expect(mockResortRepository.updateCabana).toHaveBeenCalled();
        expect(mockBookingRepository.createBooking).toHaveBeenCalled();
    });

    it('should throw ApiError because guest is not found', () => {
        mockGuestRepository.findGuest.mockReturnValue(undefined);

        const payload = { room: 101, guestName: "John", id: 1 };

        expect(() => useCase.execute(payload)).toThrow(ApiError)
        expect(mockResortRepository.updateCabana).not.toHaveBeenCalled();
        expect(mockBookingRepository.createBooking).not.toHaveBeenCalled();
    });

    it('should throw ApiError because wrong cabana ID', () => {
        mockGuestRepository.findGuest.mockReturnValue(guestMock);
        mockResortRepository.findById.mockReturnValue(undefined);

        const payload = { room: 101, guestName: "John", id: 34 };

        expect(() => useCase.execute(payload)).toThrow(ApiError);
        expect(mockResortRepository.updateCabana).not.toHaveBeenCalled();
        expect(mockBookingRepository.createBooking).not.toHaveBeenCalled();
    });

    it('should throw ApiError because cabana is unavailable', () => {
        mockGuestRepository.findGuest.mockReturnValue(guestMock);
        mockResortRepository.findById.mockReturnValue({ ...cabanaMock, isAvailable: false});

        const payload = { room: 101, guestName: "John", id: 1 };

        expect(() => useCase.execute(payload)).toThrow(ApiError)
        expect(mockResortRepository.updateCabana).not.toHaveBeenCalled();
        expect(mockBookingRepository.createBooking).not.toHaveBeenCalled();
    });
})
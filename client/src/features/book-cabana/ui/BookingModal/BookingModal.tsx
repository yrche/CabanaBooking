import { useState } from "react";
import { SpotDetails } from "../SpotDetails/SpotDetails";
import { BookingForm } from "../BookingForm/BookingForm";
import s from '@/features/book-cabana/ui/BookingModal/BookingModal.module.css';
import { bookCabanaService } from "@/features/book-cabana/api/cabanaApi.ts";
import React = require("react");
import {ICabana} from "@/entities/cabana/model/interfaces/cabana.interface.ts";

interface BookingModalProps {
    cabana: ICabana;
    onClose: () => void;
    onSuccess: (updatedCabana: any) => void;
}

export const BookingModal = ({ cabana, onClose, onSuccess }: BookingModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleBookingSubmit = async (formData: { room: number; guestName: string }) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await bookCabanaService({
                room: formData.room,
                guestName: formData.guestName,
                id: cabana.id
            });

            const updatedData = response.cabana || response.booking;

            if (updatedData) {
                setIsSuccess(true);
                onSuccess(updatedData);

                setTimeout(() => {
                    onClose();
                }, 2000);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Booking failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={s.backdrop} onClick={onClose}>
            <div className={s.content} onClick={(e) => e.stopPropagation()}>
                <div className={s.header}>
                    <div>
                        <h2 className={s.spotTitle}>
                            {isSuccess ? 'Success!' : 'Spot Details'}
                        </h2>
                        <span className={s.cabanaName}>Cabana #{cabana.id}</span>
                    </div>
                    <button className={s.closeButtonHeader} onClick={onClose}>
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                </div>

                {isSuccess ? (
                    <div className={s.successMessage}>
                        <div className={s.successIcon}>
                            <svg viewBox="0 0 24 24" width="48" height="48">
                                <path fill="#4CAF50" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                        </div>
                        <p>Booking confirmed successfully!</p>
                        <p className={s.subText}>Closing window...</p>
                    </div>
                ) : (
                    <>
                        <SpotDetails id={cabana.id} isAvailable={cabana.isAvailable} />
                        <hr className={s.divider} />
                        <BookingForm
                            onSubmit={handleBookingSubmit}
                            isLoading={isLoading}
                            error={error}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
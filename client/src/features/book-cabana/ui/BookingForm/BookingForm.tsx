import { useState } from "react";
import s from '@/features/book-cabana/ui/BookingForm/BookingForm.module.css';
import React = require("react");

interface BookingFormProps {
    onSubmit: (data: { room: number; guestName: string }) => void;
    isLoading: boolean;
    error: string | null;
}

export const BookingForm = ({ onSubmit, isLoading, error }: BookingFormProps) => {
    const [roomNumber, setRoomNumber] = useState(null);
    const [guestName, setGuestName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (roomNumber && guestName.trim()) {
            onSubmit({ room: Number(roomNumber), guestName });
        }
    };

    return (
        <div className={s.bookingSection}>
            <h3 className={s.bookingTitle}>Book This Cabana</h3>
            <form className={s.form} onSubmit={handleSubmit}>
                <div className={s.inputGroup}>
                    <label htmlFor="roomNumber">Room Number</label>
                    <input
                        type="text"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        required
                        placeholder="e.g., 101"
                    />
                </div>
                <div className={s.inputGroup}>
                    <label htmlFor="guestName">Guest Name</label>
                    <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        required
                        placeholder="e.g., John Smith"
                    />
                </div>
                {error && <div className={s.errorText}>{error}</div>}
                <button type="submit" className={s.submitButton} disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Confirm Booking'}
                </button>
            </form>
        </div>
    );
};
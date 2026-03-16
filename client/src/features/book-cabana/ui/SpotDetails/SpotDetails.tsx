import React = require('react');
import s from '@/features/book-cabana/ui/SpotDetails/SpotDetails.module.css';

interface SpotDetailsProps {
    id: string | number;
    isAvailable: boolean;
}

export const SpotDetails = ({ id, isAvailable }: SpotDetailsProps) => (
    <>
        <div className={s.detailsSection}>
            <div className={s.fieldLabel}>Status</div>
            <button className={`${s.statusButton} ${isAvailable ? s.statusAvailable : s.statusOccupied}`}>
                <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>{isAvailable ? 'Available' : 'Occupied'}</span>
            </button>
        </div>

        <div className={s.detailsSection}>
            <div className={s.fieldLabel}>Spot ID</div>
            <div className={s.spotIdText}>cabana-{id}</div>
        </div>
    </>
);
import {memo} from "react";
import {Icon} from "@/shared/ui/Icon/Icon.tsx";
import cabana from "@/shared/assets/cabana.png";
import React = require("react");
import {ICabana} from "@/entities/cabana/model/interfaces/cabana.interface.ts";
import s from "@/entities/cabana/ui/Cabana.module.css";
import {toast} from "sonner";

const TEAL_FILTER = 'invert(31%) sepia(85%) saturate(543%) hue-rotate(127deg) brightness(95%) contrast(101%)';
const GRAY_FILTER = 'brightness(0) saturate(100%) invert(51%) sepia(1%) saturate(1891%) hue-rotate(349deg) brightness(87%) contrast(82%)';

export const Cabana = memo((props: {
    data: ICabana,
    onClick: (data: ICabana) => void,
    isSelected?: boolean,
    size: number
}) => {
    const { data, onClick, isSelected, size } = props;

    const isAvailable = data.isAvailable;
    const currentFilter = isAvailable ? TEAL_FILTER : GRAY_FILTER;

    const handleInternalClick = () => {
        if (!isAvailable) {
            toast.warning(`Cabana #${data.id} is already occupied`, {
                description: 'Please select another available spot on the map.',
                duration: 2000,
            });
            return;
        }
        onClick?.(data);
    };

    return (
        <div className={`
                ${s.cabana} 
                ${isSelected ? s.selected : ''} 
                ${!isAvailable ? s.disabled : ''}
            `}
            onClick={handleInternalClick}>
            <Icon
                path={cabana}
                size={size}
                rotate={0}
                filter={currentFilter}
            />
        </div>
    );
});
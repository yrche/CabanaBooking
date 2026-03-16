import { PATH_TILES } from '@/entities/map/model/constants.ts';
import s from './MapCell.module.css';
import React = require('react');
import {Icon} from "@/shared/ui/Icon/Icon.tsx"
import houseChimney from "@/shared/assets/houseChimney.png";
import textureWater from "@/shared/assets/textureWater.png";
import {ICabana, ICell} from "@/entities/cabana/model/interfaces/cabana.interface.ts";
import {memo} from "react";
import {Cabana} from "@/entities/cabana/ui/Cabana.tsx";

export interface IMapCell extends ICell{
    mask: number
}

export interface IMapCabana extends ICabana {
    mask: number
}

export const MapCell = memo(( props: { data: (IMapCell | IMapCabana), onCabanaClick: (data: ICabana) => void, isSelected: boolean, size: number }) => {
    const { data, onCabanaClick, isSelected, size } = props;

    const renderContent = () => {
        if (data.type === '#') {
            const iconData = PATH_TILES[data.mask];
            return <Icon path={iconData.img} size={size} rotate={iconData.rotate} />;
        }

        if (data.type === 'W') {
            return (
                <Cabana
                    size={size}
                    data={props.data as ICabana}
                    onClick={() => onCabanaClick(props.data as ICabana)}
                    isSelected={isSelected}
                />
            );
        }

        if (data.type === "c") {
            return <Icon path={houseChimney} size={size} rotate={0} />;
        }

        if (data.type === "p") {
            return <Icon path={textureWater} size={size} rotate={0} />;
        }

        return null;
    };

    return (
        <div className={s.cell}>
            {renderContent()}
        </div>
    );
});
import prepareCells from '@/features/get-map/model/prepareCells.ts';
import { MapCell } from '@/entities/map/ui/MapCell/MapCell.tsx';
import style from '@/features/get-map/ui/MapGrid/MapGrid.module.css';
import React = require('react');
import {ICabana} from "@/entities/cabana/model/interfaces/cabana.interface.ts";

export const MapGrid = ({ mapData, onCabanaClick, selectedId }) => {
    const { preparedCells } = prepareCells(mapData);
    const maxCol = Math.max(...preparedCells.map(c => c.col)) + 1;
    const maxRow = Math.max(...preparedCells.map(c => c.row)) + 1;

    return (
        <div
            className={style.wrapper}
            style={{
                '--grid-cols': maxCol,
                '--grid-rows': maxRow
            } as React.CSSProperties}
        >
            {preparedCells.map((cell) => (
                <MapCell
                    size={40}
                    key={`${cell.row}-${cell.col}`}
                    data={cell}
                    onCabanaClick={onCabanaClick}
                    isSelected={(cell as ICabana).id === selectedId}
                />
            ))}
        </div>
    );
};
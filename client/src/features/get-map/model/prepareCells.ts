import {useMemo} from "react";
import {ICabana, ICell} from "@/entities/cabana/model/interfaces/cabana.interface.ts";
import {cellMap} from "@/features/get-map/model/utils/cellMap.ts";
import {maskCalculation} from "@/features/get-map/model/utils/maskCalculation.ts";

export default function prepareCells(mapCells: (ICabana | ICell)[]) {

    const cellLookup = useMemo(() => {
        return cellMap(mapCells)
    }, [mapCells])

    const preparedCells = useMemo(() => {
        return mapCells.map(cell => ({
            ...cell,
            mask: cell.type === "#" ? maskCalculation(cellLookup, cell) : 0
        }))
    }, [mapCells, cellLookup])

    return { preparedCells };
}
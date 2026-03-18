import {ICabana, ICell} from "@/entities/cabana/model/interfaces/cabana.interface.ts";

export function maskCalculation(map: Map<string, (ICabana | ICell)>, cell: ICell): number {
    let mask = 0;

    const neighborTop = (map.get(`${cell.row - 1}-${cell.col}`) as ICell).type
    const neighborRight = (map.get(`${cell.row}-${cell.col + 1}`) as ICell).type
    const neighborBottom = (map.get(`${cell.row + 1}-${cell.col}`) as ICell).type
    const neighborLeft = (map.get(`${cell.row}-${cell.col - 1}`) as ICell).type

    if (neighborTop === '#') mask += 1;
    if (neighborRight === '#') mask += 2;
    if (neighborBottom === '#') mask += 4;
    if (neighborLeft === '#') mask += 8;

    return mask
}
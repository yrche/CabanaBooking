import {ICabana, ICell} from "@/entities/cabana/model/interfaces/cabana.interface.ts";

export function cellMap(data: (ICabana | ICell)[]): Map<string, ICabana | ICell> {
    const map = new Map()

    for (const element of data) {
        map.set(`${element.row}-${element.col}`, element)
    }

    return map;
}

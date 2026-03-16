import {ICabana, ICell} from "@domain/interfaces/cabana.interface.js";

export interface IMap {
    dimensions: {
        rows: number,
        cols: number
    },
    cells: (ICabana | ICell)[]
}
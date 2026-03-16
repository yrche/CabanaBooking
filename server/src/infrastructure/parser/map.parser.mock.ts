import {IMap} from "@domain/interfaces/map.interface.js";

export const mapParserMock = [
    'cW',
    '..'
]

export const mapMock: IMap = {
    dimensions: {
        rows: 2,
        cols: 2
    },
    cells: [
        {row: 0, col: 0, type: "c"},
        {row: 0, col: 1, type: "W", id: 0, isAvailable: true},
        {row: 1, col: 0, type: "."},
        {row: 1, col: 1, type: "."},
    ]
}

export const fakeMapParserMock = [
    ''
]

export const fakeMapMock: IMap = {
    dimensions: {
        rows: 1,
        cols: 0
    },
    cells: []
}
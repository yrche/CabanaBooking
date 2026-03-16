export interface ICell {
    row: number,
    col: number,
    type: string,
}

export interface ICabana extends ICell{
    id: number,
    isAvailable: boolean
}
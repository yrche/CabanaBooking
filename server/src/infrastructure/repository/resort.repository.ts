import {ICabana} from "@domain/interfaces/cabana.interface.js";
import {IGuest} from "@domain/interfaces/guest.interface.js";
import {IMap} from "@domain/interfaces/map.interface.js";

export class ResortRepository {
    private readonly map: IMap;

    constructor(map: IMap) {
        this.map = map;
    }

    public getMap(): IMap {
        return this.map
    }

    public findById(id: number): ICabana | undefined {
        const cell = this.map.cells.find((cell) => (cell as ICabana).id === id) as ICabana;
        if (! cell) return undefined

        return cell
    }

    public updateCabana(payload: ICabana): ICabana | undefined{
        const cabana = this.findById(payload.id)
        if (!cabana) {
            return undefined;
        }

        Object.assign(cabana, payload)
        return cabana
    }
}
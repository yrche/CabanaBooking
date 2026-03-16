import {ICabana} from "@domain/interfaces/cabana.interface.js";
import {IGuest} from "@domain/interfaces/guest.interface.js";
import {IMap} from "@domain/interfaces/map.interface.js";

export interface IResortRepository {
    getMap(): IMap;
    findById(id: number): ICabana | undefined;
    updateCabana(payload: ICabana): ICabana | undefined;
}
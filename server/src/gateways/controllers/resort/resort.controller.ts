import {BookCabanaUseCase} from "@domain/usecases/cabana/bookCabana.usecase.js";
import {NextFunction, Request, Response} from "express";
import {BookCabanaDto} from "@gateways/controllers/dtos/bookCabana.dto.js";
import {GetMapUseCase} from "@domain/usecases/cabana/getMap.usecase.js";

export class ResortController {
    constructor(
        private readonly bookCabanaUseCase: BookCabanaUseCase,
        private readonly getMapUseCase: GetMapUseCase,
    ) {}

    public book =
        async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { room, guestName } = req.body
            const { id } = req.params;
            const cabanaDto = new BookCabanaDto(room, guestName, Number(id))
            const cabana = this.bookCabanaUseCase.execute(cabanaDto)

            const ws = req.app.get('ws')
            ws.emit('CABANA_BOOKED', cabana)

            return res.status(200).send(cabana)
        } catch (err) {
            next(err);
        }
    }

    public getMap =
        async (req: Request, res: Response, next:NextFunction) => {
        try {
            return res.send(this.getMapUseCase.execute())
        } catch (err) {
            next(err)
        }
    }
}
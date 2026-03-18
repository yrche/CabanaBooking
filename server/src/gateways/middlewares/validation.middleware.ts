import { Request, Response, NextFunction} from "express";
import ApiError from "@gateways/exeptions/api.error.js";

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        const { room, guestName } = req.body;

        if (!room || !guestName || !req.params.id) {
            return next(ApiError.BadRequest("Invalid parameters", []))
        }

        next()
    } catch (err) {
        next(err);
    }
}
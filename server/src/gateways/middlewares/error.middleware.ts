import {NextFunction, Request, Response} from "express";
import ApiError from "../exeptions/api.error.js";

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: "Unpredictable error"})
}
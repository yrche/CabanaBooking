import { Router } from "express";
import { ResortController } from "@gateways/controllers/resort/resort.controller.js";
import validationMiddleware from "@gateways/middlewares/validation.middleware.js";

export class ResortRouter {
    public readonly router = Router();

    constructor(private readonly controller: ResortController) {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/map', this.controller.getMap);
        this.router.post('/book/:id', validationMiddleware, this.controller.book);
    }
}
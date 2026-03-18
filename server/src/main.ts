import express from "express";
import { pinoHttp } from "pino-http";
import { logger } from "@config/config.logger.js";
import { BaseLogger } from "@/infrastructure/logger/base.logger.js";
import { parser } from "@infrastructure/parser/parsers.bootstrap.js";
import env from "@config/config.env.js";
import {ResortRepository} from "@infrastructure/repository/resort.repository.js";
import {ResortController} from "@gateways/controllers/resort/resort.controller.js";
import {BookCabanaUseCase} from "@domain/usecases/cabana/bookCabana.usecase.js";
import {ResortRouter} from "@gateways/routers/resort.router.js";
import errorMiddleware from "@gateways/middlewares/error.middleware.js";
import {GetMapUseCase} from "@domain/usecases/cabana/getMap.usecase.js";
import {GuestRepository} from "@infrastructure/repository/guest.repository.js";
import {BookingRepository} from "@infrastructure/repository/booking.repository.js";
import * as http from "node:http";
import {Server} from "socket.io";

const app = express();

async function main() {
    try {
        const serverLogger = new BaseLogger(logger)
        const { map, booking } = await parser(serverLogger)
        const resortRepository = new ResortRepository(map)
        const guestRepository = new GuestRepository(booking)
        const bookingRepository = new BookingRepository()
        const bookCabanaUseCase = new BookCabanaUseCase(resortRepository, guestRepository, bookingRepository);
        const getMapUseCase = new GetMapUseCase(resortRepository)
        const resortController = new ResortController(bookCabanaUseCase, getMapUseCase);
        const resortRouter = new ResortRouter(resortController);
        const wsServer = http.createServer(app);
        const ws = new Server(wsServer, {
            cors: { origin: env.WS_HOSTNAME }
        })
        app.use(pinoHttp({ logger }))
        app.use(express.json())
        app.set('ws', ws)
        app.use('/api', resortRouter.router)
        app.use(errorMiddleware);
        wsServer.listen(env.PORT, () => {
            serverLogger.info(`WS Server listen on port: ${env.WS_PORT}`)
        })
        app.listen(env.PORT, () => {
            serverLogger.info(`Server listen on port: ${env.PORT}`)
        })
    } catch (error) {
        logger.error({ err: error }, 'Failed to start server');
        process.exit(1);
    }
}

main();


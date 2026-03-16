import {ILogger} from "@/infrastructure/logger/interfaces.js";

export class BaseLogger {
    private readonly logger: ILogger;

    constructor(logger: ILogger) {
        this.logger = logger;
    }

    info(msg: string, ...meta: any[]) {
        this.logger.info(msg, ...meta)
    }

    error(msg: any, ...meta: any[]) {
        this.logger.error(msg, ...meta)
    }
}
import { readFile } from 'fs/promises';
import { BaseLogger } from "@/infrastructure/logger/base.logger.js";
import { IGuest } from "@domain/interfaces/guest.interface.js";

export class BookingParser {
    constructor(private readonly logger: BaseLogger) {}

    async parse(path: string) {
        try {
            const content = await readFile(path, 'utf-8');

            const result: IGuest[] = JSON.parse(content, (key, value) => key === "room" ? Number(value) : value)
            this.logger.info(`Parsed ${result.length} bookings`)

            return result
        } catch (err) {
            this.logger.error("Parsing failed", err)
            throw new Error("Parsing failed")
        }
    }
}
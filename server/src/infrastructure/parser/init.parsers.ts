import {BookingParser} from "@infrastructure/parser/booking.parser.js";
import {MapParser} from "@infrastructure/parser/map.parser.js";
import MapConvert from "@infrastructure/parser/map.convert.js";
import { BaseLogger } from "@infrastructure/logger/base.logger.js";
import { parseArgs } from "node:util";
import path from "node:path";
import * as fs from "node:fs";

export async function parser(logger: BaseLogger) {
    const { values } = parseArgs({
        options: {
            map: { type: 'string', default: 'map.ascii' },
            bookings: { type: 'string', default: 'bookings.json' }
        },
        strict: false
    });

    const workspaceRoot = process.env.INIT_CWD || process.cwd();

    const resolvePath = async (fileName: string) => {
        if (path.isAbsolute(fileName)) return fileName;
        const localPath = path.resolve(process.cwd(), fileName);
        const rootPath = path.resolve(workspaceRoot, fileName);

        try {
            await fs.access(localPath);
            return localPath;
        } catch {
            return rootPath;
        }
    };

    const mapPath = await resolvePath(values.map as string);
    const bookingsPath = await resolvePath(values.bookings as string);

    logger.info(`CWD: ${process.cwd()}`);
    logger.info(`Resolved map path: ${mapPath}`);

    const convert = await new MapConvert().convert(mapPath);
    const bookingParser = new BookingParser(logger);
    const mapParser = new MapParser(logger);

    const booking = await bookingParser.parse(bookingsPath);
    const map = mapParser.parse(convert);

    return { booking, map };
}

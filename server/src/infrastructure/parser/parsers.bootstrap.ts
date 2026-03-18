import {BookingParser} from "@infrastructure/parser/booking.parser.js";
import {MapParser} from "@infrastructure/parser/map.parser.js";
import MapConvert from "@infrastructure/parser/utils/map.convert.js";
import { BaseLogger } from "@infrastructure/logger/base.logger.js";
import { argsParse } from "@infrastructure/parser/utils/args.parse.js";

export async function parser(logger: BaseLogger) {
    try {
        const { args } = argsParse();

        const convert = await new MapConvert(logger).convert(args.map);
        const bookingParser = new BookingParser(logger);
        const mapParser = new MapParser(logger);

        const booking = await bookingParser.parse(args.bookings);
        const map = mapParser.parse(convert);

        return { booking, map };
    } catch (error) {
        logger.error("Parsing error", error)
        throw Error(error);
    }
}

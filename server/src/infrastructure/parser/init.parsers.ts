import {BaseLogger} from "@infrastructure/logger/base.logger.js";
import {parseArgs} from "node:util";
import {BookingParser} from "@infrastructure/parser/booking.parser.js";
import {MapParser} from "@infrastructure/parser/map.parser.js";
import MapConvert from "@infrastructure/parser/map.convert.js";
import {logger} from "@config/config.logger.js";

export async function parser(logger: BaseLogger) {
    const {values} = parseArgs({
        options: {
            map: {
                type: 'string',
                default: 'map.ascii'
            },
            bookings: {
                type: 'string',
                default: 'bookings.json'
            }
        },
        strict: false
    })

    const convert = await new MapConvert().convert(values.map as string)
    const bookingParser = new BookingParser(logger)
    const mapParser = new MapParser(logger)

    const booking = await bookingParser.parse(values.bookings as string)
    const map = mapParser.parse(convert)

    return {
        booking,
        map
    }
}
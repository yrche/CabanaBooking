import { parseArgs } from "node:util";
import { resolve } from "node:path";

export function argsParse() {
    const { values } = parseArgs({
        options: {
            map: { type: 'string', default: 'map.ascii' },
            bookings: { type: 'string', default: 'bookings.json' }
        },
        strict: true
    })

    return {
        args: {
            map: resolve(process.env.INIT_CWD, values.map),
            bookings: resolve(process.env.INIT_CWD, values.bookings)
        }
    }
}



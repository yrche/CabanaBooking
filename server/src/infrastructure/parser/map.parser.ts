import { BaseLogger } from "@/infrastructure/logger/base.logger.js";
import {ICabana, ICell} from "@domain/interfaces/cabana.interface.js";

export class MapParser {
    constructor(private readonly logger: BaseLogger) {};

    parse( lines: string[] ) {
        try {
            const result: (ICabana | ICell)[] = [];
            let idIndex = 0;
            let rows: number = lines.length;
            let cols = lines.length > 0 ? lines[0].length : 0;

            for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
                const characters = lines[rowIndex].split('')

                for (let colIndex = 0; colIndex < characters.length; colIndex++) {

                    if ([' '].includes(characters[colIndex])) {
                        characters[colIndex] = '.';
                    }

                    if (characters[colIndex] === 'W') {
                        const cell: ICabana = {
                            row: rowIndex,
                            col: colIndex,
                            type: characters[colIndex],
                            id: idIndex++,
                            isAvailable: true,
                        }
                        result.push(cell)
                    } else {
                        const cell: ICell = {
                            row: rowIndex,
                            col: colIndex,
                            type: characters[colIndex]
                        }
                        result.push(cell)
                    }
                }
            }

            this.logger.info(`Parsed ${result.length} cells`);
            return {
                dimensions: {
                    rows,
                    cols
                },
                cells: result
            };
        } catch (err) {
            this.logger.error({
                meta: {
                    error: err.message,
                }
            }, 'Parsing map failed');

            throw err;
        }
    }
}
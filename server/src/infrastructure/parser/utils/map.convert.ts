import { readFile, access } from "fs/promises";
import { BaseLogger } from "@infrastructure/logger/base.logger.js";

export default class MapConvert {
    constructor(private readonly logger: BaseLogger) {}

    async convert( path: string ): Promise<string[]> {
        try {
            await access(path);

            const content = await readFile(path, 'ascii');
            const lines = content.trim().split(/\r?\n/);
            
            return lines
        } catch (error) {
            this.logger.error(`Failed to read file: ${path}`, error);
            throw Error(`Failed to read file: ${path}`, error)
        }
    }
}

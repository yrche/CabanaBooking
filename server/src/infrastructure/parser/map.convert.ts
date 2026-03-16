import {readFile} from "fs/promises";

export default class MapConvert {
    async convert( path: string ): Promise<string[]> {
        const content = await readFile(path, 'ascii');
        const lines = content.trim().split(/\r?\n/)

        return lines;
    }
}
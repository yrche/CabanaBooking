import {MapParser} from "@infrastructure/parser/map.parser.js";
import {ICabana, ICell} from "@domain/interfaces/cabana.interface.js";
import { jest } from "@jest/globals";
import {fakeMapMock, fakeMapParserMock, mapMock, mapParserMock} from "@infrastructure/parser/map.parser.mock.js";
import {IMap} from "@domain/interfaces/map.interface.js";

describe("Map Parser", () => {
    let parser: MapParser;
    let mockLogger: any;

    beforeEach(() => {
        mockLogger = {
            info: jest.fn(),
            error: jest.fn(),
        }
        parser = new MapParser(mockLogger)
    })

    it('should return parsed map', async () => {
        const result = parser.parse(mapParserMock)
        expect(result).toEqual(mapMock)
    });

    it('should paste space to .', () => {
        const result = parser.parse(fakeMapParserMock)
        expect(result).toEqual(fakeMapMock)
    });
})
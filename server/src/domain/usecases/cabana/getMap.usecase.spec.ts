import {ICabana, ICell} from "@domain/interfaces/cabana.interface.js";
import {jest} from "@jest/globals";
import {GetMapUseCase} from "@domain/usecases/cabana/getMap.usecase.js";

describe("Get Map UseCase", () => {
    let useCase: GetMapUseCase;
    let mockRepository: any;

    beforeEach(() => {
        mockRepository = {
            getMap: jest.fn()
        };
        useCase = new GetMapUseCase(mockRepository);
    })

    it('should return resort map', () => {
        const map: (ICabana | ICell)[] = [
            {row: 0, col: 0, type: "c"},
            {row: 0, col: 1, type: "W", id: 0, isAvailable: true},
        ]

        mockRepository.getMap.mockReturnValue(map)
        const result = useCase.execute();
        expect(result).toEqual(map)
    });
})
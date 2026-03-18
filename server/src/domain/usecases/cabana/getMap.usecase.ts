import {IResortRepository} from "@domain/ports/resort.repository.interface.js";

export class GetMapUseCase {
    constructor(private readonly resortRepository: IResortRepository) {}

    execute() {
        return this.resortRepository.getMap()
    }
}
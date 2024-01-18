import { TableSetDto } from "../dto/table-set.dto";
import { Set } from "../entities/set.entity";

export class SetConverter {
    static SetToTableSetDto(set: Set): TableSetDto {        
        const dto = new TableSetDto();
        dto.name = set.name;
        dto.code = set.code;
        dto.description = set.description;
        dto.releaseDate = set.releaseDate;
        dto.active = set.active;
        return dto;
    }
}
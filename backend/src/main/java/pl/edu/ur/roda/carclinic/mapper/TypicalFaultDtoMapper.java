package pl.edu.ur.roda.carclinic.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.edu.ur.roda.carclinic.dto.TypicalFaultDto;
import pl.edu.ur.roda.carclinic.entity.TypicalFaults;
import pl.edu.ur.roda.carclinic.entity.User;

@Mapper(componentModel = "spring")
public interface TypicalFaultDtoMapper {
    @Mapping(target = "possiblity", ignore = true)
    TypicalFaultDto typicalFaultsToTypicalFaultDto(TypicalFaults typicalFaults);
}

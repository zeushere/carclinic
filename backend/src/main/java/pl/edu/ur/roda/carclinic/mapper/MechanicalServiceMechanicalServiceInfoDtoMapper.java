package pl.edu.ur.roda.carclinic.mapper;

import org.mapstruct.Mapper;
import pl.edu.ur.roda.carclinic.dto.MechanicalServiceInfoDto;
import pl.edu.ur.roda.carclinic.entity.MechanicalService;

@Mapper(componentModel = "spring")
public interface MechanicalServiceMechanicalServiceInfoDtoMapper {
    MechanicalServiceInfoDto toMechanicalService(MechanicalService mechanicalService);
}

package pl.edu.ur.roda.carclinic.mapper;

import org.mapstruct.Mapper;
import pl.edu.ur.roda.carclinic.dto.WorkingPeriodInfoDto;
import pl.edu.ur.roda.carclinic.entity.WorkingPeriod;

@Mapper(componentModel = "spring")
public interface WorkingPeriodInfoDtoWorkingPeriodMapper {
    WorkingPeriodInfoDto workingPeriodToWorkingPeriodInfoDto(WorkingPeriod workingPeriod);
}

package pl.edu.ur.roda.carclinic.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.edu.ur.roda.carclinic.dto.CarInfoDto;
import pl.edu.ur.roda.carclinic.entity.Car;

@Mapper(componentModel = "spring")
public interface CarInfoDtoCarMapper {

    CarInfoDto carToCarInfoDto(Car car);
}

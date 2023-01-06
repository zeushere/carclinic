package pl.edu.ur.roda.carclinic.dto;

import pl.edu.ur.roda.carclinic.entity.Car;
import pl.edu.ur.roda.carclinic.entity.User;

public record CarAddDto(

        String brand,
        String model,
        String yearProduction,
        String engineType,
        String carType,
        String description,
        String imagePath,
        String ownerId
) {
    public static CarAddDto of(CarRequest carRequest, String imagePath, String ownerId) {
        return new CarAddDto(
                carRequest.brand(),
                carRequest.model(),
                carRequest.yearProduction(),
                carRequest.engineType(),
                carRequest.carType(),
                carRequest.description(),
                imagePath,
                ownerId
        );
    }

    public static Car prepareCar(CarAddDto carAddDto, User owner) {
        return new Car(
                carAddDto.brand(),
                carAddDto.model(),
                carAddDto.yearProduction(),
                carAddDto.engineType(),
                carAddDto.carType(),
                carAddDto.description(),
                carAddDto.imagePath(),
                owner
        );
    }
}

package pl.edu.ur.roda.carclinic.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public record CarRequest(

        @Size(max = 255, message = "car.brand.tooManyCharacters")
        @NotBlank(message = "car.brand.isBlank")
        String brand,

        @Size(max = 255, message = "car.model.tooManyCharacters")
        @NotBlank(message = "car.model.isBlank")
        String model,

        @Size(max = 4, message = "car.yearProduction.tooManyCharacters")
        @NotBlank(message = "car.yearProduction.isBlank")
        String yearProduction,

        @Size(max = 255, message = "car.engineType.tooManyCharacters")
        @NotBlank(message = "car.engineType.isBlank")
        String engineType,

        @Size(max = 20, message = "car.carType.tooManyCharacters")
        String carType,

        @Size(max = 1200, message = "car.description.tooManyCharacters")
        String description
) {
}


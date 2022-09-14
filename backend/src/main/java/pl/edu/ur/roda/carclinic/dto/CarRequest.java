package pl.edu.ur.roda.carclinic.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public record CarRequest(

        @Size(max = 255, message = "car.brand.tooManyCharacters")
        String brand,

        @Size(max = 255, message = "car.model.tooManyCharacters")
        @NotBlank(message = "car.model.isBlank")
        String model,

        @Size(max = 4, message = "car.yearProduction.tooManyCharacters")
        String yearProduction,

        @Size(max = 255, message = "car.engineType.tooManyCharacters")
        String engineType,

        @Size(max = 20, message = "car.engineCapacity.tooManyCharacters")
        String engineCapacity,

        @Size(max = 1200, message = "car.yearProduction.tooManyCharacters")
        String description
) {
}


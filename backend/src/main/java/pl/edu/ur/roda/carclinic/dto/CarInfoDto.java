package pl.edu.ur.roda.carclinic.dto;

public record CarInfoDto(
        String id,
        String brand,
        String model,
        String yearProduction,
        String engineType,
        String engineCapacity,
        String description,
        String imagePath
) {
}

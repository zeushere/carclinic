package pl.edu.ur.roda.carclinic.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarInfoDto{
    String id;
    String brand;
    String model;
    String yearProduction;
    String engineType;
    String engineCapacity;
    String description;
    String image;
}

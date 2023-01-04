package pl.edu.ur.roda.carclinic.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "cars")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private String brand;
    private String model;
    private String yearProduction;
    private String engineType;
    private String engineCapacity;
    private String description;
    private String imagePath;
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    public Car(String brand, String model, String yearProduction, String engineType, String engineCapacity, String description, String imagePath, User owner) {
        this.brand = brand;
        this.model = model;
        this.yearProduction = yearProduction;
        this.engineType = engineType;
        this.engineCapacity = engineCapacity;
        this.description = description;
        this.imagePath = imagePath;
        this.owner = owner;
    }
}

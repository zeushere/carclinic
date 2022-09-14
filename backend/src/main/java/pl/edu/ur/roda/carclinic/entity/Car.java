package pl.edu.ur.roda.carclinic.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "cars")
@Getter
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
    private String description;
    private String imagePath;
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}

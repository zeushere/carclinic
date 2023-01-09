package pl.edu.ur.roda.carclinic.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.Set;

@Entity
@Table(name = "typical_faults")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypicalFaults {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_typical_faults")
    @SequenceGenerator(
            name = "seq_typical_faults",
            sequenceName = "seq_typical_faults",
            allocationSize = 1
    )
    private Long id;
    private String name;
    private String brand;
    private String model;
    private int yearProductionFrom;
    private int yearProductionTo;
    private String engineType;
}


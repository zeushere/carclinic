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
import java.time.LocalTime;
import java.util.Set;

@Entity
@Table(name = "mechanical_service")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MechanicalService {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_mechanical_service")
    @SequenceGenerator(
            name = "seq_mechanical_service",
            sequenceName = "seq_mechanical_service",
            allocationSize = 1
    )
    private Long id;
    private String name;
    private LocalTime expectedExecutionTime;
    private double expectedServiceCost;

    @OneToMany(mappedBy = "mechanicalService", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Appointment> appointments;
}

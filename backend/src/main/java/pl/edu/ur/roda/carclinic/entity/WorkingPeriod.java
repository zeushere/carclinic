package pl.edu.ur.roda.carclinic.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.ur.roda.carclinic.enums.AppointmentAvailableStatus;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "working_period")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkingPeriod {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_working_period")
    @SequenceGenerator(
            name = "seq_working_period",
            sequenceName = "seq_working_period",
            allocationSize = 1
    )
    private Long id;
    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    private AppointmentAvailableStatus available;

    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

}

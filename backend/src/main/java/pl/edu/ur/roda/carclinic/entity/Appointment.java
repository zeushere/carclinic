package pl.edu.ur.roda.carclinic.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Set;

@Entity
@Table(name = "appointment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private LocalDate date;
    private LocalTime fromTime;
    private LocalTime toTime;
    private String description;
    private String imagePath;
    private String repairType;
    private String repairStatus;
    private String paymentType;
    private String paymentStatus;
    private BigDecimal cost;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "mechanical_service_id")
    private MechanicalService mechanicalService;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    @OneToMany(mappedBy = "appointment", fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    private Set<WorkingPeriod> workingPeriods;

    public Appointment(LocalDate date, LocalTime fromTime, LocalTime toTime, String description, String repairType, String paymentType, BigDecimal cost, User user, MechanicalService mechanicalService, Car car) {
        this.date = date;
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.description = description;
        this.repairType = repairType;
        this.repairStatus = "Zgłoszone";
        this.paymentType = paymentType;
        this.paymentStatus = "Oczekujące";
        this.cost = cost;
        this.user = user;
        this.mechanicalService = mechanicalService;
        this.car = car;
    }
}

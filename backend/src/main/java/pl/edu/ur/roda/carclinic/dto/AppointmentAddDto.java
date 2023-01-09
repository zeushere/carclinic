package pl.edu.ur.roda.carclinic.dto;

import lombok.Getter;
import lombok.Setter;
import pl.edu.ur.roda.carclinic.entity.Appointment;
import pl.edu.ur.roda.carclinic.entity.Car;
import pl.edu.ur.roda.carclinic.entity.MechanicalService;
import pl.edu.ur.roda.carclinic.entity.User;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class AppointmentAddDto{
        @NotNull
        LocalDate date;

        @NotNull
        LocalTime fromTime;

        String description;
        @NotNull
        String repairType;

        @NotNull
        String paymentType;

        @NotNull
        BigDecimal cost;

        @NotNull
        Long mechanicalServiceId;

        String carId;


    public static Appointment prepareAppointment(LocalDate date, LocalTime fromTime, String description, String repairType, String paymentType, BigDecimal cost, MechanicalService mechanicalService, User user, Car car) {
        return new Appointment(
                date,
                fromTime,
                description,
                repairType,
                paymentType,
                cost,
                user,
                mechanicalService,
                car
        );
    }
}

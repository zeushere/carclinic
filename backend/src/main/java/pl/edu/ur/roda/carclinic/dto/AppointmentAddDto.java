package pl.edu.ur.roda.carclinic.dto;

import pl.edu.ur.roda.carclinic.entity.Appointment;
import pl.edu.ur.roda.carclinic.entity.Car;
import pl.edu.ur.roda.carclinic.entity.MechanicalService;
import pl.edu.ur.roda.carclinic.entity.User;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record AppointmentAddDto(
        @NotNull
        LocalDate date,

        @NotNull
        LocalTime fromTime,

        String description,

        @NotNull
        String repairType,

        @NotNull
        String paymentType,

        @NotNull
        Long mechanicalServiceId,

        String carId
) {
        public static Appointment prepareAppointment(LocalDate date, LocalTime fromTime, String description, String repairType, String paymentType, MechanicalService mechanicalService, User user, Car car) {
                return new Appointment(
                        date,
                        fromTime,
                        description,
                        repairType,
                        paymentType,
                        user,
                        mechanicalService,
                        car
                );
        }
}

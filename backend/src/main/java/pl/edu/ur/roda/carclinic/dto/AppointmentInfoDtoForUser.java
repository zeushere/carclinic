package pl.edu.ur.roda.carclinic.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public record AppointmentInfoDtoForUser(
        String mechanicalService,
        LocalDate date,
        LocalTime fromTime,
        String repairType,
        String repairStatus,
        String paymentType,
        String paymentStatus,
        BigDecimal appointmentCost,
        String description
) {

}

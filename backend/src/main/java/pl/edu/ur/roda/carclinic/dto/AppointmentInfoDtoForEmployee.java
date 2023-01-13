package pl.edu.ur.roda.carclinic.dto;

import java.math.BigDecimal;
import java.time.LocalTime;

public record AppointmentInfoDtoForEmployee(
        String appointmentId,
        String mechanicalService,
        LocalTime fromTime,
        LocalTime toTime,
        String repairType,
        String repairStatus,
        String paymentType,
        String paymentStatus,
        BigDecimal appointmentCost,
        String description,
        String carBrand,
        String carModel,
        String yearProduction,
        String engineType,
        String userEmail,
        String userFirstName,
        String userLastName
) {
}

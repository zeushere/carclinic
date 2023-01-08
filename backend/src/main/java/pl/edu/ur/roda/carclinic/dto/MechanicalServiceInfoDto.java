package pl.edu.ur.roda.carclinic.dto;

import pl.edu.ur.roda.carclinic.entity.MechanicalService;

import java.math.BigDecimal;
import java.time.LocalTime;

public record MechanicalServiceInfoDto(
        Long id,
        String name,
        LocalTime expectedExecutionTime,
        BigDecimal expectedServiceCost
) {

    public static MechanicalServiceInfoDto of(MechanicalService mechanicalService) {
        return new MechanicalServiceInfoDto(
                mechanicalService.getId(),
                mechanicalService.getName(),
                getDateWithoutSeconds(mechanicalService),
                mechanicalService.getExpectedServiceCost()
        );
    }

    public static LocalTime getDateWithoutSeconds(MechanicalService mechanicalService) {
        if (mechanicalService.getExpectedExecutionTime() != null) {
            return LocalTime.of(mechanicalService.getExpectedExecutionTime().getHour(), mechanicalService.getExpectedExecutionTime().getMinute());
        }
        return null;
    }
}

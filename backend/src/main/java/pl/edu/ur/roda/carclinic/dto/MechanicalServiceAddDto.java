package pl.edu.ur.roda.carclinic.dto;

import pl.edu.ur.roda.carclinic.entity.MechanicalService;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalTime;

public record MechanicalServiceAddDto(
        @Size(max = 255)
        @NotBlank
        String name,

        @NotNull
        LocalTime expectedExecutionTime,

        @Digits(integer = 15, fraction = 0)
        @NotNull
        BigDecimal expectedServiceCost
) {
    public static MechanicalService from(MechanicalServiceAddDto mechanicalServiceAddDto) {
        return new MechanicalService(
                mechanicalServiceAddDto.name(),
                mechanicalServiceAddDto.expectedExecutionTime().isBefore(LocalTime.of(0, 15)) ? null : mechanicalServiceAddDto.expectedExecutionTime(),
                mechanicalServiceAddDto.expectedServiceCost()
        );
    }
}


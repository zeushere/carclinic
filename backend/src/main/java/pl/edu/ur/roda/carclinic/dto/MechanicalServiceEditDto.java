package pl.edu.ur.roda.carclinic.dto;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalTime;

public record MechanicalServiceEditDto(

        @Size(max = 255)
        @NotBlank
        String name,

        @NotNull
        LocalTime expectedExecutionTime,

        @Digits(integer = 15, fraction = 0)
        @NotNull
        BigDecimal expectedServiceCost
) {
}

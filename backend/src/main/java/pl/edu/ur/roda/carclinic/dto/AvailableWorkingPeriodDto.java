package pl.edu.ur.roda.carclinic.dto;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public record AvailableWorkingPeriodDto(
        @NotNull
        LocalDate dayOfWork
) {
}

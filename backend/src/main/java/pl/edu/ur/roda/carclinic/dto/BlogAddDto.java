package pl.edu.ur.roda.carclinic.dto;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public record BlogAddDto(
        @NotBlank
        String title,
        @NotBlank
        String author,
        @NotBlank
        String article
) {
}

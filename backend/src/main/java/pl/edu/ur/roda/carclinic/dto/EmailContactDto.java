package pl.edu.ur.roda.carclinic.dto;

import javax.validation.constraints.NotNull;

@NotNull
public record EmailContactDto(
        String name,
        String email,
        String message
) {
}

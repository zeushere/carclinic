package pl.edu.ur.roda.carclinic.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public record UserCreateByAdminDto(
        @Size(max = 255)
        @NotBlank
        String firstName,

        @Size(max = 255)
        @NotBlank
        String lastName,

        @Size(max = 255)
        @NotBlank
        @Email(message = "user.mail.notValid")
        String email,

        @Size(max = 24, message = "user.login.tooMuchCharacters")
        @NotBlank
        String login,

        @NotBlank
        String password,

        @NotBlank
        String address,

        @NotBlank(message = "user.role.isBlank")
        String role,

        @NotNull
        boolean isRegularCustomer
) {
}

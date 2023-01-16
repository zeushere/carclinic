package pl.edu.ur.roda.carclinic.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public record UserEditDto(

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

        @NotBlank(message = "user.password.isBlank")
        String password,

        @Size(max = 255)
        @NotBlank
        String address
        ) {
}

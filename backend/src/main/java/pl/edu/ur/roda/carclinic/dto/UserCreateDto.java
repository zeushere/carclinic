package pl.edu.ur.roda.carclinic.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public record UserCreateDto(

        @Size(max = 255)
        @NotBlank(message = "user.firstName.isBlank")
        String firstName,

        @Size(max = 255)
        @NotBlank(message = "user.lastName.isBlank")
        String lastName,
        @Size(max = 255)
        @Email(message = "user.mail.notValid")
        @NotBlank(message = "user.mail.isBlank")
        String email,

        @Size(max = 24, message = "user.login.tooMuchCharacters")
        @NotBlank(message = "user.login.isBlank")
        String login,

        @NotBlank(message = "user.password.isBlank")
        String password,

        @Size(max = 255)
        @NotBlank(message = "user.address.isBlank")
        String address

) {
}

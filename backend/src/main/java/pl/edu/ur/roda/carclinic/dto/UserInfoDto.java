package pl.edu.ur.roda.carclinic.dto;

public record UserInfoDto(
        String firstName,
        String lastName,
        String login,
        String email
) {
}

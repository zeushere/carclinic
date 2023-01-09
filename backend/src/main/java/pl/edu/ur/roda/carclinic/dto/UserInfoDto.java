package pl.edu.ur.roda.carclinic.dto;

import pl.edu.ur.roda.carclinic.entity.User;

public record UserInfoDto(
        String firstName,
        String lastName,
        String login,
        String email
) {
}

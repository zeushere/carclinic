package pl.edu.ur.roda.carclinic.dto;

import pl.edu.ur.roda.carclinic.entity.User;

public record UserDto(
        String id,
        String email,
        String login,
        String firstName,
        String lastName,
        boolean regularCustomer
) {
    public static UserDto of(User user) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getLogin(),
                user.getFirstName(),
                user.getLastName(),
                user.isRegularCustomer()
        );
    }
}

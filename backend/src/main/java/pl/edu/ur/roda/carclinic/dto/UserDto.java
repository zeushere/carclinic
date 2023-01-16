package pl.edu.ur.roda.carclinic.dto;

import pl.edu.ur.roda.carclinic.entity.User;

public record UserDto(
        String id,
        String email,
        String login,
        String firstName,
        String lastName,
        String address,
        String role,
        boolean regularCustomer
) {
    public static UserDto of(User user, String role) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getLogin(),
                user.getFirstName(),
                user.getLastName(),
                user.getAddress(),
                role,
                user.isRegularCustomer()
        );
    }
}

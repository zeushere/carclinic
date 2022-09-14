package pl.edu.ur.roda.carclinic.dto;

import pl.edu.ur.roda.carclinic.entity.User;

public record UserReadDto(String login, String email) {

    public static UserReadDto of(User user) {
        return new UserReadDto(user.getLogin(), user.getEmail());
    }
}

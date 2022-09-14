package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.dto.UserCreateDto;
import pl.edu.ur.roda.carclinic.dto.UserReadDto;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.repostiory.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserReadDto createUser(UserCreateDto userCreateDto) {
        User registerUser = userRepository.save(new User(null, userCreateDto.email(), userCreateDto.login(), userCreateDto.password().toCharArray()));
        return UserReadDto.of(registerUser);
    }

}

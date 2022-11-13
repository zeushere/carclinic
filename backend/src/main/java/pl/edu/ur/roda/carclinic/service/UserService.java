package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.configuration.captcha.CaptchaValidator;
import pl.edu.ur.roda.carclinic.dto.UserCreateDto;
import pl.edu.ur.roda.carclinic.dto.UserReadDto;
import pl.edu.ur.roda.carclinic.entity.Role;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.repostiory.RoleRepository;
import pl.edu.ur.roda.carclinic.repostiory.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final CaptchaValidator captchaValidator;

    public UserReadDto createUser(UserCreateDto userCreateDto, String captcha) {
        captchaValidator.validate(captcha);
        char[] encodedPassword = passwordEncoder.encode(userCreateDto.password()).toCharArray();
        Role userRole = roleRepository.findByName("USER").orElseThrow();
        User registerUser = userRepository.save(new User(userCreateDto.firstName(), userCreateDto.lastName(), userCreateDto.email(), userCreateDto.login(), encodedPassword, userRole));
        return UserReadDto.of(registerUser);
    }

}

package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.configuration.captcha.CaptchaValidator;
import pl.edu.ur.roda.carclinic.dto.UserCreateDto;
import pl.edu.ur.roda.carclinic.dto.UserReadDto;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.repostiory.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CaptchaValidator captchaValidator;

    public UserReadDto createUser(UserCreateDto userCreateDto, String captcha) {
        captchaValidator.validate(captcha);
        char[] encodedPassword = passwordEncoder.encode(userCreateDto.password()).toCharArray();
        User registerUser = userRepository.save(new User(userCreateDto.email(), userCreateDto.login(), encodedPassword));
        return UserReadDto.of(registerUser);
    }

}

package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.configuration.captcha.CaptchaValidator;
import pl.edu.ur.roda.carclinic.dto.UserCreateDto;
import pl.edu.ur.roda.carclinic.dto.UserEditDto;
import pl.edu.ur.roda.carclinic.dto.UserInfoDto;
import pl.edu.ur.roda.carclinic.dto.UserReadDto;
import pl.edu.ur.roda.carclinic.entity.Role;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindUserException;
import pl.edu.ur.roda.carclinic.exception.UpdateEmailOrLoginException;
import pl.edu.ur.roda.carclinic.mapper.UserInfoDtoUserMapper;
import pl.edu.ur.roda.carclinic.repostiory.RoleRepository;
import pl.edu.ur.roda.carclinic.repostiory.UserRepository;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final CaptchaValidator captchaValidator;
    private final UserInfoDtoUserMapper userInfoDtoUserMapper;

    public UserReadDto createUser(UserCreateDto userCreateDto, String captcha) {
        captchaValidator.validate(captcha);
        char[] encodedPassword = passwordEncoder.encode(userCreateDto.password()).toCharArray();
        Role userRole = roleRepository.findByName("USER").orElseThrow();
        User registerUser = userRepository.save(new User(userCreateDto.firstName(), userCreateDto.lastName(), userCreateDto.email(), userCreateDto.login(), encodedPassword, userRole));
        return UserReadDto.of(registerUser);
    }

    public UserInfoDto getUser(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindUserException(userId));
        return userInfoDtoUserMapper.userToUserInfoDto(user);
    }

    @Transactional
    public UserEditDto editUser(UserEditDto userEditDto, String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindUserException(userId));

        if (userRepository.existsByEmail(userEditDto.email()) && !userEditDto.email().equals(user.getEmail())) {
            throw new UpdateEmailOrLoginException("email");
        }

        if (userRepository.existsByLogin(userEditDto.login()) && !userEditDto.login().equals(user.getLogin())) {
            throw new UpdateEmailOrLoginException("login");
        }

        user.setFirstName(userEditDto.firstName());
        user.setLastName(userEditDto.lastName());
        user.setEmail(userEditDto.email());
        user.setLogin(userEditDto.login());
        char[] encodedPassword = passwordEncoder.encode(userEditDto.password()).toCharArray();
        user.setPassword(encodedPassword);

        return userEditDto;
    }
}

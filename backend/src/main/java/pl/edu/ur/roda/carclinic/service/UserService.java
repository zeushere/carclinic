package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.configuration.captcha.CaptchaValidator;
import pl.edu.ur.roda.carclinic.dto.RoleDto;
import pl.edu.ur.roda.carclinic.dto.UserCreateDto;
import pl.edu.ur.roda.carclinic.dto.UserDto;
import pl.edu.ur.roda.carclinic.dto.UserEditDto;
import pl.edu.ur.roda.carclinic.dto.UserInfoDto;
import pl.edu.ur.roda.carclinic.dto.UserReadDto;
import pl.edu.ur.roda.carclinic.entity.Role;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindCarException;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindUserException;
import pl.edu.ur.roda.carclinic.exception.UpdateEmailOrLoginException;
import pl.edu.ur.roda.carclinic.mapper.UserInfoDtoUserMapper;
import pl.edu.ur.roda.carclinic.repostiory.RoleRepository;
import pl.edu.ur.roda.carclinic.repostiory.UserRepository;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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

    @Transactional
    public boolean setRegularCustomer(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindUserException(userId));
        user.setRegularCustomer(true);

        return true;
    }

    public List<UserDto> getUsers() {
        return userRepository.findAll().stream().map(UserDto::of)
                .collect(Collectors.toList());
    }

    @Transactional
    public void setRole(String id, String role) {
        User user = userRepository.findById(id).orElseThrow(() -> new CouldNotFindCarException(id));
        Role roleToUpdate = roleRepository.findByName(StringUtils.upperCase(role)).get();
        Set<Role> roles = new HashSet<>();
        roles.add(roleToUpdate);
        user.setRoles(roles);
    }

    public RoleDto getRole(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindCarException(userId));
        Set<Role> roles = user.getRoles();
        Role role = roles.stream().findFirst().get();
        return new RoleDto(role.getName());
    }
}

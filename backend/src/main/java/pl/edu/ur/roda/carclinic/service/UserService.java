package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.configuration.captcha.CaptchaValidator;
import pl.edu.ur.roda.carclinic.dto.RoleDto;
import pl.edu.ur.roda.carclinic.dto.UserCreateByAdminDto;
import pl.edu.ur.roda.carclinic.dto.UserCreateDto;
import pl.edu.ur.roda.carclinic.dto.UserDto;
import pl.edu.ur.roda.carclinic.dto.UserEditByAdminDto;
import pl.edu.ur.roda.carclinic.dto.UserEditDto;
import pl.edu.ur.roda.carclinic.dto.UserInfoDto;
import pl.edu.ur.roda.carclinic.dto.UserReadDto;
import pl.edu.ur.roda.carclinic.dto.UserRegisterIdDto;
import pl.edu.ur.roda.carclinic.entity.Appointment;
import pl.edu.ur.roda.carclinic.entity.Role;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindCarException;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindUserException;
import pl.edu.ur.roda.carclinic.exception.UpdateEmailOrLoginException;
import pl.edu.ur.roda.carclinic.mapper.UserInfoDtoUserMapper;
import pl.edu.ur.roda.carclinic.repostiory.RoleRepository;
import pl.edu.ur.roda.carclinic.repostiory.UserRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
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
    private final AppointmentService appointmentService;

    public UserReadDto createUser(UserCreateDto userCreateDto, String captcha) {
        captchaValidator.validate(captcha);
        char[] encodedPassword = passwordEncoder.encode(userCreateDto.password()).toCharArray();
        Role userRole = roleRepository.findByName("USER").orElseThrow();
        User registerUser = userRepository.save(new User(userCreateDto.firstName(), userCreateDto.lastName(), userCreateDto.email(), userCreateDto.login(), encodedPassword, userRole));
        return UserReadDto.of(registerUser);
    }

    public UserRegisterIdDto createUserByAdmin(UserCreateByAdminDto userCreateByAdminDto, String captcha) {
        captchaValidator.validate(captcha);
        char[] encodedPassword = passwordEncoder.encode(userCreateByAdminDto.password()).toCharArray();
        Role role = roleRepository.findByName(userCreateByAdminDto.role()).orElseThrow();
        User registerUser = userRepository.save(new User(userCreateByAdminDto.firstName(), userCreateByAdminDto.lastName(), userCreateByAdminDto.email(), userCreateByAdminDto.login(), encodedPassword, role, userCreateByAdminDto.isRegularCustomer()));
        return new UserRegisterIdDto(registerUser.getId());
    }

    public UserInfoDto getUser(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindUserException(userId));
        return userInfoDtoUserMapper.userToUserInfoDto(user);
    }

    public UserDto getUserForAdmin(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindUserException(userId));
        Role role = user.getRoles().stream().findFirst().orElseThrow();

        return UserDto.of(user, role.getName());
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
    public UserEditByAdminDto editUserByAdmin(UserEditByAdminDto userEditByAdminDto, String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindUserException(userId));
        Role userRole = roleRepository.findByName(userEditByAdminDto.role()).orElseThrow();

        HashSet<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);

        if (userRepository.existsByEmail(userEditByAdminDto.email()) && !userEditByAdminDto.email().equals(user.getEmail())) {
            throw new UpdateEmailOrLoginException("email");
        }

        if (userRepository.existsByLogin(userEditByAdminDto.login()) && !userEditByAdminDto.login().equals(user.getLogin())) {
            throw new UpdateEmailOrLoginException("login");
        }

        user.setFirstName(userEditByAdminDto.firstName());
        user.setLastName(userEditByAdminDto.lastName());
        user.setEmail(userEditByAdminDto.email());
        user.setLogin(userEditByAdminDto.login());
        user.setRegularCustomer(userEditByAdminDto.isRegularCustomer());
        user.setRoles(userRoles);

        if (userEditByAdminDto.password() != null) {
            char[] encodedPassword = passwordEncoder.encode(userEditByAdminDto.password()).toCharArray();
            user.setPassword(encodedPassword);
        }

        return userEditByAdminDto;
    }

    @Transactional
    public boolean setRegularCustomer(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindUserException(userId));
        user.setRegularCustomer(true);

        return true;
    }

    public List<UserDto> getUsers() {
        List<User> allUsers = userRepository.findAll();
        Role userRole = roleRepository.findByName("USER").orElseThrow();
        List<User> usersWithUserRole = new ArrayList<>();

        allUsers
                .forEach(user -> {
                    if (user.getRoles().contains(userRole)) {
                        usersWithUserRole.add(user);
                    }
                });
        return usersWithUserRole.stream()
                .map(user -> UserDto.of(user, userRole.getName()))
                .collect(Collectors.toList());
    }

    public List<UserDto> getEmployees() {
        List<User> allUsers = userRepository.findAll();
        Role employeeRole = roleRepository.findByName("EMPLOYEE").orElseThrow();
        List<User> usersWithEmployeeRole = new ArrayList<>();

        allUsers
                .forEach(user -> {
                    if (user.getRoles().contains(employeeRole)) {
                        usersWithEmployeeRole.add(user);
                    }
                });
        return usersWithEmployeeRole.stream()
                .map(user -> UserDto.of(user, employeeRole.getName()))
                .collect(Collectors.toList());
    }

    public List<UserDto> getAdmins(String userId) {
        List<User> allUsers = userRepository.findAll();
        Role adminRole = roleRepository.findByName("ADMIN").orElseThrow();
        List<User> usersWithAdminRole = new ArrayList<>();

        allUsers
                .forEach(user -> {
                    if (user.getRoles().contains(adminRole) &&
                            !user.getId().equals(userId)) {
                        usersWithAdminRole.add(user);
                    }
                });
        return usersWithAdminRole.stream()
                .map(user -> UserDto.of(user, adminRole.getName()))
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

    public boolean checkIsRegularCustomer(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindCarException(userId));
        return user.isRegularCustomer();
    }

    public void deleteUserByAdmin(String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new CouldNotFindCarException(id));
        Set<Appointment> userAppointments = user.getAppointments();

        if(userAppointments != null){
            userAppointments
                    .forEach(appointment ->
                            appointmentService.cancelAppointment(appointment.getId(), id));
        }
        userRepository.deleteById(id);
    }
}

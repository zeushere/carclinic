package pl.edu.ur.roda.carclinic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.ur.roda.carclinic.dto.RoleDto;
import pl.edu.ur.roda.carclinic.dto.UserCreateDto;
import pl.edu.ur.roda.carclinic.dto.UserDto;
import pl.edu.ur.roda.carclinic.dto.UserEditDto;
import pl.edu.ur.roda.carclinic.dto.UserInfoDto;
import pl.edu.ur.roda.carclinic.dto.UserReadDto;
import pl.edu.ur.roda.carclinic.service.UserService;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("register")
    public ResponseEntity<UserReadDto> register(
            @Valid @RequestBody UserCreateDto userCreateDto,
            @RequestParam("g-recaptcha") String captcha) {
        return new ResponseEntity<>(userService.createUser(userCreateDto, captcha), HttpStatus.CREATED);
    }

    @GetMapping("profile")
    public ResponseEntity<UserInfoDto> getUser(@AuthenticationPrincipal String userId) {
        return new ResponseEntity<>(userService.getUser(userId), HttpStatus.OK);
    }

    @PutMapping("profile")
    public ResponseEntity<UserEditDto> editUser(
            @AuthenticationPrincipal String userId,
            @Valid @RequestBody UserEditDto userEditDto) {
        return new ResponseEntity<>(userService.editUser(userEditDto, userId), HttpStatus.OK);
    }

    @PostMapping("users/{id}")
    public boolean setRegularCustomer(
            @PathVariable String id
    ) {
        return userService.setRegularCustomer(id);
    }

    @GetMapping("users")
    public List<UserDto> getUsers(
            @AuthenticationPrincipal String userId
    ) {
        return userService.getUsers();
    }

    @PutMapping("/user-role/{id}")
    void setRoleToUser(
            @PathVariable String id,
            @AuthenticationPrincipal String userId,
            @RequestParam("role") String role
    ) {
        userService.setRole(id, role);
    }

    @GetMapping("user-role")
    RoleDto getUserRole(
            @AuthenticationPrincipal String userId
    ) {
        return userService.getRole(userId);
    }
}

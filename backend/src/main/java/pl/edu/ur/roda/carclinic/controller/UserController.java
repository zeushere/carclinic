package pl.edu.ur.roda.carclinic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.edu.ur.roda.carclinic.dto.UserCreateDto;
import pl.edu.ur.roda.carclinic.dto.UserInfoDto;
import pl.edu.ur.roda.carclinic.dto.UserReadDto;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.service.UserService;

import javax.validation.Valid;


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
        return new ResponseEntity<>(userService.getUser(userId),HttpStatus.OK);
    }

    @GetMapping("/hello")
    @ResponseBody
    public ResponseEntity<String> hello() {
        return new ResponseEntity<>("Kocham Ksenie Frumosu", HttpStatus.OK);
    }

}

package pl.edu.ur.roda.carclinic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.ur.roda.carclinic.dto.AppointmentAddDto;
import pl.edu.ur.roda.carclinic.service.AppointmentService;

import javax.validation.Valid;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    void addAppointment(
            @RequestBody @Valid AppointmentAddDto appointmentAddDto,
            @AuthenticationPrincipal String userId
    ) {
        appointmentService.addAppointment(appointmentAddDto, userId);
    }
}

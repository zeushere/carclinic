package pl.edu.ur.roda.carclinic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.ur.roda.carclinic.dto.AllAppointmentsOfDayDto;
import pl.edu.ur.roda.carclinic.dto.AppointmentAddDto;
import pl.edu.ur.roda.carclinic.dto.AppointmentInfoDtoForEmployee;
import pl.edu.ur.roda.carclinic.dto.AppointmentInfoDtoForUser;
import pl.edu.ur.roda.carclinic.service.AppointmentService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    AppointmentService.AppointmentId addAppointment(
            @RequestBody @Valid AppointmentAddDto appointmentAddDto,
            @AuthenticationPrincipal String userId
    ) {
        return appointmentService.addAppointment(appointmentAddDto, userId);
    }

    @PostMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    void cancelAppointment(
            @PathVariable String id,
            @AuthenticationPrincipal String userId
    ) {
        appointmentService.cancelAppointment(id, userId);
    }

    @GetMapping("day/{id}")
    @ResponseStatus(HttpStatus.OK)
    AppointmentInfoDtoForEmployee getAppointmentsOfDay(
            @AuthenticationPrincipal String userId,
            @PathVariable String id) {
        return appointmentService.getUserAppointment(id, userId);
    }

    @PostMapping("day")
    @ResponseStatus(HttpStatus.OK)
    List<AppointmentInfoDtoForEmployee> getAllAppointmentsOfDay(
            @AuthenticationPrincipal String userId,
            @RequestBody AllAppointmentsOfDayDto allAppointmentsOfDayDto) {
        return appointmentService.getAllAppointmentsOfDay(allAppointmentsOfDayDto, userId);
    }

    @GetMapping("/user")
    @ResponseStatus(HttpStatus.OK)
    List<AppointmentInfoDtoForUser> getUserAppointments(
            @AuthenticationPrincipal String userId) {
        return appointmentService.getUserAppointments(userId);
    }

    @PostMapping("/complete/{id}")
    void completeAppointment(
            @PathVariable String id,
            @AuthenticationPrincipal String userId
    ) {
        appointmentService.completeAppointment(id, userId);
    }

    @PostMapping("/paid/{id}")
    void payAppointment(
            @PathVariable String id,
            @AuthenticationPrincipal String userId
    ) {
        appointmentService.payAppointment(id, userId);
    }

    @GetMapping("/user/{carId}")
    @ResponseStatus(HttpStatus.OK)
    List<AppointmentInfoDtoForUser> getUserCarAppointments(
            @AuthenticationPrincipal String userId,
            @PathVariable String carId) {
        return appointmentService.getUserCarAppointments(userId, carId);
    }
}


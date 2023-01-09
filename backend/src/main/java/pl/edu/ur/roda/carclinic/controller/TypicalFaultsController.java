package pl.edu.ur.roda.carclinic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.ur.roda.carclinic.dto.TypicalFaultDto;
import pl.edu.ur.roda.carclinic.entity.TypicalFaults;
import pl.edu.ur.roda.carclinic.service.TypicalFaultsService;

import java.util.List;

@RestController
@RequestMapping("/typical-faults")
@RequiredArgsConstructor
public class TypicalFaultsController {

    private final TypicalFaultsService typicalFaultsService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    List<TypicalFaults> getTypicalFaults() {
        return typicalFaultsService.getTypicalFaults();
    }

    @GetMapping("/user/{carId}")
    @ResponseStatus(HttpStatus.OK)
    List<TypicalFaultDto> getUserCarTypicalFaults(
            @AuthenticationPrincipal String userId,
            @PathVariable String carId) {
        return typicalFaultsService.getUserCarsTypicalFaults(userId, carId);
    }
}

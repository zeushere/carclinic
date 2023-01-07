package pl.edu.ur.roda.carclinic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.ur.roda.carclinic.dto.MechanicalServiceInfoDto;
import pl.edu.ur.roda.carclinic.service.MechanicalService;

import java.util.List;

@RestController
@RequestMapping("/mechanical-services")
@RequiredArgsConstructor
public class MechanicalServiceController {

    private final MechanicalService mechanicalService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    List<MechanicalServiceInfoDto> getMechanicalServices(
    ) {
        return mechanicalService.getMechanicalServices();
    }
}

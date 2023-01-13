package pl.edu.ur.roda.carclinic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.ur.roda.carclinic.dto.CarInfoDto;
import pl.edu.ur.roda.carclinic.dto.MechanicalServiceAddDto;
import pl.edu.ur.roda.carclinic.dto.MechanicalServiceEditDto;
import pl.edu.ur.roda.carclinic.dto.MechanicalServiceInfoDto;
import pl.edu.ur.roda.carclinic.dto.UserEditDto;
import pl.edu.ur.roda.carclinic.service.MechanicalService;

import javax.validation.Valid;
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

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    MechanicalServiceInfoDto getMechanicalService(
            @PathVariable Long id,
            @AuthenticationPrincipal String userId
    ) {
        return mechanicalService.getMechanicalService(id, userId);
    }

    @PostMapping
    public Long addMechanicalService(
            @AuthenticationPrincipal String userId,
            @RequestBody MechanicalServiceAddDto mechanicalServiceAddDto
    ) {
        return mechanicalService.addMechanicalService(mechanicalServiceAddDto, userId);
    }

    @PutMapping("{id}")
    public ResponseEntity<MechanicalServiceEditDto> editMechanicalService(
            @AuthenticationPrincipal String userId,
            @PathVariable Long id,
            @Valid @RequestBody MechanicalServiceEditDto mechanicalServiceEditDto) {
        return new ResponseEntity<>(mechanicalService.editMechanicalService(id, mechanicalServiceEditDto, userId), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteMechanicalService(
            @AuthenticationPrincipal String userId,
            @PathVariable Long id) {

        mechanicalService.deleteMechanicalService(id, userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

package pl.edu.ur.roda.carclinic.controller;

import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Parameter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.ur.roda.carclinic.dto.AvailableWorkingPeriodDto;
import pl.edu.ur.roda.carclinic.dto.WorkingPeriodInfoDto;
import pl.edu.ur.roda.carclinic.service.WorkingPeriodService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/working-periods")
@RequiredArgsConstructor
public class WorkingPeriodController {

    private final WorkingPeriodService workingPeriodService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping("{mechanicalServiceId}")
    List<WorkingPeriodInfoDto> getAvailableWorkingPeriods(
            @PathVariable Long mechanicalServiceId,
            @RequestParam String typeOfWork,
            @RequestBody AvailableWorkingPeriodDto dayOfWork
            ) {
        return workingPeriodService.getAvailableWorkingPeriods(mechanicalServiceId, dayOfWork, typeOfWork);
    }
}

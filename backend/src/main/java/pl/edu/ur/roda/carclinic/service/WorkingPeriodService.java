package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.dto.AvailableWorkingPeriodDto;
import pl.edu.ur.roda.carclinic.dto.WorkingPeriodInfoDto;
import pl.edu.ur.roda.carclinic.entity.MechanicalService;
import pl.edu.ur.roda.carclinic.entity.WorkingPeriod;
import pl.edu.ur.roda.carclinic.enums.AppointmentAvailableStatus;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindMechanicalServiceException;
import pl.edu.ur.roda.carclinic.repostiory.MechanicalServiceRepository;
import pl.edu.ur.roda.carclinic.repostiory.WorkingPeriodRepository;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkingPeriodService {
    private static final int MINUTES_PERIOD = 15;
    private final WorkingPeriodRepository workingPeriodRepository;
    private final MechanicalServiceRepository mechanicalServiceRepository;

    public List<WorkingPeriodInfoDto> getAvailableWorkingPeriods(Long mechanicalServiceId, AvailableWorkingPeriodDto availableWorkingPeriodDto, String typeOfWork) {
        MechanicalService mechanicalService = mechanicalServiceRepository.findById(mechanicalServiceId).orElseThrow(() -> new CouldNotFindMechanicalServiceException(mechanicalServiceId));
        LocalTime expectedExecutionTime = mechanicalService.getExpectedExecutionTime();

        if (typeOfWork.equals("Zdalna")) {
            expectedExecutionTime = expectedExecutionTime.plusHours(1);
        }

        List<WorkingPeriod> byDateAndAvailableWithoutTime = workingPeriodRepository.findAvailableDateInDay(availableWorkingPeriodDto.dayOfWork(), AppointmentAvailableStatus.WOLNE.name());
        List<LocalDateTime> listOfLocalDateTimesOfPeriods = getListOfLocalDateTimesOfPeriods(byDateAndAvailableWithoutTime);
        List<WorkingPeriod> listOfAvailableDateWithMechanicalService = new ArrayList<>();
        LocalTime finalExpectedExecutionTime = expectedExecutionTime;
        byDateAndAvailableWithoutTime
                .forEach(workingPeriod -> {
                    LocalDateTime expectedDateTo = workingPeriod.getDate().plusHours(finalExpectedExecutionTime.getHour()).plusMinutes(finalExpectedExecutionTime.getMinute());
                    if (listOfLocalDateTimesOfPeriods.contains(expectedDateTo.minusMinutes(MINUTES_PERIOD))) {
                        LocalDateTime localDateTimeToCheckAvailability = workingPeriod.getDate().plusMinutes(MINUTES_PERIOD);
                        while (!localDateTimeToCheckAvailability.equals(expectedDateTo.minusMinutes(MINUTES_PERIOD))) {
                            if (listOfLocalDateTimesOfPeriods.contains(localDateTimeToCheckAvailability)) {
                                localDateTimeToCheckAvailability = localDateTimeToCheckAvailability.plusMinutes(MINUTES_PERIOD);
                            } else {
                                return;
                            }
                        }
                        listOfAvailableDateWithMechanicalService.add(workingPeriod);
                    }
                });
        List<WorkingPeriod> availableHoursAtDay = getAvailableHoursAtDay(listOfAvailableDateWithMechanicalService);

        return availableHoursAtDay.stream()
                .map(WorkingPeriodInfoDto::of)
                .collect(Collectors.toList());
    }

    private List<LocalDateTime> getListOfLocalDateTimesOfPeriods(List<WorkingPeriod> workingPeriodList) {
        return workingPeriodList
                .stream()
                .map(WorkingPeriod::getDate)
                .collect(Collectors.toList());
    }

    private List<WorkingPeriod> getAvailableHoursAtDay(List<WorkingPeriod> workingPeriodList) {
        List<WorkingPeriod> availableWorkingPeriod = new ArrayList<>();

        workingPeriodList
                .forEach(workingPeriod -> {
                    if (workingPeriod.getDate().isAfter(LocalDateTime.now())) {
                        availableWorkingPeriod.add(workingPeriod);
                    }
                    ;
                });
        return availableWorkingPeriod;
    }
}
package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.dto.AppointmentAddDto;
import pl.edu.ur.roda.carclinic.entity.Appointment;
import pl.edu.ur.roda.carclinic.entity.Car;
import pl.edu.ur.roda.carclinic.entity.MechanicalService;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.entity.WorkingPeriod;
import pl.edu.ur.roda.carclinic.enums.AppointmentAvailableStatus;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindCarException;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindMechanicalServiceException;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindUserException;
import pl.edu.ur.roda.carclinic.repostiory.AppointmentRepository;
import pl.edu.ur.roda.carclinic.repostiory.CarRepository;
import pl.edu.ur.roda.carclinic.repostiory.MechanicalServiceRepository;
import pl.edu.ur.roda.carclinic.repostiory.UserRepository;
import pl.edu.ur.roda.carclinic.repostiory.WorkingPeriodRepository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private static final int MINUTES_PERIOD = 15;

    private final AppointmentRepository appointmentRepository;
    private final WorkingPeriodRepository workingPeriodRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final MechanicalServiceRepository mechanicalServiceRepository;

    @Transactional
    public void addAppointment(AppointmentAddDto appointmentAddDto, String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindUserException(userId));
        MechanicalService mechanicalService = mechanicalServiceRepository.findById(appointmentAddDto.mechanicalServiceId()).orElseThrow(() -> new CouldNotFindMechanicalServiceException(appointmentAddDto.mechanicalServiceId()));
        Car car = getCar(appointmentAddDto.carId());

        LocalDateTime appointmentDateTimeFrom = createDateTimeFrom(appointmentAddDto);
        LocalDateTime expectedTimeTo = appointmentDateTimeFrom.plusHours(mechanicalService.getExpectedExecutionTime().getHour()).plusMinutes(mechanicalService.getExpectedExecutionTime().getMinute());

        Appointment appointment = AppointmentAddDto.prepareAppointment(
                appointmentAddDto.date(),
                appointmentAddDto.fromTime(),
                appointmentAddDto.description(),
                appointmentAddDto.repairType(),
                appointmentAddDto.paymentType(),
                mechanicalService,
                user,
                car
        );

        Appointment savedAppointment = appointmentRepository.save(appointment);

        WorkingPeriod workingPeriodDateFrom = workingPeriodRepository.findByDateAndAvailable(appointmentDateTimeFrom, AppointmentAvailableStatus.WOLNE.name());
        WorkingPeriod workingPeriodDateTo = workingPeriodRepository.findByDateAndAvailable(expectedTimeTo.minusMinutes(MINUTES_PERIOD), AppointmentAvailableStatus.WOLNE.name());

        setToReservedWorkingPeriodByAppointment(savedAppointment, workingPeriodDateFrom, workingPeriodDateTo);
    }

    private Car getCar(String carId) {
        if (carId != null) {
            return carRepository.findById(carId).orElseThrow(() -> new CouldNotFindCarException(carId));
        }
        return null;
    }

    private LocalDateTime createDateTimeFrom(AppointmentAddDto appointmentAddDto) {
        return LocalDateTime.of(
                appointmentAddDto.date().getYear(),
                appointmentAddDto.date().getMonth(),
                appointmentAddDto.date().getDayOfMonth(),
                appointmentAddDto.fromTime().getHour(),
                appointmentAddDto.fromTime().getMinute()
        );
    }

    public void setToReservedWorkingPeriodByAppointment(Appointment appointment, WorkingPeriod workingPeriodDateFrom, WorkingPeriod workingPeriodDateTo) {
        List<WorkingPeriod> byDateBetween = workingPeriodRepository.findByDateBetween(workingPeriodDateFrom.getDate(), workingPeriodDateTo.getDate());
        byDateBetween
                .forEach(workingPeriod -> {
                    if (workingPeriod.getAvailable().equals(AppointmentAvailableStatus.WOLNE) && workingPeriod.getAppointment() == null) {
                        workingPeriod.setAppointment(appointment);
                        workingPeriod.setAvailable(AppointmentAvailableStatus.ZAREZERWOWANE);
                    }
                });
    }
}

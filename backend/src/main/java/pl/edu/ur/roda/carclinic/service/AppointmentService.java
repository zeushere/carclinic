package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.dto.AppointmentAddDto;
import pl.edu.ur.roda.carclinic.dto.AppointmentInfoDtoForUser;
import pl.edu.ur.roda.carclinic.entity.Appointment;
import pl.edu.ur.roda.carclinic.entity.Car;
import pl.edu.ur.roda.carclinic.entity.MechanicalService;
import pl.edu.ur.roda.carclinic.entity.Role;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.entity.WorkingPeriod;
import pl.edu.ur.roda.carclinic.enums.AppointmentAvailableStatus;
import pl.edu.ur.roda.carclinic.exception.CouldNotCancelPastAppointment;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindCarException;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindMechanicalServiceException;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindUserException;
import pl.edu.ur.roda.carclinic.properties.EmailAddAppointmentProperties;
import pl.edu.ur.roda.carclinic.properties.EmailAddAppointmentToEmployeeProperties;
import pl.edu.ur.roda.carclinic.repostiory.AppointmentRepository;
import pl.edu.ur.roda.carclinic.repostiory.CarRepository;
import pl.edu.ur.roda.carclinic.repostiory.MechanicalServiceRepository;
import pl.edu.ur.roda.carclinic.repostiory.RoleRepository;
import pl.edu.ur.roda.carclinic.repostiory.UserRepository;
import pl.edu.ur.roda.carclinic.repostiory.WorkingPeriodRepository;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
@EnableConfigurationProperties({EmailAddAppointmentToEmployeeProperties.class, EmailAddAppointmentProperties.class})
public class AppointmentService {

    private static final int MINUTES_PERIOD = 15;

    private final AppointmentRepository appointmentRepository;
    private final WorkingPeriodRepository workingPeriodRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final MechanicalServiceRepository mechanicalServiceRepository;
    private final EmailAddAppointmentToUserService emailAddAppointmentToUserService;
    private final EmailAddAppointmentToEmployeeService emailAddAppointmentToEmployeeService;
    private final RoleRepository roleRepository;


    @Transactional
    public void addAppointment(AppointmentAddDto appointmentAddDto, String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindUserException(userId));
        MechanicalService mechanicalService = mechanicalServiceRepository.findById(appointmentAddDto.mechanicalServiceId()).orElseThrow(() -> new CouldNotFindMechanicalServiceException(appointmentAddDto.mechanicalServiceId()));
        Car car = getCar(appointmentAddDto.carId());
        LocalDateTime appointmentDateTimeFrom = createDateTimeFrom(appointmentAddDto);
        LocalDateTime expectedTimeTo = null;
        if (!mechanicalService.getName().equals("Diagnostyka samochodowa")) {
            expectedTimeTo = appointmentDateTimeFrom.plusHours(mechanicalService.getExpectedExecutionTime().getHour()).plusMinutes(mechanicalService.getExpectedExecutionTime().getMinute());

        }


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

        WorkingPeriod workingPeriodDateTo = workingPeriodRepository.findByDateAndAvailable(expectedTimeTo, AppointmentAvailableStatus.WOLNE.name());
        if (!mechanicalService.getName().equals("Diagnostyka samochodowa")) {
            setToReservedWorkingPeriodByAppointment(savedAppointment, workingPeriodDateFrom, workingPeriodDateTo);

        }
        EmailAddAppointmentToUserService.EmailAddAppointmentRequest emailAddAppointmentRequest = EmailAddAppointmentToUserService.EmailAddAppointmentRequest.of(appointment, user, car, mechanicalService, null);
        emailAddAppointmentToUserService.sendConfirmationEmail(emailAddAppointmentRequest);

        List<User> usersWithRoleEmployeeOrAdmin = getUsersWithRoleEmployeeOrAdmin();
        usersWithRoleEmployeeOrAdmin
                .forEach(u -> {
                    EmailAddAppointmentToEmployeeService.EmailAddAppointmentRequestToEmployee emailAddAppointmentRequestToEmployee = EmailAddAppointmentToEmployeeService.EmailAddAppointmentRequestToEmployee.of(user, appointment, u, car, mechanicalService, null);
                    emailAddAppointmentToEmployeeService.sendConfirmationEmail(emailAddAppointmentRequestToEmployee);
                });

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
        List<WorkingPeriod> byDateBetween = workingPeriodRepository.findByDateBetween(workingPeriodDateFrom.getDate(), workingPeriodDateTo.getDate().minusMinutes(MINUTES_PERIOD));
        byDateBetween.forEach(workingPeriod -> System.out.println(workingPeriod.getDate()));
        byDateBetween
                .forEach(workingPeriod -> {
                    if (workingPeriod.getAvailable().equals(AppointmentAvailableStatus.WOLNE) && workingPeriod.getAppointment() == null) {
                        workingPeriod.setAppointment(appointment);
                        workingPeriod.setAvailable(AppointmentAvailableStatus.ZAREZERWOWANE);
                    }
                });
    }

    @Transactional
    public void cancelAppointment(String id, String userId) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow();
        if (appointment.getDate().isBefore(LocalDate.now())) {
            throw new CouldNotCancelPastAppointment();
        }
        Set<WorkingPeriod> workingPeriodSet = appointment.getWorkingPeriods();
        workingPeriodSet
                .forEach(workingPeriod -> {
                    workingPeriod.setAvailable(AppointmentAvailableStatus.WOLNE);
                    workingPeriod.setAppointment(null);
                });
        appointmentRepository.delete(appointment);
    }

    @Transactional
    public List<AppointmentInfoDtoForUser> getUserAppointments(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindUserException(userId));
        Set<Appointment> appointments = user.getAppointments();
        List<AppointmentInfoDtoForUser> appointmentInfoDtoForUsers = new ArrayList<>();
        appointments.forEach(appointment -> {
            appointmentInfoDtoForUsers.add(
                    new AppointmentInfoDtoForUser(
                            appointment.getMechanicalService().getName(),
                            appointment.getDate(),
                            appointment.getFromTime(),
                            appointment.getRepairType(),
                            appointment.getPaymentStatus(),
                            appointment.getPaymentType(),
                            appointment.getPaymentStatus(),
                            appointment.getMechanicalService().getExpectedServiceCost()
                    )
            );
        });
        return appointmentInfoDtoForUsers;
    }
    public List<User> getUsersWithRoleEmployeeOrAdmin() {
        Role employeeRole = roleRepository.findByName("EMPLOYEE").get();
        Role adminRole = roleRepository.findByName("ADMIN").get();

        List<User> usersWithSuperRole = new ArrayList<>();

        userRepository.findAll()
                .forEach(user -> {
                    if(user.getRoles().contains(employeeRole) || user.getRoles().contains(adminRole)){
                        usersWithSuperRole.add(user);
                    }
                });

        return usersWithSuperRole;
    }
}
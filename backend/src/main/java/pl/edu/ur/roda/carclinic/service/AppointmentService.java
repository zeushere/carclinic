package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.dto.AllAppointmentsOfDayDto;
import pl.edu.ur.roda.carclinic.dto.AppointmentAddDto;
import pl.edu.ur.roda.carclinic.dto.AppointmentInfoDtoForEmployee;
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
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
    private final EmailCompleteAppointmentService emailCompleteAppointmentService;
    private final EmailAddAppointmentToEmployeeService emailAddAppointmentToEmployeeService;
    private final RoleRepository roleRepository;


    @Transactional
    public AppointmentId addAppointment(AppointmentAddDto appointmentAddDto, String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindUserException(userId));
        MechanicalService mechanicalService = mechanicalServiceRepository.findById(appointmentAddDto.getMechanicalServiceId()).orElseThrow(() -> new CouldNotFindMechanicalServiceException(appointmentAddDto.getMechanicalServiceId()));
        Car car = getCar(appointmentAddDto.getCarId());
        LocalDateTime appointmentDateTimeFrom = createDateTimeFrom(appointmentAddDto);
        LocalDateTime expectedTimeTo = null;
        if (!mechanicalService.getName().startsWith("Diagnostyka")) {
            expectedTimeTo = appointmentDateTimeFrom.plusHours(mechanicalService.getExpectedExecutionTime().getHour()).plusMinutes(mechanicalService.getExpectedExecutionTime().getMinute());
            if (appointmentAddDto.getRepairType().equals("Zdalna")) {
                expectedTimeTo = expectedTimeTo.plusHours(1);
            }
        }

        if (user.isRegularCustomer()) {
            BigDecimal expectedServiceCost = appointmentAddDto.getCost();
            double aDouble = expectedServiceCost.doubleValue();
            double finalPrice = (aDouble * 10) / 100;
            long round = Math.round(aDouble - finalPrice);

            appointmentAddDto.setCost(BigDecimal.valueOf(round));
        }

        Appointment appointment = AppointmentAddDto.prepareAppointment(
                appointmentAddDto.getDate(),
                appointmentAddDto.getFromTime(),
                LocalTime.of(expectedTimeTo.getHour(), expectedTimeTo.getMinute()),
                appointmentAddDto.getDescription(),
                appointmentAddDto.getRepairType(),
                appointmentAddDto.getPaymentType(),
                appointmentAddDto.getCost(),
                mechanicalService,
                user,
                car
        );

        Appointment savedAppointment = appointmentRepository.save(appointment);

        WorkingPeriod workingPeriodDateFrom = workingPeriodRepository.findByDateAndAvailable(appointmentDateTimeFrom, AppointmentAvailableStatus.WOLNE.name());

        WorkingPeriod workingPeriodDateTo;
        if (!mechanicalService.getName().startsWith("Diagnostyka")) {
            workingPeriodDateTo = workingPeriodRepository.findByDateAndAvailable(expectedTimeTo.minusMinutes(MINUTES_PERIOD), AppointmentAvailableStatus.WOLNE.name());
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
        return AppointmentId.of(appointment);
    }




    public record AppointmentId(String id) {
        public static AppointmentId of(Appointment appointment) {
            return new AppointmentId(appointment.getId());
        }
    }

    private Car getCar(String carId) {
        if (carId != null) {
            return carRepository.findById(carId).orElseThrow(() -> new CouldNotFindCarException(carId));
        }
        return null;
    }

    private LocalDateTime createDateTimeFrom(AppointmentAddDto appointmentAddDto) {
        return LocalDateTime.of(
                appointmentAddDto.getDate().getYear(),
                appointmentAddDto.getDate().getMonth(),
                appointmentAddDto.getDate().getDayOfMonth(),
                appointmentAddDto.getFromTime().getHour(),
                appointmentAddDto.getFromTime().getMinute()
        );
    }

    public void setToReservedWorkingPeriodByAppointment(Appointment appointment, WorkingPeriod workingPeriodDateFrom, WorkingPeriod workingPeriodDateTo) {
        List<WorkingPeriod> byDateBetween = workingPeriodRepository.findByDateBetween(workingPeriodDateFrom.getDate(), workingPeriodDateTo.getDate());
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
    public void completeAppointment(String id, String userId) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow();
        MechanicalService mechanicalService = appointment.getMechanicalService();
        User user = appointment.getUser();

        appointment.setRepairStatus("Wykonane");
        EmailCompleteAppointmentService.EmailCompleteAppointmentRequest emailCompleteAppointmentRequest = new EmailCompleteAppointmentService.EmailCompleteAppointmentRequest(appointment, user, mechanicalService, null);

        if (!appointment.getRepairType().equals("Zdalna")) {
            emailCompleteAppointmentService.sendConfirmationEmail(emailCompleteAppointmentRequest);
        } else {
            emailCompleteAppointmentService.sendConfirmationEmailRemote(emailCompleteAppointmentRequest);
        }
    }

    @Transactional
    public void setInProgressAppointment(String id, String userId) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow();
        appointment.setRepairStatus("W trakcie");
    }

    public AppointmentInfoDtoForEmployee getUserAppointment(String appointmentId, String userId) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow();
        User user = appointment.getUser();
        MechanicalService mechanicalService = appointment.getMechanicalService();
        Car car = appointment.getCar();
        return
                new AppointmentInfoDtoForEmployee(
                        appointment.getId(),
                        mechanicalService.getName(),
                        appointment.getDate(),
                        appointment.getFromTime(),
                        appointment.getToTime(),
                        appointment.getRepairType(),
                        appointment.getRepairStatus(),
                        appointment.getPaymentType(),
                        appointment.getPaymentStatus(),
                        appointment.getCost(),
                        appointment.getDescription(),
                        car != null ? car.getBrand() : null,
                        car != null ? car.getModel() : null,
                        car != null ? car.getYearProduction() : null,
                        car != null ? car.getEngineType() : null,
                        user.getEmail(),
                        user.getFirstName(),
                        user.getLastName());
    }

    public List<AppointmentInfoDtoForEmployee> getAllAppointmentsOfDay(AllAppointmentsOfDayDto allAppointmentsOfDayDto, String userId) {
        LocalDate dayOfWork = allAppointmentsOfDayDto.dayOfWork();

        List<AppointmentInfoDtoForEmployee> appointmentInfoDtoForEmployeeList = new ArrayList<>();

        List<Appointment> allByDate = appointmentRepository.findAllByDate(dayOfWork);

        if (allByDate != null) {
            allByDate
                    .forEach(appointment -> {
                                User user = appointment.getUser();
                                MechanicalService mechanicalService = appointment.getMechanicalService();
                                Car car = appointment.getCar();
                                appointmentInfoDtoForEmployeeList.add(
                                        new AppointmentInfoDtoForEmployee(
                                                appointment.getId(),
                                                mechanicalService.getName(),
                                                appointment.getDate(),
                                                appointment.getFromTime(),
                                                appointment.getToTime(),
                                                appointment.getRepairType(),
                                                appointment.getRepairStatus(),
                                                appointment.getPaymentType(),
                                                appointment.getPaymentStatus(),
                                                appointment.getCost(),
                                                appointment.getDescription(),
                                                car != null ? car.getBrand() : null,
                                                car != null ? car.getModel() : null,
                                                car != null ? car.getYearProduction() : null,
                                                car != null ? car.getEngineType() : null,
                                                user.getEmail(),
                                                user.getFirstName(),
                                                user.getLastName()
                                        )
                                );
                            }
                    );
        }
        return appointmentInfoDtoForEmployeeList;
    }

    @Transactional
    public List<AppointmentInfoDtoForUser> getUserAppointments(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindUserException(userId));
        Set<Appointment> appointments = user.getAppointments();
        List<AppointmentInfoDtoForUser> appointmentInfoDtoForUsers = new ArrayList<>();
        appointments.forEach(appointment -> {
            appointmentInfoDtoForUsers.add(
                    new AppointmentInfoDtoForUser(
                            appointment.getId(),
                            appointment.getMechanicalService().getName(),
                            appointment.getDate(),
                            appointment.getFromTime(),
                            appointment.getRepairType(),
                            appointment.getRepairStatus(),
                            appointment.getPaymentType(),
                            appointment.getPaymentStatus(),
                            appointment.getCost(),
                            appointment.getDescription(),
                            appointment.getCar() != null ? appointment.getCar().getBrand() : null,
                            appointment.getCar() != null ? appointment.getCar().getModel() : null
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
                    if (user.getRoles().contains(employeeRole) || user.getRoles().contains(adminRole)) {
                        usersWithSuperRole.add(user);
                    }
                });

        return usersWithSuperRole;
    }

    @Transactional
    public void payAppointment(String id, String userId) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow();
        appointment.setPaymentStatus("Opłacone");
    }

    public List<AppointmentInfoDtoForUser> getUserCarAppointments(String userId, String carId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CouldNotFindCarException(userId));
        Set<Appointment> userAppointments = user.getAppointments();

        List<AppointmentInfoDtoForUser> appointmentInfoDtoForUsers = new ArrayList<>();
        userAppointments
                .forEach(appointment -> {
                    if (appointment.getCar() != null) {
                        if (carId.equals(appointment.getCar().getId())) {
                            appointmentInfoDtoForUsers.add(
                                    new AppointmentInfoDtoForUser(
                                            appointment.getId(),
                                            appointment.getMechanicalService().getName(),
                                            appointment.getDate(),
                                            appointment.getFromTime(),
                                            appointment.getRepairType(),
                                            appointment.getRepairStatus(),
                                            appointment.getPaymentType(),
                                            appointment.getPaymentStatus(),
                                            appointment.getMechanicalService().getExpectedServiceCost(),
                                            appointment.getDescription(),
                                            appointment.getCar() != null ? appointment.getCar().getBrand() : null,
                                            appointment.getCar() != null ? appointment.getCar().getModel() : null
                                    ));
                        }
                    }
                });

        return appointmentInfoDtoForUsers;
    }
}
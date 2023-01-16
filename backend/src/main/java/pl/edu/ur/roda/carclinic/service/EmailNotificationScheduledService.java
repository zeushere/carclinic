package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.edu.ur.roda.carclinic.entity.Car;
import pl.edu.ur.roda.carclinic.entity.Role;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.exception.FileNoExistException;
import pl.edu.ur.roda.carclinic.properties.EmailSendNotificationProperties;
import pl.edu.ur.roda.carclinic.repostiory.CarRepository;
import pl.edu.ur.roda.carclinic.repostiory.RoleRepository;
import pl.edu.ur.roda.carclinic.repostiory.UserRepository;
import pl.edu.ur.roda.carclinic.util.filestorage.FileStorage;

import javax.mail.util.ByteArrayDataSource;
import javax.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

@Component
@RequiredArgsConstructor
@Slf4j
public class EmailNotificationScheduledService {

    private static final String IMG_HTML = "<p><img src='cid:image'></p>";

    private final EmailSendNotificationProperties emailSendNotificationProperties;
    private final JavaMailSender javaMailSender;
    private final CarRepository carRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final FileStorage fileStorage;

    @Scheduled(initialDelay = 60000, fixedRate = 86400000)
    @Transactional
    public void sendEmailNotification() {
        Map<Car, User> usersWithCars = getUsersWithCars();

        usersWithCars
                .forEach((car, user) -> {
                    LocalDateTime notificationSendDateByCar = carRepository.findNotificationSendDateByCar(car.getId());
                    if (notificationSendDateByCar == null || notificationSendDateByCar.isBefore(LocalDateTime.now().minusDays(3))) {
                        javaMailSender.send((mimeMessage -> {
                            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                            message.setTo(user.getEmail());
                            message.setSubject(emailSendNotificationProperties.getSubject());
                            EmailNotificationRequest emailNotificationRequest = EmailNotificationRequest.of(user, car);
                            log.info("Sending email notification to {} with subject {}", emailNotificationRequest.user().getEmail(), emailSendNotificationProperties.getSubject());
                            message.setText(loadTextMessage(emailNotificationRequest), true);
                            message.addInline("image", loadImage());
                            car.setNotificationSend(LocalDateTime.now());
                        }));
                    }
                });
    }

    private ByteArrayDataSource loadImage() throws IOException {
        return new ByteArrayDataSource(fileStorage.getFileBytes("backend/src/main/resources/files/email/email-oil-notification.png"), fileStorage.getFileType("backend/src/main/resources/files/email/email-oil-notification.png"));
    }

    private String loadTextMessage(EmailNotificationRequest emailNotificationRequest) {
        return getMessageFromFile(emailNotificationRequest.user().getFirstName(), emailNotificationRequest.car().getBrand(), emailNotificationRequest.car().getModel());
    }

    private String getMessageFromFile(
            String userName,
            String carBrand,
            String carModel) {
        StringBuilder stringBuilder = new StringBuilder();
        try (Scanner scanner = new Scanner(getFile())) {
            while (scanner.hasNextLine()) {
                stringBuilder.append(scanner.nextLine()).append("\n");
            }
        }
        String message = stringBuilder.toString();
        return String.format(message, userName, carBrand, carModel);
    }

    private InputStream getFile() {
        InputStream resource = getClass().getResourceAsStream(emailSendNotificationProperties.getPathToMessage());
        log.info("Getting email template file from properties: {}", emailSendNotificationProperties.getPathToMessage());
        if (resource == null)
            throw new FileNoExistException();
        return resource;
    }

    record EmailNotificationRequest(
            User user,
            Car car,
            String baseUrl) {

        static EmailNotificationScheduledService.EmailNotificationRequest of(User user, Car car) {
            return new EmailNotificationScheduledService.EmailNotificationRequest(
                    user,
                    car,
                    "http://localhost:3000/cars"
            );
        }
    }

    public Map<Car, User> getUsersWithCars() {
        List<User> usersWithRoleUser = getUsersWithRoleUser();
        Map<Car, User> userCarMap = new java.util.HashMap<>();

        usersWithRoleUser
                .forEach(user -> {
                    if (user.getCars() != null) {
                        ;
                        user.getCars()
                                .forEach(car -> userCarMap.put(car, user));
                    }
                });
        return userCarMap;
    }

    public List<User> getUsersWithRoleUser() {
        Role userRole = roleRepository.findByName("USER").get();
        Role adminRole = roleRepository.findByName("EMPLOYEE").get();
        Role employeeRole = roleRepository.findByName("ADMIN").get();

        List<User> usersWithUserRole = new ArrayList<>();
        userRepository.findAll()
                .forEach(user -> {
                    if (user.getRoles().contains(userRole) && !user.getRoles().contains(adminRole)
                            && !user.getRoles().contains(employeeRole)) {
                        usersWithUserRole.add(user);
                    }
                });

        return usersWithUserRole;
    }
}

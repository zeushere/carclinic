package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.entity.Appointment;
import pl.edu.ur.roda.carclinic.entity.Car;
import pl.edu.ur.roda.carclinic.entity.MechanicalService;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.exception.FileNoExistException;
import pl.edu.ur.roda.carclinic.properties.EmailAddAppointmentProperties;
import pl.edu.ur.roda.carclinic.util.filestorage.FileStorage;

import javax.mail.util.ByteArrayDataSource;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Scanner;

@Service
@EnableConfigurationProperties(EmailAddAppointmentProperties.class)
@RequiredArgsConstructor
@Slf4j
public class EmailAddAppointmentToUserService {

    private final EmailAddAppointmentProperties emailAddAppointmentProperties;
    private final JavaMailSender javaMailSender;
    private final FileStorage fileStorage;

    @Async
    public void sendConfirmationEmail(EmailAddAppointmentRequest emailAddAppointmentRequest) {
        javaMailSender.send((mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(emailAddAppointmentRequest.user.getEmail());
            message.setSubject(emailAddAppointmentProperties.getSubject());
            log.info("Sending confirmation email add appointment to {} with subject {}", emailAddAppointmentRequest.user.getEmail(), emailAddAppointmentProperties.getSubject());
            message.setText(loadTextMessage(emailAddAppointmentRequest), true);
            message.addInline("image", loadImage());
        }
        ));
    }

    private ByteArrayDataSource loadImage() throws IOException {
        return new ByteArrayDataSource(fileStorage.getFileBytes("backend/src/main/resources/files/email/email-add-appointment.png"), fileStorage.getFileType("backend/src/main/resources/files/email/email-add-appointment.png"));
    }

    private String loadTextMessage(EmailAddAppointmentRequest emailAddAppointmentRequest) {
        return getMessageFromFile(emailAddAppointmentRequest.user().getFirstName(), emailAddAppointmentRequest.mechanicalService().getName(), emailAddAppointmentRequest.appointment().getDate(), emailAddAppointmentRequest.appointment().getFromTime(), emailAddAppointmentRequest.appointment().getPaymentType(), emailAddAppointmentRequest.appointment().getRepairType());
    }

    private String getMessageFromFile(
            String userName,
            String mechanicalService,
            LocalDate appointmentDate,
            LocalTime appointmentTime,
            String paymentType,
            String repairType) {
        StringBuilder stringBuilder = new StringBuilder();
        try (Scanner scanner = new Scanner(getFile())) {
            while (scanner.hasNextLine()) {
                stringBuilder.append(scanner.nextLine()).append("\n");
            }
        }
        String message = stringBuilder.toString();

        return String.format(message, userName, mechanicalService, appointmentDate, appointmentTime, paymentType, repairType);
    }

    private InputStream getFile() {
        InputStream resource = getClass().getResourceAsStream(emailAddAppointmentProperties.getPathToMessage());
        log.info("Getting email template file from  properties: {}", emailAddAppointmentProperties.getPathToMessage());
        if (resource == null)
            throw new FileNoExistException();
        return resource;
    }

    record EmailAddAppointmentRequest(Appointment appointment,
                                      User user,
                                      Car car,
                                      MechanicalService mechanicalService) {

        static EmailAddAppointmentToUserService.EmailAddAppointmentRequest of(Appointment appointment, User user, Car car, MechanicalService mechanicalService) {
            return new EmailAddAppointmentToUserService.EmailAddAppointmentRequest(
                    appointment,
                    user,
                    car,
                    mechanicalService
            );
        }
    }
}

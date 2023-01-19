package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.edu.ur.roda.carclinic.entity.Appointment;
import pl.edu.ur.roda.carclinic.entity.MechanicalService;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.exception.FileNoExistException;
import pl.edu.ur.roda.carclinic.properties.EmailCancelAppointmentProperties;
import pl.edu.ur.roda.carclinic.util.filestorage.FileStorage;

import javax.mail.util.ByteArrayDataSource;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Scanner;

@Service
@EnableConfigurationProperties({EmailCancelAppointmentProperties.class})
@RequiredArgsConstructor
@Slf4j
public class EmailCancelAppointmentService {
    private final EmailCancelAppointmentProperties emailCancelAppointmentProperties;
    private final JavaMailSender javaMailSender;
    private final FileStorage fileStorage;

    @Async
    public void sendConfirmationEmail(EmailCancelAppointmentRequest emailCancelAppointmentRequest) {
        javaMailSender.send((mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(emailCancelAppointmentRequest.user.getEmail());
            message.setSubject(emailCancelAppointmentProperties.getSubject());
            log.info("Sending confirmation email cancel appointment to {} with subject {}", emailCancelAppointmentRequest.user().getEmail(), emailCancelAppointmentProperties.getSubject());
            message.setText(loadTextMessage(emailCancelAppointmentRequest), true);
            message.addInline("image", loadImage());
        }));
    }

    private ByteArrayDataSource loadImage() throws IOException {
        return new ByteArrayDataSource(fileStorage.getFileBytes("backend/src/main/resources/files/email/email-cancelled.pngs"), fileStorage.getFileType("backend/src/main/resources/files/email/email-cancelled.png"));
    }

    private ByteArrayDataSource loadImage(MultipartFile image) throws IOException {
        return new ByteArrayDataSource(image.getBytes(), image.getContentType());
    }

    private String loadTextMessage(EmailCancelAppointmentRequest emailCancelAppointmentRequest) {
        return getMessageFromFile(emailCancelAppointmentRequest.user().getFirstName(), emailCancelAppointmentRequest.mechanicalService().getName(), emailCancelAppointmentRequest.appointment().getDate(), emailCancelAppointmentRequest.appointment().getFromTime());
    }


    private String getMessageFromFile(
            String userName,
            String mechanicalService,
            LocalDate appointmentDate,
            LocalTime appointmentTime) {
        StringBuilder stringBuilder = new StringBuilder();
        try (Scanner scanner = new Scanner(getFile())) {
            while (scanner.hasNextLine()) {
                stringBuilder.append(scanner.nextLine()).append("\n");
            }
        }
        String message = stringBuilder.toString();

        return String.format(message, userName, mechanicalService, appointmentDate, appointmentTime);
    }


    private InputStream getFile() {
        InputStream resource = getClass().getResourceAsStream(emailCancelAppointmentProperties.getPathToMessage());
        log.info("Getting email template file from  properties: {}", emailCancelAppointmentProperties.getPathToMessage());
        if (resource == null)
            throw new FileNoExistException();
        return resource;
    }

    record EmailCancelAppointmentRequest(Appointment appointment,
                                         User user,
                                         MechanicalService mechanicalService) {

        static EmailCancelAppointmentRequest of(Appointment appointment, User user, MechanicalService mechanicalService) {
            return new EmailCancelAppointmentRequest(
                    appointment,
                    user,
                    mechanicalService
            );
        }
    }
}

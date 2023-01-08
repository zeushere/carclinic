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
import pl.edu.ur.roda.carclinic.entity.Car;
import pl.edu.ur.roda.carclinic.entity.MechanicalService;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.exception.FileNoExistException;
import pl.edu.ur.roda.carclinic.properties.EmailAddAppointmentProperties;

import javax.mail.util.ByteArrayDataSource;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Locale;
import java.util.Scanner;

@Service
@EnableConfigurationProperties(EmailAddAppointmentProperties.class)
@RequiredArgsConstructor
@Slf4j
public class EmailAddAppointmentToUserService {

    private static final String IMG_HTML = "<p><img src='cid:image'></p>";
    private final EmailAddAppointmentProperties emailAddAppointmentProperties;
    private final JavaMailSender javaMailSender;

    @Async
    public void sendConfirmationEmail(EmailAddAppointmentRequest emailAddAppointmentRequest) {
        javaMailSender.send((mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(emailAddAppointmentRequest.user.getEmail());
            message.setSubject(emailAddAppointmentProperties.getSubject());
            log.info("Sending confirmation email add appointment to {} with subject {}", emailAddAppointmentRequest.user.getEmail(), emailAddAppointmentProperties.getSubject());
            message.setText(loadTextMessage(emailAddAppointmentRequest), true);
            if (emailAddAppointmentRequest.image() != null && !emailAddAppointmentRequest.image().isEmpty()) {
                message.addInline("image", loadImage(emailAddAppointmentRequest.image()));
            }
        }
        ));
    }

    private ByteArrayDataSource loadImage(MultipartFile image) throws IOException {
        return new ByteArrayDataSource(image.getBytes(), image.getContentType());
    }

    private String loadTextMessage(EmailAddAppointmentRequest emailAddAppointmentRequest) {
        if (emailAddAppointmentRequest.image() != null && !emailAddAppointmentRequest.image().isEmpty()) {
//            return getMessageFromFile(emailErrorReportRequest.emailReporter(), emailErrorReportRequest.errorReportTitle(), emailErrorReportRequest.errorReportDescription() + IMG_HTML, emailErrorReportRequest.errorReportId());
        return null;
        } else {
            return getMessageFromFile(emailAddAppointmentRequest.user().getFirstName(), emailAddAppointmentRequest.mechanicalService().getName(), emailAddAppointmentRequest.appointment().getDate(), emailAddAppointmentRequest.appointment().getFromTime(), emailAddAppointmentRequest.appointment().getPaymentType());
        }
    }

    private String getMessageFromFile(
            String userName,
            String mechanicalService,
            LocalDate appointmentDate,
            LocalTime appointmentTime,
            String paymentType) {
        StringBuilder stringBuilder = new StringBuilder();
        try (Scanner scanner = new Scanner(getFile())) {
            while (scanner.hasNextLine()) {
                stringBuilder.append(scanner.nextLine() + "\n");
            }
        }
        String message = stringBuilder.toString();

        return String.format(message,userName, mechanicalService, appointmentDate, appointmentTime, paymentType);
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
                                   MechanicalService mechanicalService,
                                   MultipartFile image) {

        static EmailAddAppointmentToUserService.EmailAddAppointmentRequest of(Appointment appointment, User user, Car car, MechanicalService mechanicalService, MultipartFile image) {
            return new EmailAddAppointmentToUserService.EmailAddAppointmentRequest(
                    appointment,
                    user,
                    car,
                    mechanicalService,
                    image
            );
        }
    }
}

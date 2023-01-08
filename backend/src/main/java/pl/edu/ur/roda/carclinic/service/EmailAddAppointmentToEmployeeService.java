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
import pl.edu.ur.roda.carclinic.properties.EmailAddAppointmentToEmployeeProperties;

import javax.mail.util.ByteArrayDataSource;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Scanner;

@Service
@EnableConfigurationProperties(EmailAddAppointmentToEmployeeProperties.class)
@RequiredArgsConstructor
@Slf4j
public class EmailAddAppointmentToEmployeeService {

    private static final String IMG_HTML = "<p><img src='cid:image'></p>";
    private final EmailAddAppointmentToEmployeeProperties emailAddAppointmentToEmployeeProperties;
    private final JavaMailSender javaMailSender;

    @Async
    public void sendConfirmationEmail(EmailAddAppointmentRequestToEmployee emailAddAppointmentRequestToEmployee) {
        javaMailSender.send((mimeMessage -> {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            message.setTo(emailAddAppointmentRequestToEmployee.user.getEmail());
            message.setSubject(emailAddAppointmentToEmployeeProperties.getSubject());
            log.info("Sending confirmation email add appointment to {} with subject {}", emailAddAppointmentRequestToEmployee.user().getEmail(), emailAddAppointmentToEmployeeProperties.getSubject());
            message.setText(loadTextMessage(emailAddAppointmentRequestToEmployee), true);
            if (emailAddAppointmentRequestToEmployee.image() != null && !emailAddAppointmentRequestToEmployee.image().isEmpty()) {
                message.addInline("image", loadImage(emailAddAppointmentRequestToEmployee.image()));
            }
        }
        ));
    }

    private ByteArrayDataSource loadImage(MultipartFile image) throws IOException {
        return new ByteArrayDataSource(image.getBytes(), image.getContentType());
    }

    private String loadTextMessage(EmailAddAppointmentRequestToEmployee emailAddAppointmentRequestToEmployee) {
        if (emailAddAppointmentRequestToEmployee.image() != null && !emailAddAppointmentRequestToEmployee.image().isEmpty()) {
//            return getMessageFromFile(emailErrorReportRequest.emailReporter(), emailErrorReportRequest.errorReportTitle(), emailErrorReportRequest.errorReportDescription() + IMG_HTML, emailErrorReportRequest.errorReportId());
            return null;
        } else {
            return getMessageFromFile(emailAddAppointmentRequestToEmployee.user().getFirstName(),emailAddAppointmentRequestToEmployee.sendingUser().getEmail(), emailAddAppointmentRequestToEmployee.mechanicalService().getName(), emailAddAppointmentRequestToEmployee.appointment().getDate(), emailAddAppointmentRequestToEmployee.appointment().getFromTime(), emailAddAppointmentRequestToEmployee.appointment().getPaymentType());
        }
    }

    private String getMessageFromFile(
            String userName,
            String sendingUserEmail,
            String mechanicalService,
            LocalDate appointmentDate,
            LocalTime appointmentTime,
            String paymentType) {
        StringBuilder stringBuilder = new StringBuilder();
        try (Scanner scanner = new Scanner(getFile())) {
            while (scanner.hasNextLine()) {
                stringBuilder.append(scanner.nextLine()).append("\n");
            }
        }
        String message = stringBuilder.toString();
        return String.format(message, userName, sendingUserEmail, mechanicalService, appointmentDate, appointmentTime, paymentType);
    }

    private InputStream getFile() {
        InputStream resource = getClass().getResourceAsStream(emailAddAppointmentToEmployeeProperties.getPathToMessage());
        log.info("Getting email template file from  properties: {}", emailAddAppointmentToEmployeeProperties.getPathToMessage());
        if (resource == null)
            throw new FileNoExistException();
        return resource;
    }

    record EmailAddAppointmentRequestToEmployee(User sendingUser, Appointment appointment,
                                                User user,
                                                Car car,
                                                pl.edu.ur.roda.carclinic.entity.MechanicalService mechanicalService,
                                                MultipartFile image) {


        static EmailAddAppointmentToEmployeeService.EmailAddAppointmentRequestToEmployee of(User sendingUser, Appointment appointment, User user, Car car, MechanicalService mechanicalService, MultipartFile image) {
            return new EmailAddAppointmentToEmployeeService.EmailAddAppointmentRequestToEmployee(
                    sendingUser,
                    appointment,
                    user,
                    car,
                    mechanicalService,
                    image
            );
        }
    }
}
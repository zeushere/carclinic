package pl.edu.ur.roda.carclinic.util.MailSender;

import javax.activation.DataSource;
import java.util.Map;

public record MailDto(
        String mailTo,
        String mailSubject,
        String pathToTemplateMessage,
        Map<String, Object> variables,
        Map<String, DataSource> contentsId
) {

    public static MailDto of(String mailTo, String mailSubject, String pathToTemplateMessage) {
        return new MailDto(mailTo, mailSubject, pathToTemplateMessage, null, null);
    }

    public static MailDto of(String mailTo, String mailSubject, String pathToTemplateMessage, Map<String, Object> variables) {
        return new MailDto(mailTo, mailSubject, pathToTemplateMessage, variables, null);
    }
}

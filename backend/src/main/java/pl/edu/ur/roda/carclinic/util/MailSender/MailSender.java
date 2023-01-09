package pl.edu.ur.roda.carclinic.util.MailSender;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;

import javax.activation.DataSource;
import javax.mail.MessagingException;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Component
public class MailSender {

    private final JavaMailSender javaMailSender;
    private final MailTemplateRepository mailTemplateRepository;

    public void sendMessage(MailDto mailDto) {
        try {
            MimeMessagePreparator mimeMessage = createMimeMessage(mailDto);
            javaMailSender.send(mimeMessage);
        } catch (MailException e) {
            log.error("Failed to process email sending: " + e.getMessage());
        }
    }

    private MimeMessagePreparator createMimeMessage(MailDto mailTo) {
        return mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            messageHelper.setTo(mailTo.mailTo());
            messageHelper.setSubject(mailTo.mailSubject());
            messageHelper.setText(buildMessageWithVariables(mailTo.pathToTemplateMessage(), mailTo.variables()), true);
            fillContextIds(messageHelper, mailTo.contentsId());
        };
    }

    private String buildMessageWithVariables(String pathToTemplateMessage, Map<String, Object> variables) {
        if(mapIsExist(variables)) {
            Context context = new Context();
            context.setVariables(variables);
            return mailTemplateRepository.findTemplateMessageAndFillContext(pathToTemplateMessage, context);
        }
        else {
            return mailTemplateRepository.findMessage(pathToTemplateMessage);
        }
    }

    private void fillContextIds(MimeMessageHelper messageHelper, Map<String, DataSource> contextIds) throws MessagingException {
        if(mapIsExist(contextIds)) {
            for(Map.Entry<String, DataSource> entry : contextIds.entrySet()) {
                messageHelper.addInline(entry.getKey(), entry.getValue());
            }
        }
    }

    private boolean mapIsExist(Map map) {
        return map != null && !map.isEmpty();
    }
}


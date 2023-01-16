package pl.edu.ur.roda.carclinic.util;

import com.auth0.jwt.exceptions.TokenExpiredException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import pl.edu.ur.roda.carclinic.dto.ErrorMessageDto;
import pl.edu.ur.roda.carclinic.exception.CaptchaValidationException;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindBlogException;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindCarException;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindUserException;
import pl.edu.ur.roda.carclinic.exception.FileNoExistException;
import pl.edu.ur.roda.carclinic.exception.UnauthorizedProcessException;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Path;
import java.util.*;
import java.util.stream.Collectors;

@ControllerAdvice
public class ControllerHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException exception) {
        Map<String, String> errors = exception.getBindingResult().getAllErrors().stream()
                .map(error -> {
                    String fieldName = ((FieldError) error).getField();
                    String errorMessage = error.getDefaultMessage();
                    return new AbstractMap.SimpleEntry<>(fieldName, errorMessage);
                }).collect(Collectors.toMap(AbstractMap.SimpleEntry::getKey, AbstractMap.SimpleEntry::getValue));
        return new ResponseEntity<>(errors, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<Map<String, String>> handleRequestPartExceptions(MissingServletRequestParameterException ex) {
        Map<String, String> errors = getErrors(ex.getParameterName(), ex.getMessage());
        return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CaptchaValidationException.class)
    public ResponseEntity<ErrorMessageDto> handleCaptchaValidation(CaptchaValidationException exception) {
        return new ResponseEntity<>(new ErrorMessageDto(exception.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FileNoExistException.class)
    public ResponseEntity<?> handleFileNoExist() {
        return ResponseEntity.internalServerError().build();
    }

    @ExceptionHandler(UnauthorizedProcessException.class)
    public ResponseEntity<?> handleUnauthorizedDeletePlayer() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, String>> handleConstraintViolationExceptions(ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        Set<ConstraintViolation<?>> constraintViolationSet = ex.getConstraintViolations();
        constraintViolationSet.forEach(constraintViolation -> {
            LinkedList<String> path = new LinkedList<>();
            for (Path.Node node : constraintViolation.getPropertyPath()) {
                path.add(node.getName());
            }
            String errorMessage = constraintViolation.getMessage();
            errors.put(path.getLast(), errorMessage);
        });
        return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<ErrorMessageDto> tokenExpired(TokenExpiredException ex) {
        return new ResponseEntity<>(new ErrorMessageDto(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestPartException.class)
    public ResponseEntity<Map<String, String>> handleMissingServletRequestPartExceptions(MissingServletRequestPartException ex) {
        Map<String, String> errors = getErrors(ex.getRequestPartName(), ex.getMessage());
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CouldNotFindUserException.class)
    public ResponseEntity<ErrorMessageDto> handleUserNotFoundException(CouldNotFindUserException exception) {
        return new ResponseEntity<>(new ErrorMessageDto(exception.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CouldNotFindBlogException.class)
    public ResponseEntity<ErrorMessageDto> handleColdNotFindBlogException(CouldNotFindUserException exception) {
        return new ResponseEntity<>(new ErrorMessageDto(exception.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CouldNotFindCarException.class)
    public ResponseEntity<ErrorMessageDto> handleCarNotFoundException(CouldNotFindCarException exception) {
        return new ResponseEntity<>(new ErrorMessageDto(exception.getMessage()), HttpStatus.NOT_FOUND);
    }

    private Map<String, String> getErrors(String fieldName, String errorMessage) {
        Map<String, String> errors = new HashMap<>();
        errors.put(fieldName, errorMessage);
        return errors;
    }
}

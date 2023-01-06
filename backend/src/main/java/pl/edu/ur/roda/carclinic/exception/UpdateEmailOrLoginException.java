package pl.edu.ur.roda.carclinic.exception;

public class UpdateEmailOrLoginException extends RuntimeException {

    public UpdateEmailOrLoginException(String fieldName) {
        super("This " + fieldName + " already exists. Enter a new " + fieldName + ".");
    }

}

package pl.edu.ur.roda.carclinic.exception;

public class CouldNotFindUserException extends RuntimeException {

    public CouldNotFindUserException(String ownerId) {
        super("Could not find user with id: " + ownerId);
    }
}

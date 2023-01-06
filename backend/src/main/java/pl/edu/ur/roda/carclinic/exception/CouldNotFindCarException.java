package pl.edu.ur.roda.carclinic.exception;

public class CouldNotFindCarException extends RuntimeException{
    public CouldNotFindCarException(String carId) {
        super("Could not find car with id: " + carId);
    }

}

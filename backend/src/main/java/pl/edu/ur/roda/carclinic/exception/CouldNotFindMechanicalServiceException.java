package pl.edu.ur.roda.carclinic.exception;

public class CouldNotFindMechanicalServiceException extends RuntimeException{

        public CouldNotFindMechanicalServiceException(Long mechanicalServiceId) {
            super("Could not find mechanical service with id: " + mechanicalServiceId);
        }
    }

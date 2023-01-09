package pl.edu.ur.roda.carclinic.exception;

public class CouldNotCancelPastAppointment extends RuntimeException {
        public CouldNotCancelPastAppointment() {
            super("Could not cancel past appointment");
        }
    }
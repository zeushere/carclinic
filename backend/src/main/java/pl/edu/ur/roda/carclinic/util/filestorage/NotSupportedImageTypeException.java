package pl.edu.ur.roda.carclinic.util.filestorage;

public class NotSupportedImageTypeException extends RuntimeException {

    NotSupportedImageTypeException(String contentType) {
        super("Not supported image type " + contentType);
    }
}
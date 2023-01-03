package pl.edu.ur.roda.carclinic.util.filestorage;

public class CouldNotSaveFileException extends RuntimeException {

    public CouldNotSaveFileException(String filename) {
        super("Could not save file " + filename);
    }
}
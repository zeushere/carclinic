package pl.edu.ur.roda.carclinic.exception;

public class CouldNotFindBlogException extends RuntimeException {

    public CouldNotFindBlogException(Long blogId) {
        super("Could not find blog with id: " + blogId);
    }
}
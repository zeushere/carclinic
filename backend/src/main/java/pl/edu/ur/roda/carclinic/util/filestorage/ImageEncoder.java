package pl.edu.ur.roda.carclinic.util.filestorage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class ImageEncoder {

    private final FileStorage fileStorage;

    public String encodeImageToBase64(String path) throws IOException {
        byte[] image = fileStorage.getFileBytes(path);
        String imageType = fileStorage.getFileType(path);

        log.info("Encoding image {} to String using Base64", path);
        String encodedPhoto = Base64.getEncoder().encodeToString(image);
        return "data:" + imageType + ";base64," + encodedPhoto;
    }
    public Optional<String> loadImage(String path) {
        return Optional.ofNullable(path).map((p) -> {
            try {
                return encodeImageToBase64(p);
            } catch (IOException e) {
                log.info("Could not find image {}", path);
            }
            return null;
        });
    }

}
package pl.edu.ur.roda.carclinic.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.ur.roda.carclinic.entity.Blog;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlogInfoDto {
    Long id;
    String title;
    String author;
    String article;
    LocalDateTime creationDate;
    String image;
}

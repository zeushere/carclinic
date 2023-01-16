package pl.edu.ur.roda.carclinic.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "blog")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_blog")
    @SequenceGenerator(
            name = "seq_blog",
            sequenceName = "seq_blog",
            allocationSize = 1
    )
    private Long id;
    private String author;
    private String title;
    private String article;
    private LocalDateTime creationDate;
    private String imagePath;

    public Blog(String author, String title, String article, String imagePath) {
        this.author = author;
        this.title = title;
        this.article = article;
        this.creationDate = LocalDateTime.now();
        this.imagePath = imagePath;
    }
}

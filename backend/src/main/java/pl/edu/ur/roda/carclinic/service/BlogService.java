package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.edu.ur.roda.carclinic.dto.BlogAddDto;
import pl.edu.ur.roda.carclinic.dto.BlogInfoDto;
import pl.edu.ur.roda.carclinic.entity.Blog;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindBlogException;
import pl.edu.ur.roda.carclinic.repostiory.BlogRepository;
import pl.edu.ur.roda.carclinic.util.filestorage.FileStorage;
import pl.edu.ur.roda.carclinic.util.filestorage.ImageEncoder;

import javax.transaction.Transactional;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;
    private final ImageEncoder imageEncoder;
    private final FileStorage fileStorage;
    @Value("${blog.images-path}")
    private String directoryPath;

    public List<BlogInfoDto> getBlogs() {
        return blogRepository.findAll()
                .stream().map(blog -> {
                    return new BlogInfoDto(
                            blog.getId(),
                            blog.getTitle(),
                            blog.getAuthor(),
                            blog.getArticle(),
                            blog.getCreationDate().truncatedTo(ChronoUnit.MINUTES),
                            imageEncoder.loadImage(blog.getImagePath() != null ? blog.getImagePath() : null).orElse(null)
                    );
                }).collect(Collectors.toList());
    }

    public BlogInfoDto getBlogById(Long id) {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> new CouldNotFindBlogException(id));

        return new BlogInfoDto(
                blog.getId(),
                blog.getTitle(),
                blog.getAuthor(),
                blog.getArticle(),
                blog.getCreationDate().truncatedTo(ChronoUnit.MINUTES),
                imageEncoder.loadImage(blog.getImagePath() != null ? blog.getImagePath() : null).orElse(null)
        );
    }

    public void deleteBlogById(Long id) {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> new CouldNotFindBlogException(id));
        blogRepository.delete(blog);
    }

    @Transactional
    public BlogInfoDto updateBlog(Long id, BlogAddDto blogAddDto) {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> new CouldNotFindBlogException(id));

        blog.setAuthor(blogAddDto.author());
        blog.setTitle(blogAddDto.title());
        blog.setArticle(blogAddDto.article());

        return new BlogInfoDto(
                blog.getId(),
                blog.getTitle(),
                blog.getAuthor(),
                blog.getArticle(),
                blog.getCreationDate(),
                imageEncoder.loadImage(blog.getImagePath() != null ? blog.getImagePath() : null).orElse(null)
        );
    }


    @Transactional
    public void addImageToBlog(MultipartFile image, Long id) {
            Blog blog = blogRepository.findById(id).orElseThrow(() -> new CouldNotFindBlogException(id));
            String imagePath = fileStorage.saveImage(image, directoryPath);
            blog.setImagePath(imagePath);
    }

    public AddedBlogId addBlog(BlogAddDto blogAddDto) {

        Blog blog = new Blog(blogAddDto.author(), blogAddDto.title(), blogAddDto.article(), null);
        Blog savedBlog = blogRepository.save(blog);
        return new AddedBlogId(savedBlog.getId());
    }

    public record AddedBlogId(Long id) {
    }
}
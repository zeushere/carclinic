package pl.edu.ur.roda.carclinic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pl.edu.ur.roda.carclinic.dto.BlogAddDto;
import pl.edu.ur.roda.carclinic.dto.BlogInfoDto;
import pl.edu.ur.roda.carclinic.dto.CarRequest;
import pl.edu.ur.roda.carclinic.service.BlogService;
import pl.edu.ur.roda.carclinic.service.CarService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/blog")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @GetMapping
    public List<BlogInfoDto> getBlogs() {
        return blogService.getBlogs();
    }

    @GetMapping("{id}")
    public BlogInfoDto getBlogById(
            @PathVariable Long id) {
        return blogService.getBlogById(id);
    }

    @DeleteMapping("{id}/delete")
    public void deleteBlogById(
            @PathVariable Long id) {
        blogService.deleteBlogById(id);
    }

    @PutMapping("{id}/update")
    public BlogInfoDto updateBlog(
            @PathVariable Long id,
            @RequestBody BlogAddDto blogAddDto
    ) {
        return blogService.updateBlog(id, blogAddDto);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    BlogService.AddedBlogId addBlog(
            @RequestBody @Valid BlogAddDto blogAddDto) {
        return blogService.addBlog(blogAddDto);
    }

    @PostMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    void addImageToBlog(
            @RequestPart("image") MultipartFile image,
            @PathVariable Long id
    ) {
        blogService.addImageToBlog(image, id);
    }
}

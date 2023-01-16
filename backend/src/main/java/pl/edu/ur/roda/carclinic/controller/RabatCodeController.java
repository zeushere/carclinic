package pl.edu.ur.roda.carclinic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.ur.roda.carclinic.dto.RabatCodeDiscount;
import pl.edu.ur.roda.carclinic.dto.RabatCodeDto;
import pl.edu.ur.roda.carclinic.entity.RabatCode;
import pl.edu.ur.roda.carclinic.service.RabatCodeService;

import java.util.List;

@RestController
@RequestMapping("/rabat-code")
@RequiredArgsConstructor
public class RabatCodeController {

    private final RabatCodeService rabatCodeService;

    @GetMapping("{code}")
    RabatCodeDiscount getRabatCodeDiscount(
            @PathVariable String code
    ) {
        return rabatCodeService.getRabatCodeDiscount(code);
    }

    @PostMapping
    Long addRabatCode(@RequestBody RabatCodeDto rabatCodeDto) {
        return rabatCodeService.addRabatCode(rabatCodeDto);
    }

    @DeleteMapping("{id}")
    void deleteRabatCode(
            @PathVariable Long id
    ) {
        rabatCodeService.deleteRabatCode(id);
    }

    @PutMapping("{id}")
    public RabatCodeDto editRabatCode(
            @PathVariable Long id,
            @RequestBody RabatCodeDto rabatCodeDto) {
        return rabatCodeService.editRabatCode(id, rabatCodeDto);
    }

    @GetMapping
    List<RabatCode> getRabatCodes() {
        return rabatCodeService.getRabatCodes();
    }

    @GetMapping("/details/{id}")
    RabatCode getRabatCode(
            @PathVariable Long id
    ) {
        return rabatCodeService.getRabatCode(id);
    }
}

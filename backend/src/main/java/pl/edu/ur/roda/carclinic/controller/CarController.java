package pl.edu.ur.roda.carclinic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.edu.ur.roda.carclinic.dto.CarInfoDto;
import pl.edu.ur.roda.carclinic.dto.CarRequest;
import pl.edu.ur.roda.carclinic.service.CarService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService carService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    CarService.AddedCarId addCar(
            @RequestPart("carRequest") @Valid CarRequest carRequest,
            @RequestPart(name = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal String userId) {
        return carService.addCar(carRequest, image, userId);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    List<CarInfoDto> getUserCars(
            @AuthenticationPrincipal String ownerId
    ) {
        return carService.getCars(ownerId);
    }

    //test
}

package pl.edu.ur.roda.carclinic.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    @PostMapping("{carId}")
    @ResponseStatus(HttpStatus.OK)
    void addImageToCar(
            @RequestPart("image") MultipartFile image,
            @PathVariable String carId,
            @AuthenticationPrincipal String ownerId
    ) {
        carService.addImageToCar(image, carId, ownerId);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    CarService.AddedCarId addCar(
            @RequestBody @Valid CarRequest carRequest,
            @AuthenticationPrincipal String userId) {
        return carService.addCar(carRequest, userId);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    List<CarInfoDto> getUserCars(
            @AuthenticationPrincipal String ownerId
    ) {
        return carService.getCars(ownerId);
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    CarInfoDto getUserCar(
            @PathVariable String id,
            @AuthenticationPrincipal String ownerId
    ) {
        return carService.getCar(id, ownerId);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteCar(
            @PathVariable String id,
            @AuthenticationPrincipal String ownerId
    ) {
        carService.deleteCar(id, ownerId);
    }
}

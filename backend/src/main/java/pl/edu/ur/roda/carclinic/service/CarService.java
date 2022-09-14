package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.edu.ur.roda.carclinic.dto.CarAddDto;
import pl.edu.ur.roda.carclinic.dto.CarRequest;
import pl.edu.ur.roda.carclinic.entity.Car;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindUserException;
import pl.edu.ur.roda.carclinic.repostiory.CarRepository;
import pl.edu.ur.roda.carclinic.repostiory.UserRepository;

@Service
@RequiredArgsConstructor

public class CarService {

    private final CarRepository carRepository;
    private final UserRepository userRepository;

    public AddedCarId addCar(
            CarRequest carRequest,
            MultipartFile image,
            String ownerId
    ) {

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new CouldNotFindUserException(ownerId));

        CarAddDto carAddDto = CarAddDto.of(carRequest, null, ownerId);

        Car car = CarAddDto.prepareCar(carAddDto, owner);

        Car savedCar = carRepository.save(car);

        return new AddedCarId(savedCar.getId());
    }

    public record AddedCarId(String id) {
    }
}

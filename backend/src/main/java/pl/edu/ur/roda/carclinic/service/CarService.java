package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.edu.ur.roda.carclinic.dto.CarAddDto;
import pl.edu.ur.roda.carclinic.dto.CarInfoDto;
import pl.edu.ur.roda.carclinic.dto.CarRequest;
import pl.edu.ur.roda.carclinic.entity.Car;
import pl.edu.ur.roda.carclinic.entity.User;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindCarException;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindUserException;
import pl.edu.ur.roda.carclinic.mapper.CarInfoDtoCarMapper;
import pl.edu.ur.roda.carclinic.repostiory.CarRepository;
import pl.edu.ur.roda.carclinic.repostiory.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor

public class CarService {

    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final CarInfoDtoCarMapper carInfoDtoCarMapper;

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

    public List<CarInfoDto> getCars(String ownerId){
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new CouldNotFindUserException(ownerId));

        List<Car> carsByOwner = carRepository.findCarsByOwner(owner);

        return carsByOwner
                .stream()
                .map(carInfoDtoCarMapper::carToCarInfoDto)
                .toList();
    }

    public CarInfoDto getCar(String carId, String ownerId){
        Car car = carRepository.findById(carId).orElseThrow(() -> new CouldNotFindCarException(carId));
        return carInfoDtoCarMapper.carToCarInfoDto(car);
    }

    public record AddedCarId(String id) {
    }
}

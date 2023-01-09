package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
import pl.edu.ur.roda.carclinic.util.filestorage.FileStorage;
import pl.edu.ur.roda.carclinic.util.filestorage.ImageEncoder;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {

    public static AddedCarId carIdToAddImage = null;
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final CarInfoDtoCarMapper carInfoDtoCarMapper;
    private final FileStorage fileStorage;
    private final ImageEncoder imageEncoder;

    @Value("${errorreports.images-path}")
    private String directoryPath;

    @Transactional
    public void addImageToCar(MultipartFile image, String carId, String ownerId) {
        if(carIdToAddImage != null) {
            Car car = carRepository.findById(carIdToAddImage.id()).orElseThrow(() -> new CouldNotFindCarException(carIdToAddImage.id()));
            String imagePath = fileStorage.saveImage(image, directoryPath);
            car.setImagePath(imagePath);
        }
    }

    public AddedCarId addCar(
            CarRequest carRequest,
            String ownerId
    ) {

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new CouldNotFindUserException(ownerId));


        CarAddDto carAddDto = CarAddDto.of(carRequest, null, ownerId);

        Car car = CarAddDto.prepareCar(carAddDto, owner);

        Car savedCar = carRepository.save(car);

        AddedCarId addedCarId = new AddedCarId(savedCar.getId());
        carIdToAddImage = addedCarId;

        return addedCarId;
    }

    public List<CarInfoDto> getCars(String ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new CouldNotFindUserException(ownerId));

        List<Car> carsByOwner = carRepository.findCarsByOwner(owner);

        List<CarInfoDto> carInfoDtoList = carsByOwner
                .stream()
                .map(carInfoDtoCarMapper::carToCarInfoDto)
                .toList();

        carsByOwner
                .forEach(car -> {
                            if (car.getImagePath() != null) {
                                CarInfoDto carInfoDtoToSetImage = carInfoDtoList.stream()
                                        .filter(carInfoDto -> carInfoDto.getId().equals(car.getId()))
                                        .findFirst()
                                        .orElseThrow(() -> new CouldNotFindCarException(car.getId()));
                                carInfoDtoToSetImage.setImage(
                                        imageEncoder.loadImage(
                                                        car.getImagePath())
                                                .orElse(null));
                            }
                        }
                );
        return carInfoDtoList;
    }

    public CarInfoDto getCar(String carId, String ownerId) {
        Car car = carRepository.findById(carId).orElseThrow(() -> new CouldNotFindCarException(carId));
        CarInfoDto carInfoDto = carInfoDtoCarMapper.carToCarInfoDto(car);
        if (car.getImagePath() != null) {
            carInfoDto.setImage(imageEncoder.loadImage(car.getImagePath()).orElse(null));
        }
        return carInfoDto;
    }

    public void deleteCar(String carId, String ownerId) {
        Car car = carRepository.findById(carId).orElseThrow(() -> new CouldNotFindCarException(carId));
        carRepository.delete(car);
    }

    public record AddedCarId(String id) {
    }
}

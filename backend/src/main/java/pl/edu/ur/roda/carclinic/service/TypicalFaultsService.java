package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.dto.TypicalFaultDto;
import pl.edu.ur.roda.carclinic.entity.Car;
import pl.edu.ur.roda.carclinic.entity.TypicalFaults;
import pl.edu.ur.roda.carclinic.enums.TypicalFaultsPossibility;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindCarException;
import pl.edu.ur.roda.carclinic.repostiory.CarRepository;
import pl.edu.ur.roda.carclinic.repostiory.TypicalFaultsRepository;

import java.util.ArrayList;
import java.util.List;

import static org.apache.commons.lang3.StringUtils.lowerCase;

@Service
@RequiredArgsConstructor
public class TypicalFaultsService {
    private final CarRepository carRepository;
    private final TypicalFaultsRepository typicalFaultsRepository;

    public List<TypicalFaults> getTypicalFaults() {
        return typicalFaultsRepository
                .findAll();
    }

    public List<TypicalFaultDto> getUserCarsTypicalFaults(String userId, String carId) {
        Car car = carRepository.findById(carId).orElseThrow(() -> new CouldNotFindCarException(carId));
        return getTypicalFaultToCar(car);
    }

    private List<TypicalFaultDto> getTypicalFaultToCar(Car car) {
        List<TypicalFaultDto> typicalFaultDtoList = new ArrayList<>();
        List<TypicalFaults> typicalFaults = typicalFaultsRepository.findAll();
        typicalFaults
                .forEach(typicalFaults1 -> {
                    int probability = 0;
                    if (lowerCase(typicalFaults1.getModel()).contains(lowerCase(car.getModel())) ||
                            lowerCase(typicalFaults1.getModel()).contains(lowerCase(car.getBrand()))) {
                        probability++;
                        if (Integer.parseInt(car.getYearProduction()) >= typicalFaults1.getYearProductionFrom() &&
                                Integer.parseInt(car.getYearProduction()) <= typicalFaults1.getYearProductionTo()) {
                            probability++;
                        }
                        if (typicalFaults1.getEngineType().equals(car.getEngineType())) {
                            probability++;
                        }
                    }
                    if (probability == 3) {
                        TypicalFaultDto typicalFault = TypicalFaultDto.of(TypicalFaultsPossibility.HIGH, typicalFaults1);
                        typicalFaultDtoList.add(typicalFault);
                    }
                    if (probability == 2) {
                        TypicalFaultDto typicalFault = TypicalFaultDto.of(TypicalFaultsPossibility.MEDIUM, typicalFaults1);
                        typicalFaultDtoList.add(typicalFault);
                    }
                    if( probability == 1) {
                        TypicalFaultDto typicalFault = TypicalFaultDto.of(TypicalFaultsPossibility.LOW, typicalFaults1);
                        typicalFaultDtoList.add(typicalFault);
                    }
                });
        return typicalFaultDtoList;
    }
}
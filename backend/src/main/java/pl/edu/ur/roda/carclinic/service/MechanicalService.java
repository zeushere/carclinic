package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.dto.MechanicalServiceInfoDto;
import pl.edu.ur.roda.carclinic.repostiory.MechanicalServiceRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MechanicalService {

    private final MechanicalServiceRepository mechanicalServiceRepository;

    public List<MechanicalServiceInfoDto> getMechanicalServices() {
        return mechanicalServiceRepository
                .findMechanicalServices()
                .stream()
                .map(MechanicalServiceInfoDto::of)
                .toList();
    }
}

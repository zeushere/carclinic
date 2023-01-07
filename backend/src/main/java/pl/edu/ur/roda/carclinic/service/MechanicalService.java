package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.dto.MechanicalServiceInfoDto;
import pl.edu.ur.roda.carclinic.mapper.MechanicalServiceMechanicalServiceInfoDtoMapper;
import pl.edu.ur.roda.carclinic.repostiory.MechanicalServiceRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MechanicalService {

    private final MechanicalServiceRepository mechanicalServiceRepository;
    private final MechanicalServiceMechanicalServiceInfoDtoMapper mechanicalServiceMechanicalServiceInfoDtoMapper;

    public List<MechanicalServiceInfoDto> getMechanicalServices() {
        List<MechanicalServiceInfoDto> mechanicalServiceInfoDtos = new ArrayList<>();
        mechanicalServiceRepository
                .findAll()
                .forEach(mechanicalService ->
                        mechanicalServiceInfoDtos.add(new MechanicalServiceInfoDto(mechanicalService.getId(), mechanicalService.getName()
                        )));
        return mechanicalServiceInfoDtos;
    }
}

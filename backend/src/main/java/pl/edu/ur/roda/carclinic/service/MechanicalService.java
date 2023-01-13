package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.dto.MechanicalServiceAddDto;
import pl.edu.ur.roda.carclinic.dto.MechanicalServiceEditDto;
import pl.edu.ur.roda.carclinic.dto.MechanicalServiceInfoDto;
import pl.edu.ur.roda.carclinic.exception.CouldNotFindMechanicalServiceException;
import pl.edu.ur.roda.carclinic.repostiory.MechanicalServiceRepository;

import javax.transaction.Transactional;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MechanicalService {

    private final MechanicalServiceRepository mechanicalServiceRepository;
    private final AppointmentService appointmentService;

    public List<MechanicalServiceInfoDto> getMechanicalServices() {
        return mechanicalServiceRepository
                .findMechanicalServices()
                .stream()
                .map(MechanicalServiceInfoDto::of)
                .toList();
    }

    public MechanicalServiceInfoDto getMechanicalService(Long mechanicalServiceId, String ownerId) {
        pl.edu.ur.roda.carclinic.entity.MechanicalService mechanicalService = mechanicalServiceRepository.findById(mechanicalServiceId).orElseThrow(() -> new CouldNotFindMechanicalServiceException(mechanicalServiceId));
        MechanicalServiceInfoDto mechanicalServiceInfoDto = MechanicalServiceInfoDto.of(mechanicalService);
        return mechanicalServiceInfoDto;
    }

    @Transactional
    public MechanicalServiceEditDto editMechanicalService(Long id, MechanicalServiceEditDto mechanicalServiceEditDto, String userId) {
        pl.edu.ur.roda.carclinic.entity.MechanicalService mechanicalService = mechanicalServiceRepository.findById(id).orElseThrow(() -> new CouldNotFindMechanicalServiceException(id));

        mechanicalService.setName(mechanicalServiceEditDto.name());
        mechanicalService.setExpectedExecutionTime(mechanicalServiceEditDto.expectedExecutionTime().isBefore(LocalTime.of(0, 15)) ? null : mechanicalServiceEditDto.expectedExecutionTime());
        mechanicalService.setExpectedServiceCost(mechanicalServiceEditDto.expectedServiceCost());

        return mechanicalServiceEditDto;
    }

    @Transactional
    public void deleteMechanicalService(Long id, String userId) {
        pl.edu.ur.roda.carclinic.entity.MechanicalService mechanicalService = mechanicalServiceRepository.findById(id).orElseThrow(() -> new CouldNotFindMechanicalServiceException(id));

        mechanicalService.getAppointments()
                .forEach(
                        appointment -> appointmentService.cancelAppointment(appointment.getId(), userId)
                );
        mechanicalServiceRepository.deleteById(id);
    }

    public Long addMechanicalService(MechanicalServiceAddDto mechanicalServiceAddDto, String userId) {
        pl.edu.ur.roda.carclinic.entity.MechanicalService savedMechanicalService = mechanicalServiceRepository.save(MechanicalServiceAddDto.from(mechanicalServiceAddDto));
        return savedMechanicalService.getId();
    }
}

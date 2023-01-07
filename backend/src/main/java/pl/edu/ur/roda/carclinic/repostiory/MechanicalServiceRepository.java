package pl.edu.ur.roda.carclinic.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.ur.roda.carclinic.entity.MechanicalService;

public interface MechanicalServiceRepository extends JpaRepository<MechanicalService, Long> {
}

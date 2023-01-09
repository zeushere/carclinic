package pl.edu.ur.roda.carclinic.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.ur.roda.carclinic.entity.MechanicalService;
import pl.edu.ur.roda.carclinic.entity.RabatCode;

@Repository
public interface RabatCodeRepository extends JpaRepository<RabatCode, Long> {

    RabatCode getByCode(String code);
}

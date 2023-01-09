package pl.edu.ur.roda.carclinic.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.edu.ur.roda.carclinic.entity.MechanicalService;

import java.util.List;

@Repository
public interface MechanicalServiceRepository extends JpaRepository<MechanicalService, Long> {
    @Query("SELECT m FROM MechanicalService m WHERE m.name not like 'Dojazd do klienta'")
    List<MechanicalService> findMechanicalServices();
}

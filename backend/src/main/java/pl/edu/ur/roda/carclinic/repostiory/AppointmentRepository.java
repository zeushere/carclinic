package pl.edu.ur.roda.carclinic.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.ur.roda.carclinic.entity.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, String> {
}

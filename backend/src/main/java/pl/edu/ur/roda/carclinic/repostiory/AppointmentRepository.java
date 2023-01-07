package pl.edu.ur.roda.carclinic.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.ur.roda.carclinic.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, String> {
}

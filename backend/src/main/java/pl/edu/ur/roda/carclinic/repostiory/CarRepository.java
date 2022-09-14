package pl.edu.ur.roda.carclinic.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.ur.roda.carclinic.entity.Car;

public interface CarRepository extends JpaRepository<Car, String> {
}

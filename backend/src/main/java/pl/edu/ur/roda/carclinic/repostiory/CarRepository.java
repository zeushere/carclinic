package pl.edu.ur.roda.carclinic.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.ur.roda.carclinic.entity.Car;
import pl.edu.ur.roda.carclinic.entity.User;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, String> {
    List<Car> findCarsByOwner(User owner);
}

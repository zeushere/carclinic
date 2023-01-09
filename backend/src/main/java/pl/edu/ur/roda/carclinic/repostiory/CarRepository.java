package pl.edu.ur.roda.carclinic.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.edu.ur.roda.carclinic.entity.Car;
import pl.edu.ur.roda.carclinic.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, String> {
    List<Car> findCarsByOwner(User owner);

    @Query(nativeQuery = true, value = "SELECT notification_send FROM cars WHERE id = :carId AND notification_send IS NOT NULL")
    LocalDateTime findNotificationSendDateByCar(@Param("carId") String carId);
}

package pl.edu.ur.roda.carclinic.repostiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.edu.ur.roda.carclinic.entity.WorkingPeriod;
import pl.edu.ur.roda.carclinic.enums.AppointmentAvailableStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WorkingPeriodRepository extends JpaRepository<WorkingPeriod, Long> {

    @Query(nativeQuery = true, value = "select w.* from working_period w WHERE w.date = :date AND w.available = :availableStatus")
    WorkingPeriod findByDateAndAvailable(LocalDateTime date, String availableStatus);

    @Query("select w from WorkingPeriod w where w.date >= :dateFrom and w.date < :dateTo")
    List<WorkingPeriod> findByDateBetween(@Param("dateFrom") LocalDateTime dateFrom,
                                          @Param("dateTo") LocalDateTime dateTo);

    @Query(value = "SELECT w.* FROM working_period w WHERE DATE(date) =:date AND available = :available", nativeQuery = true)
    List<WorkingPeriod> findAvailableDateInDay(LocalDate date, String available);
}

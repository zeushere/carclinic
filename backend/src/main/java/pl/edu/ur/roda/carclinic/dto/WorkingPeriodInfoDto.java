package pl.edu.ur.roda.carclinic.dto;

import pl.edu.ur.roda.carclinic.entity.WorkingPeriod;

import java.time.LocalDateTime;
import java.time.LocalTime;

public record WorkingPeriodInfoDto(
        LocalTime time
) {
    public static WorkingPeriodInfoDto of(WorkingPeriod workingPeriod) {
        return new WorkingPeriodInfoDto(
                LocalTime.of(
                        workingPeriod.getDate().getHour(),
                        workingPeriod.getDate().getMinute()));
    }
}

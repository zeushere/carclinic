package pl.edu.ur.roda.carclinic.dto;

import pl.edu.ur.roda.carclinic.entity.TypicalFaults;
import pl.edu.ur.roda.carclinic.enums.TypicalFaultsPossibility;

public record TypicalFaultDto(
        String name,
        String possibility

) {

    public static TypicalFaultDto of(TypicalFaultsPossibility typicalFaultsPossibility, TypicalFaults typicalFaults) {
        return new TypicalFaultDto(
                typicalFaults.getName(),
                typicalFaultsPossibility.getPossibility());
    }
}

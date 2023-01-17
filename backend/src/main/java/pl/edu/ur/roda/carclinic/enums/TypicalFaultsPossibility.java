package pl.edu.ur.roda.carclinic.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TypicalFaultsPossibility {

    LOW("NISKIE"),
    MEDIUM("ŚREDNIE"),
    HIGH("WYSOKIE");

    private final String possibility;
}

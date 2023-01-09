package pl.edu.ur.roda.carclinic.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TypicalFaultsPossibility {

    LIKELY("PRAWDOPODOBNE"),
    HIGH_PROBABLE("WYSOCE PRAWDOPODOBNE");

    private final String possibility;
}

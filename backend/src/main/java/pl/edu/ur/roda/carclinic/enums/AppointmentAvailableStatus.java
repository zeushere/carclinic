package pl.edu.ur.roda.carclinic.enums;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum AppointmentAvailableStatus {
    WOLNE("WOLNE"),
    ZAREZERWOWANE("ZAREZERWOWANE");

    private final String availableStatus;
}

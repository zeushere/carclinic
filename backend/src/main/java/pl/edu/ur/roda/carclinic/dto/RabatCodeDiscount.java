package pl.edu.ur.roda.carclinic.dto;

import java.math.BigDecimal;

public record RabatCodeDiscount(
        BigDecimal discountSize
) {
    public static RabatCodeDiscount of(BigDecimal discountSize) {
        return new RabatCodeDiscount(discountSize);
    }
}

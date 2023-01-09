package pl.edu.ur.roda.carclinic.dto;

import pl.edu.ur.roda.carclinic.entity.RabatCode;

import java.math.BigDecimal;

public record RabatCodeDto(
        String code,
        BigDecimal discountSize
) {
    public static RabatCode of(RabatCodeDto rabatCodeDto) {
        return new RabatCode(rabatCodeDto.code(), rabatCodeDto.discountSize());
    }

    public static RabatCodeDto from(RabatCode rabatCode) {
        return  new RabatCodeDto(rabatCode.getCode(), rabatCode.getDiscountSize());
    }
}

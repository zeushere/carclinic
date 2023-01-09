package pl.edu.ur.roda.carclinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import pl.edu.ur.roda.carclinic.dto.RabatCodeDiscount;
import pl.edu.ur.roda.carclinic.dto.RabatCodeDto;
import pl.edu.ur.roda.carclinic.entity.RabatCode;
import pl.edu.ur.roda.carclinic.repostiory.RabatCodeRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RabatCodeService {
    private final RabatCodeRepository rabatCodeRepository;

    public List<RabatCode> getRabatCodes() {
        return rabatCodeRepository.findAll();
    }

    public RabatCodeDiscount getRabatCodeDiscount(String code) {
        RabatCode byCode = rabatCodeRepository.getByCode(code);
        return RabatCodeDiscount.of(byCode.getDiscountSize());
    }

    public void addRabatCode(RabatCodeDto rabatCodeDto) {
        rabatCodeRepository.save(RabatCodeDto.of(rabatCodeDto));
    }

    public void deleteRabatCode(Long rabatCodeId) {
        rabatCodeRepository.deleteById(rabatCodeId);
    }

    @Transactional
    public RabatCodeDto editRabatCode(Long rabatCodeId, RabatCodeDto rabatCodeDto) {
        RabatCode rabatCode = rabatCodeRepository.findById(rabatCodeId).orElseThrow();

        if (!StringUtils.isEmpty(rabatCodeDto.code())) {
            rabatCode.setCode(rabatCodeDto.code());
        }

        if (rabatCodeDto.discountSize() != null) {
            rabatCode.setDiscountSize(rabatCodeDto.discountSize());
        }

        return RabatCodeDto.from(rabatCode);
    }
}

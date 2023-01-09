package pl.edu.ur.roda.carclinic.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalTime;

@Entity
@Table(name = "rabat_code")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RabatCode {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_rabat_code")
    @SequenceGenerator(
            name = "seq_rabat_code",
            sequenceName = "seq_rabat_code",
            allocationSize = 1
    )
    private Long id;
    private String code;
    private BigDecimal discountSize;

    public RabatCode(String code, BigDecimal discountSize) {
        this.code = code;
        this.discountSize = discountSize;
    }
}

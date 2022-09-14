package pl.edu.ur.roda.carclinic.configuration.captcha;

import com.fasterxml.jackson.annotation.JsonProperty;

record CaptchaValidatorResponse(
        boolean success,

        @JsonProperty("challenge_ts")
        String requestTime,

        String hostname
) {
}

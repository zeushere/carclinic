import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";

const AboutSection = ({ aboutClass }) => {
    return (
        <section
            className="about__section"
            style={
                aboutClass === "aboutPage"
                    ? { marginTop: "0px" }
                    : { marginTop: "280px" }
            }
        >
            <Container>
                <Row>
                    <Col lg="6" md="6">
                        <div className="about__section-content">
                            <h4 className="section__subtitle">O nas</h4>
                            <h2 className="section__title">Witaj w serwisie CarClinic</h2>
                            <p className="section__description">
                                Jesteśmy warsztatem samochodowym, który wychodzi naprzeciw oczekiwaniom klientów i umożliwia rezerwację wizyty online z możliwością zdalnej naprawy. Załóż konto i zarezerwuj wizytę w naszym warsztacie! Czekamy na Ciebie!
                            </p>

                            <div className="about__section-item d-flex align-items-center">
                                <p className="section__description d-flex align-items-center gap-2">
                                    <i class="ri-checkbox-circle-line"></i> Rezerwacja wizyty online

                                </p>

                                <p className="section__description d-flex align-items-center gap-2">

                                    <i class="ri-checkbox-circle-line"></i> Przewidywanie typowych usterek

                                </p>
                            </div>

                            <div className="about__section-item d-flex align-items-center">
                                <p className="section__description d-flex align-items-center gap-2">
                                    <i class="ri-checkbox-circle-line"></i> Płatność online
                                </p>

                                <p className="section__description d-flex align-items-center gap-2">
                                    <i class="ri-checkbox-circle-line"></i> Zdalna naprawa
                                </p>
                            </div>
                        </div>
                    </Col>

                    <Col lg="6" md="6">
                        <div className="about__img">
                            <img src={aboutImg} alt="" className="w-100" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AboutSection;

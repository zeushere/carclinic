import React from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";

import driveImg from "../assets/all-images/drive.jpg";
import OurMembers from "../components/UI/OurMembers";
import "../styles/about.css";

const About = () => {
    return (
        <Helmet title="About">
            <CommonSection title="O nas" />
            <AboutSection aboutClass="aboutPage" />

            <section className="about__page-section">
                <Container>
                    <Row>
                        <Col lg="6" md="6" sm="12">
                            <div className="about__page-img">
                                <img src={driveImg} alt="" className="w-100 rounded-3" />
                            </div>
                        </Col>

                        <Col lg="6" md="6" sm="12">
                            <div className="about__page-content">
                                <h2 className="section__title">
                                    Jesteśmy po to, abyś Ty jeździł bezpiecznie
                                </h2>
<br/>
                                <p className="section__description">
                                    Świadczymy usługi na najwyższym poziomie. Motoryzacja to nasza pasja i z każdym uczymy się jeszcze więcej, aby być jak najlepszą wersją samych siebie. Każdy z nas ma pełną głowę pomysłów i żadna usterka nam nie umknie.
                                </p>
<br/>
                                <p className="section__description">
                                    Przyjedź i się przekonaj, a już zawsze będziesz do nas wracać. Cenimy sobie dobre relacje z klientem, dlatego czekamy właśnie na Ciebie.
                                </p>
<br/>
                                <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i class="ri-phone-line"></i>
                  </span>

                                    <div>
                                        <h6 className="section__subtitle">Potrzebujesz pomocy?</h6>
                                        <h4>+48 532 167 665</h4>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <BecomeDriverSection />

            <section>
                <Container>
                    <Row>
                        <Col lg="12" className="mb-5 text-center">
                            <h6 className="section__subtitle">Eksperci</h6>
                            <h2 className="section__title">Nasi pracownicy</h2>
                        </Col>
                        <OurMembers />
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default About;

import React, {useEffect, useState} from "react";
import "../../styles/become-driver-section.css";
import { Container, Row, Col } from "reactstrap";

import driverImg from "../../assets/all-images/toyota-offer-2.png";

const BecomeDriverSection = () => {

    const [click, setClick] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 2707);
    }, [click]);
    return (
        <section className="become__driver">
            <Container>
                <Row>
                    <Col lg="6" md="6" sm="12" className="become__driver-img">
                        <img src={driverImg} alt="" className="w-100" />
                    </Col>

                    <Col lg="6" md="6" sm="12">
                        <h2 className="section__title become__driver-title">
                            Jeszcze Cię nie zachęciliśmy?
                        </h2>

                        <button className="btn become__driver-btn mt-4" onClick={() => setClick(!click)}>
                            Zjedź niżej
                        </button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default BecomeDriverSection;

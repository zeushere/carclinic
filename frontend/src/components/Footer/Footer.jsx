import React from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const quickLinks = [

    {
        path: "/about",
        display: "O nas",
    },

    {
        path: "/blogs",
        display: "Blog",
    },

    {
        path: "/contact",
        display: "Kontakt",
    },

    {
        path: "/mechanical-services",
        display: "Usługi mechaniczne",
    },
];

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg="4" md="4" sm="12" className={''}>
                        <div className="logo footer__logo">
                            <h1>
                                <Link to="/home" className=" d-flex align-items-center justify-content-center gap-2 justify-cp">
                                    <i class="ri-car-line"></i>
                                    <span className={'text-center'}>
                    CarClinic <br /> Service
                  </span>
                                </Link>
                            </h1>
                        </div>
                        <div className={'justify-content-center'}>
                        <p className="footer__logo-content text-center">
                            Jesteśmy warsztatem samochodowym, który wychodzi naprzeciw oczekiwaniom klientów i umożliwia rezerwację wizyty online z możliwością zdalnej naprawy.
                            Załóż konto i zarezerwuj wizytę w naszym warsztacie! Czekamy na Ciebie!
                        </p>
                        </div>
                    </Col>

                    <Col lg="4" md="4" sm="6" className={'text-center'}>
                        <div className="mb-4 ml-5">
                            <h5 className="footer__link-title">Szybkie linki</h5>
                            <ListGroup>
                                {quickLinks.map((item, index) => (
                                    <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                                        <Link to={item.path}>{item.display}</Link>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </div>
                    </Col>

                    <Col lg="4" md="4" sm="6" className={'text-center'}>
                        <div className="mb-4">
                            <h5 className="footer__link-title mb-4">Siedziba warsztatu</h5>
                            <p className="office__info">Pigonia 1, 35-310 Rzeszów, Polska</p>
                            <p className="office__info">Telefon: +48 532 167 665</p>

                            <p className="office__info">Email: carclinic.superuser@gmail.com</p>

                            <p className="office__info">Czas pracy: 07:00 - 17:00</p>
                        </div>
                    </Col>



                    <Col lg="12">
                        <div className="footer__bottom">
                            <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                                <i class="ri-copyright-line"></i>Copyright {year}, Autor Kacper Roda. Wszystkie prawa zastrzeżone.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

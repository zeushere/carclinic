import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";

const socialLinks = [
    {
        url: "#",
        icon: "ri-facebook-line",
    },
    {
        url: "#",
        icon: "ri-instagram-line",
    },
    {
        url: "#",
        icon: "ri-linkedin-line",
    },
    {
        url: "#",
        icon: "ri-twitter-line",
    },
];

const Contact = () => {
    return (
        <Helmet title="Kontakt">
            <CommonSection title="Kontakt" />
            <section>
                <Container>
                    <Row>
                        <Col lg="7" md="7">
                            <h6 className="fw-bold mb-4">Pozostańmy w kontakcie</h6>

                            <Form>
                                <FormGroup className="contact__form">
                                    <Input placeholder="Twoje Imię" type="text" />
                                </FormGroup>
                                <FormGroup className="contact__form">
                                    <Input placeholder="Email" type="email" />
                                </FormGroup>
                                <FormGroup className="contact__form">
                  <textarea
                      rows="5"
                      placeholder="Wiadomość"
                      className="textarea"
                  ></textarea>
                                </FormGroup>

                                <button className=" contact__btn" type="submit">
                                    Wyślij wiadomość
                                </button>
                            </Form>
                        </Col>

                        <Col lg="5" md="5">
                            <div className="contact__info">
                                <h6 className="fw-bold">Informacje kontaktowe</h6>
                                <p className="section__description mb-0">
                                    Pigonia 1, 35-310 Rzeszów, Polska
                                </p>
                                <div className=" d-flex align-items-center gap-2">
                                    <h6 className="fs-6 mb-0">Telefon:</h6>
                                    <p className="section__description mb-0">48 532 167 665</p>
                                </div>

                                <div className=" d-flex align-items-center gap-2">
                                    <h6 className="mb-0 fs-6">Email:</h6>
                                    <p className="section__description mb-0">carclinic.superuser@gmail.com</p>
                                </div>

                                <h6 className="fw-bold mt-4">Sprawdź Nas</h6>

                                <div className=" d-flex align-items-center gap-4 mt-3">
                                    {socialLinks.map((item, index) => (
                                        <Link
                                            to={item.url}
                                            key={index}
                                            className="social__link-icon"
                                        >
                                            <i class={item.icon}></i>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Contact;

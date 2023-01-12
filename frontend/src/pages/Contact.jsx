import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col, Form, FormGroup, Input} from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/contact.css";
import {useDispatch} from "react-redux";
import {sendContactMessage} from "../actions/contactActions";
import Snackbar from "../components/Snackbar/Snackbar";
import SnackbarType from "../components/Snackbar/SnackbarType";

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

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailSend, setEmailSend] = useState(false);
    const dispatch = useDispatch();
    const snackbarRefSendEmail = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(sendContactMessage(name, email, message));
        setEmailSend(true);
        setName('');
        setEmail('');
        setMessage('');
    }

    if (emailSend) {
        snackbarRefSendEmail.current.show();
        setEmailSend(false);
    }

    useEffect(() => {
    }, [dispatch])

    return (
        <Helmet title="Kontakt">
            <CommonSection title="Kontakt"/>
            <section>
                <Container>
                    <Row>
                        <Col lg="7" md="7">
                            <h6 className="fw-bold mb-4">Pozostańmy w kontakcie</h6>

                            <Form onSubmit={handleSubmit}>
                                <FormGroup className="contact__form">
                                    <Input id='name' placeholder="Twoje Imię" required type="text" value={name}
                                           onChange={(e) => setName(e.target.value)}/>
                                </FormGroup>
                                <FormGroup className="contact__form">
                                    <Input placeholder="Email" required type="email" value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                </FormGroup>
                                <FormGroup className="contact__form">
                  <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows="5"
                      placeholder="Wiadomość"
                      className="textarea textarea__contact"
                      required
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
                                <div className=" d-flex align-items-center gap-2">
                                    <h6 className="mb-0 fs-6">Adres:</h6>
                                    <p className="section__description mb-0">
                                        Pigonia 1, 35-310 Rzeszów, Polska
                                    </p>
                                </div>
                                <div className=" d-flex align-items-center gap-2">
                                    <h6 className="fs-6 mb-0">Telefon:</h6>
                                    <p className="section__description mb-0">+48 532 167 665</p>
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
                <Snackbar
                    ref={snackbarRefSendEmail}
                    message="Pomyślnie wysłano wiadomość!"
                    type={SnackbarType.success}
                />
            </section>
        </Helmet>
    );
};

export default Contact;

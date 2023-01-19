import React, {useEffect} from "react";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";

import {Col, Container, Row} from "reactstrap";
import AddAppointmentForm from "../components/UI/AddAppointmentForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Testimonial from "../components/UI/Testimonial";

import BlogList from "../components/UI/BlogList";
import {useSelector} from "react-redux";
import useWindowDimensions from "../components/WindowDimension/WindowDimension";

const Home = () => {

    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [userInfo, localStorage]);
    const windowDimensions = useWindowDimensions();
    const {width} = windowDimensions;

    return (
        <Helmet title="Home">
            {/* ============= hero section =========== */}
            <section className="p-0 hero__slider-section">
                <HeroSlider/>

                <div className="hero__form">
                    <Container>
                        <Row className="form__row m-0">
                            <Row className={'text-center p-2 m-0'}>
                                <h2 className={'mt-2'}>Zarezerwuj wizytę</h2>
                            </Row>
                            <Col lg="12" md="12" sm="12">
                                <AddAppointmentForm/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
            {/* =========== about section ================ */}
            <AboutSection/>
            {/* ========== services section ============ */}
            <section>
                <Container>
                    <Row className="m-0">
                        <Col lg="12" className="mb-5 text-center">
                            <h6 className="section__subtitle">Sprawdź nasze</h6>
                            <h2 className="section__title">Atuty</h2>
                        </Col>

                        <ServicesList/>
                    </Row>
                </Container>
            </section>
            {/* =========== car offer section ============= */}

            {/* =========== become a driver section ============ */}
            <BecomeDriverSection/>

            {/* =========== testimonial section =========== */}
            {width > 600 && <section>
                <Container>
                    <Row className="m-0">
                        <Col lg="12" className="mb-4 text-center">
                            <h6 className="section__subtitle">Co o nas mówią?</h6>
                            <h2 className="section__title">Referencje</h2>
                        </Col>

                        <Testimonial/>
                    </Row>
                </Container>
            </section>}

            {/* =============== blog section =========== */}
            <section>
                <Container>
                    <Row className="m-0">
                        <Col lg="12" className="mb-5 text-center">
                            <h6 className="section__subtitle">Sprawdź naszego bloga</h6>
                            <h2 className="section__title">Blog</h2>
                        </Col>

                        <BlogList/>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Home;

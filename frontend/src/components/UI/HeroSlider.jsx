import React, {useEffect, useState} from "react";

import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

import "../../styles/hero-slider.css";

const HeroSlider = () => {
    const settings = {
        fade: true,
        speed: 2000,
        autoplaySpeed: 3000,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
    };

    const [click, setClick] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 400);
    }, [click]);

    return (
        <Slider {...settings} className="hero__slider">
            <div className="slider__item slider__item-01">
                <Container>
                    <div className="slider__content ">
                        <h4 className="text-light mb-3">Zarezerwuj wizytę w warsztacie</h4>
                        <h1 className="text-light mb-4">Zapłać online za usługę!</h1>

                        <button className="btn reserve__btn mt-0"  onClick={() => setClick(!click)}>
                            <Link to="#">Zarezerwuj wizytę</Link>
                        </button>
                    </div>
                </Container>
            </div>

            <div className="slider__item slider__item-02">
                <Container>
                    <div className="slider__content ">
                        <h4 className="text-light mb-3">Zarezerwuj wizytę w warsztacie </h4>
                        <h1 className="text-light mb-4">Zapłać online za usługę!</h1>

                        <button className="btn reserve__btn mt-0" onClick={() => setClick(!click)}>
                            <Link to="#">Zarezerwuj wizytę</Link>
                        </button>
                    </div>
                </Container>
            </div>

            <div className="slider__item slider__item-03">
                <Container>
                    <div className="slider__content ">
                        <h4 className="text-light mb-3">Zarezerwuj wizytę w warsztacie </h4>
                        <h1 className="text-light mb-4">Zapłać online za usługę!</h1>

                        <button className="btn reserve__btn mt-0" onClick={() => setClick(!click)}>
                            <Link to="#">Zarezerwuj wizytę</Link>
                        </button>
                    </div>
                </Container>
            </div>
        </Slider>
    );
};

export default HeroSlider;

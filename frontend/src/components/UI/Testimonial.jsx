import React from "react";
import Slider from "react-slick";

import "../../styles/testimonial.css";

import ava01 from "../../assets/all-images/ava-1.jpg";
import ava02 from "../../assets/all-images/ava-2.jpg";
import ava03 from "../../assets/all-images/ava-3.jpg";
import ava04 from "../../assets/all-images/ava-4.jpg";

const Testimonial = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            <div className="testimonial py-4 px-3">
                <p className="section__description">
                    Świenty warsztat, który potrafi zadbać o swojego klienta. Samochód po naprawie wtrysków dostał drugie życie i nie mam zamiaru go nigdy zmieniać!
                    Każdemu polecam zajrzeć do CarClinic. Na pewno nie pożałujecie!
                </p>

                <div className="mt-3 d-flex align-items-center gap-4">
                    <img src={ava01} alt="" className="w-25 h-25 rounded-2" />

                    <div>
                        <h6 className="mb-0 mt-3">Kamil Nowak</h6>
                        <p className="section__description">Klient</p>
                    </div>
                </div>
            </div>

            <div className="testimonial py-4 px-3">
                <p className="section__description">
                    Obsługa jak i cały proces naprawy na 5+! Miałam zepsuty samochód i byłam bardzo przeziębiona.
                    Następnego dnia miałam ważny wyjazd. Dzięki CarClinic bez wychodzenia z domu naprawiłam samochód i wyleczyłam chorobę :)!
                </p>

                <div className="mt-3 d-flex align-items-center gap-4">
                    <img src={ava02} alt="" className="w-25 h-25 rounded-2" />

                    <div>
                        <h6 className="mb-0 mt-3">Kamila Wybrańczyk</h6>
                        <p className="section__description">Klient</p>
                    </div>
                </div>
            </div>

            <div className="testimonial py-4 px-3">
                <p className="section__description">
                    Nie bardzo wiedziałem co się dzieje z moim samochodem. Szukałem informacji na wielu forach i nie znalazłem przyczyny. Zdecydowałem się na diagnostykę samochodu przez CarClinic. Samochód został zdiagnozowany i naprawiony w mniej niż 24h.
                </p>

                <div className="mt-3 d-flex align-items-center gap-4">
                    <img src={ava03} alt="" className="w-25 h-25 rounded-2" />

                    <div>
                        <h6 className="mb-0 mt-3">Jan Kowalski</h6>
                        <p className="section__description">Klient</p>
                    </div>
                </div>
            </div>

            <div className="testimonial py-4 px-3">
                <p className="section__description">
                   Założyłam konto na CarClinic i z ciekawości sprawdziłam typowe usterki mojego samochodu. Na diagnostyce okazało się, że wadliwe sprzęgło także w moim samochodzie ma się ku końcowi. Dzięki CarClinic, teraz mogę spokojnie podróżować!
                </p>

                <div className="mt-3 d-flex align-items-center gap-4">
                    <img src={ava04} alt="" className="w-25 h-25 rounded-2" />

                    <div>
                        <h6 className="mb-0 mt-3">Daria Bartosiewicz</h6>
                        <p className="section__description">Klient</p>
                    </div>
                </div>
            </div>
        </Slider>
    );
};

export default Testimonial;

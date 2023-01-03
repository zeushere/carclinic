import React, {useEffect, useRef} from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import {Link, useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {deleteCar, detailsCar} from "../actions/carActions";
import unknownCar from "../assets/all-images/cars-img/unknown-car.png"
import '../styles/client-car-details.css'
import {CAR_DELETE_RESET} from "../constants/carConstants";


const ClientCarDetails = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const carDetails = useSelector(state => state.carDetails);
    const {car} = carDetails;
    const deleteHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz usunąć ten samochód?')) {
            dispatch(deleteCar(id));
            navigate('/client-cars')
        }
    };
    const carDelete = useSelector((state) => state.carDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = carDelete;

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(detailsCar(id));
    }, [dispatch]);

    return (
        <Helmet title='Szczegóły samochodu'>
            <section>
                <Container>
                    <Row>
                        <Col lg="6">
                            <img src={car?.imagePath ? car?.imagePath : unknownCar} alt="" className="w-100" />
                        </Col>

                        <Col lg="6">
                            <div className="car__info">

                                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                                    <h6 className="rent__price fw-bold fs-4">
                                        {car?.brand} {car?.model}
                                    </h6>
                                </div>

                                <p className="section__description">
                                    {car?.description ? car?.description : 'Brak opisu'}
                                </p>

                                <div
                                    className=" d-flex align-items-center mt-3"
                                    style={{ columnGap: "4rem" }}
                                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                        class="ri-time-line"
                        style={{ color: "#f9a826" }}
                    ></i>{" "}
                      {car?.yearProduction ? car?.yearProduction : 'Nie podano'}
                  </span>

                                    <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                        class="ri-settings-2-line"
                        style={{ color: "#f9a826" }}
                    ></i>{" "}
                                        {car?.engineType != null ? car?.engineType : 'Nie podano' }
                  </span>

                                    <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                        class="ri-timer-flash-line"
                        style={{ color: "#f9a826" }}
                    ></i>{" "}
                                        {car?.engineCapacity ? car?.engineCapacity : 'Nie podano'}
                  </span>
                                </div>

                                <div
                                    className=" d-flex align-items-center mt-3"
                                    style={{ columnGap: "2.8rem" }}>
                                    <button className="client__car__details__btn__back"><Link to="/client-cars">Wróć</Link></button>
                                    <button className="client__car__details__btn__delete" onClick={() => {deleteHandler(id)}}><Link to='#'>Usuń</Link></button>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default ClientCarDetails;

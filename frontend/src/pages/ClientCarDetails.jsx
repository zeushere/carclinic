import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import {Link, useNavigate, useParams} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {carAppointments, carFaults, deleteCar, detailsCar} from "../actions/carActions";
import unknownCar from "../assets/all-images/cars-img/unknown-car.png"
import '../styles/client-car-details.css'
import TypicalFaults from "../components/UI/TypicalFaults"
import '../styles/car-faults.css'
import AppointmentsCarHistory from "../components/UI/AppointmentsCarHistory";


const ClientCarDetails = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const carDetails = useSelector(state => state.carDetails);
    const [typicalFaultsCarViewFlag, setTypicalFaultsCarViewFlag] = useState(false);
    const [carAppointmentsViewFlag, setCarAppointmentsViewFlag] = useState(false);
    const {car} = carDetails;
    const deleteHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz usunąć ten samochód?')) {
            dispatch(deleteCar(id));
            navigate('/client-cars')
        }
    };
    const carDelete = useSelector((state) => state.carDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = carDelete;

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(detailsCar(id));
        dispatch(carFaults(id));
        dispatch(carAppointments(id))

    }, [dispatch]);

    function typicalFaultsCar() {
        return <div  className={'mt-5'}>
            <Container>
                <h1 className={' text-center'}> Typowe usterki </h1>
                <Row>
                    <Col lg="12" md="12">
                        <TypicalFaults typicalFaultsCarViewFlag={typicalFaultsCarViewFlag}
                                       setTypicalFaultsCarViewFlag={setTypicalFaultsCarViewFlag}/>
                    </Col>
                </Row>
            </Container>
        </div>
    }
        function appointmentsCar() {
            return <div className={'mt-5'}>
                <Container>
                    <h1 className={' text-center'}> Historia zgłoszeń </h1>

                    <Row>
                        <Col lg="12" md="12">
                            <AppointmentsCarHistory carAppointmentsViewFlag={carAppointmentsViewFlag} setCarAppointmentsViewFlag={setCarAppointmentsViewFlag}/>
                        </Col>
                    </Row>
                </Container>
            </div>
    }
        return (
            <Helmet title='Szczegóły samochodu'>
                <section>
                    <Container>
                        <Row>
                            <Col lg="6">
                                <img src={car?.image ? car?.image : unknownCar} alt="" className="w-100" style={{height: "500px"}}/>
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
                                        style={{columnGap: "4rem"}}
                                    >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                        class="ri-time-line"
                        style={{color: "#f9a826"}}
                    ></i>{" "}
                      {car?.yearProduction ? car?.yearProduction : 'Nie podano'}
                  </span>

                                        <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                        class="ri-settings-2-line"
                        style={{color: "#f9a826"}}
                    ></i>{" "}
                                            {car?.engineType ? car?.engineType : 'Nie podano'}
                  </span>

                                        <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                        class="ri-shape-2-fill"
                        style={{color: "#f9a826"}}
                    ></i>{" "}
                                            {car?.carType ? car?.carType : 'Nie podano'}
                  </span>
                                    </div>

                                    <div
                                        className=" d-flex align-items-center mt-3"
                                        style={{columnGap: "2.8rem"}}>
                                        <button className="client__car__details__btn__back"><Link
                                            to="/client-cars">Wróć</Link></button>
                                        <button className="client__car__details__btn__delete" onClick={() => {
                                            deleteHandler(id)
                                        }}><Link to='#'>Usuń</Link></button>
                                        <button className="client__car__details__btn__typical_faults" onClick={() => {
                                            setTypicalFaultsCarViewFlag(!typicalFaultsCarViewFlag)
                                        }}
                                        ><Link to="#">
                                            Wyświetl typowe usterki
                                        </Link></button>
                                    </div>
                                    <div className={'mt-3'}> <button className="client__car__details__btn__appointments" onClick={() => {
                                        setCarAppointmentsViewFlag(!carAppointmentsViewFlag)
                                    }}
                                    ><Link to="#">
                                        Wyświetl historię zgłoszeń
                                    </Link></button></div>
                                </div>

                            </Col>
                            {typicalFaultsCarViewFlag ?  typicalFaultsCar() : null}
                            <br/>
                            {carAppointmentsViewFlag ? appointmentsCar() : null}
                        </Row>
                    </Container>
                </section>
            </Helmet>
        );
    };
export default ClientCarDetails;

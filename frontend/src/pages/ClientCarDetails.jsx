import React, { useEffect } from "react";

import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {detailsCar} from "../actions/carActions";
import unknownCar from "../assets/all-images/cars-img/unknown-car.png"


const ClientCarDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const car = useSelector(state => state.carDetails);
    const {brand, model, yearProduction, engineType, engineCapacity, description, imagePath} = car;



    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(detailsCar(id));
    }, [dispatch]);

    return (
        <Helmet title={1}>
            <section>
                <Container>
                    <Row>
                        <Col lg="6">
                            <img src={imagePath ? imagePath : unknownCar} alt="" className="w-100" />
                        </Col>

                        <Col lg="6">
                            <div className="car__info">

                                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                                    <h6 className="rent__price fw-bold fs-4">
                                        {brand}
                                    </h6>
                                </div>

                                <p className="section__description">
                                    {description}
                                </p>

                                <div
                                    className=" d-flex align-items-center mt-3"
                                    style={{ columnGap: "4rem" }}
                                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                        class="ri-roadster-line"
                        style={{ color: "#f9a826" }}
                    ></i>{" "}
                      {/*{model}*/}
                  test3
                  </span>

                                    <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                        class="ri-settings-2-line"
                        style={{ color: "#f9a826" }}
                    ></i>{" "}
                                        {/*{engineType}*/}
                                        test
                  </span>

                                    <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                        class="ri-timer-flash-line"
                        style={{ color: "#f9a826" }}
                    ></i>{" "}
                                        {/*{engineCapacity}*/}test5
                  </span>
                                </div>

                                <div
                                    className=" d-flex align-items-center mt-3"
                                    style={{ columnGap: "2.8rem" }}
                                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-map-pin-line" style={{ color: "#f9a826" }}></i>{" "}
                    test
                  </span>

                                    <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                        class="ri-wheelchair-line"
                        style={{ color: "#f9a826" }}
                    ></i>{" "}
                                        test2
                  </span>

                                    <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                        class="ri-building-2-line"
                        style={{ color: "#f9a826" }}
                    ></i>{" "}
                                        test4
                  </span>
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

import React, {useEffect} from 'react';
import ClientCar from "./ClientCar";
import {Col, Container, Row} from "reactstrap";
import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
import {useDispatch, useSelector} from "react-redux";
import {listCars} from "../actions/carActions";

const ClientCars = () => {
    const dispatch = useDispatch();
    const carList = useSelector(state => state.carList);
    const { loading, error, cars } = carList;


    useEffect(() => {
        dispatch(listCars());
        }, [dispatch]);

    return(
          <section>
              <Container>
                  <Row>
                      <Col lg="12" className="text-center mb-5">
                          <h2 className="section__title">Twoje samochody</h2>
                      </Col>
                      {cars?.map((car) => (
                          <ClientCar car={car} key={car.id} />
                      ))}
                      </Row>
              </Container>
          </section>
    );
}

export default ClientCars;
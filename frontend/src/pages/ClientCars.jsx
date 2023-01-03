import React, {useEffect, useRef} from 'react';
import ClientCar from "./ClientCar";
import {Col, Container, Row} from "reactstrap";
import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
import {useDispatch, useSelector} from "react-redux";
import {listCars} from "../actions/carActions";
import SnackbarType from "../components/Snackbar/SnackbarType";
import Snackbar from "../components/Snackbar/Snackbar";
import {CAR_DELETE_RESET} from "../constants/carConstants";

const ClientCars = (props) => {
    const dispatch = useDispatch();
    const carList = useSelector(state => state.carList);
    const snackbarRef = useRef(null);
    const { loading, error, cars } = carList;
    const carDelete = useSelector((state) => state.carDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = carDelete;


    useEffect(() => {
        dispatch(listCars());
        if(successDelete === true){
            snackbarRef.current.show();
                dispatch({ type: CAR_DELETE_RESET });
        }
        }, [dispatch, successDelete]);

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
                  <Snackbar
                      ref={snackbarRef}
                      message="Pomyślnie usunięto samochód!"
                      type={SnackbarType.success}
                  />
              </Container>
          </section>
    );
}

export default ClientCars;
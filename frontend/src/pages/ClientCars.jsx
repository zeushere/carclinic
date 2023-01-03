import React, {useEffect, useRef, useState} from 'react';
import ClientCar from "./ClientCar";
import {Col, Container, Row} from "reactstrap";
import carData from "../assets/data/carData";
import CarItem from "../components/UI/CarItem";
import {useDispatch, useSelector} from "react-redux";
import {listCars} from "../actions/carActions";
import SnackbarType from "../components/Snackbar/SnackbarType";
import Snackbar from "../components/Snackbar/Snackbar";
import {CAR_DELETE_RESET} from "../constants/carConstants";
import useWindowDimensions from "../components/WindowDimension/WindowDimension";
import {Link} from "react-router-dom";
import '../styles/client-cars.css'
import FindCarForm from "../components/UI/FindCarForm";
import AddCarForm from "../components/UI/AddCarForm";

const ClientCars = (props) => {
    const dispatch = useDispatch();
    const carList = useSelector(state => state.carList);
    const snackbarRef = useRef(null);
    const { loading, error, cars } = carList;
    const carDelete = useSelector((state) => state.carDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = carDelete;
    const {width } = useWindowDimensions();
    const [addCarViewFlag, setAddCarViewFlag] = useState(false);

   function addCar() {
        return <div className="car__form" >
            <Container>
                <Row className="form__row">
                    <Col lg="5" md="4">
                        <div className="find__cars-left">
                            <h2 className={'text-center'}>Wstaw zdjęcie</h2>
                        </div>
                    </Col>

                    <Col lg="7" md="8" sm="12">
                        <AddCarForm />
                    </Col>
                </Row>
            </Container>
        </div>
    }

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
                      <Col lg="7" md='12' className={width >= 992 ? 'text-end mb-5' : 'text-center mb-5'}>
                          <h2 className="section__title">Twoje samochody</h2>
                      </Col>
                      <Col lg="5" md='12' className={width >= 992 ? 'text-end mb-5' : 'text-center mb-5'}>
                          <button className="header__btn btn car__add__button" onClick={() => setAddCarViewFlag(!addCarViewFlag)}>
                              <Link to="#">
                                  <i className="ri-car-line"></i> Dodaj samochód
                              </Link>
                          </button>
                      </Col>
                      {addCarViewFlag ? addCar() : null}
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
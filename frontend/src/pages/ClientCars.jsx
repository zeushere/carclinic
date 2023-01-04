import React, {useEffect, useRef, useState} from 'react';
import ClientCar from "./ClientCar";
import {Col, Container, Row} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {listCars} from "../actions/carActions";
import SnackbarType from "../components/Snackbar/SnackbarType";
import Snackbar from "../components/Snackbar/Snackbar";
import {CAR_DELETE_RESET} from "../constants/carConstants";
import useWindowDimensions from "../components/WindowDimension/WindowDimension";
import {Link} from "react-router-dom";
import '../styles/client-cars.css'
import AddCarForm from "../components/UI/AddCarForm";
import Axios from "axios";

const ClientCars = (props) => {
    const inputFile = useRef(null)
    const dispatch = useDispatch();
    const carList = useSelector(state => state.carList);
    const snackbarRef = useRef(null);
    const {loading, error, cars} = carList;
    const carDelete = useSelector((state) => state.carDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = carDelete;
    const {width} = useWindowDimensions();
    const [addCarViewFlag, setAddCarViewFlag] = useState(false);
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const formData = new FormData();

    const addImageToCar = (id, formData) => async (e) => {
        try {
            const {data} = await Axios.post(`/cars/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });

        } catch (error) {
        }
    };
    function addCar() {
        return <div className="car__form">
            <Container>
                <Row className="form__row">
                    <Col lg="5" md="12">
                        <div className="find__cars-left">
                            <input type='file' id='file' onChange={addImageToCar} ref={inputFile} style={{display: 'none'}}/>
                            <h2 className={'text-center'}><button onClick={() => {inputFile.current.click();}} className={'insert__photo__button'} to="#">Wstaw
                                zdjęcie</button></h2>
                        </div>
                    </Col>

                    <Col lg="7" md="12" sm="12">
                        <AddCarForm/>
                    </Col>
                </Row>
            </Container>
        </div>
    }

    useEffect(() => {
        dispatch(listCars());
        if (successDelete === true) {
            snackbarRef.current.show();
            dispatch({type: CAR_DELETE_RESET});
        }
    }, [dispatch, successDelete]);

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="7" md='12' className={width >= 992 ? 'text-end mb-5' : 'text-center mb-5'}>
                        <h2 className="section__title">Twoje samochody</h2>
                    </Col>
                    <Col lg="5" md='12' className={width >= 992 ? 'text-end mb-5' : 'text-center mb-5'}>
                        <button className="header__btn btn car__add__button"
                                onClick={() => setAddCarViewFlag(!addCarViewFlag)}>
                            <Link to="#">
                                <i className="ri-car-line"></i> Dodaj samochód
                            </Link>
                        </button>
                    </Col>
                    {addCarViewFlag ? addCar() : null}
                    {cars?.map((car) => (
                        <ClientCar car={car} key={car.id}/>
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
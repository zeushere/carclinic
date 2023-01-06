import React  from "react";
import {Col} from "reactstrap";
import unknownCar from "../assets/all-images/cars-img/unknown-car.png"
import {Link} from "react-router-dom";
import '../styles/client-car.css'
import {deleteCar} from "../actions/carActions";
import {useDispatch} from "react-redux";

const ClientCar = (props) => {
    const {id, brand, model, yearProduction, engineType, carType, description, image} = props.car;
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz usunąć ten samochód?')) {
            dispatch(deleteCar(id));
        }
    };

    return (
        <Col lg="4" md="4" sm="6" className="mb-5">
            <div className="car__item">
                <div className="car__img">
                    <img className={'w-100 client__cars__img'} src={image ? image : unknownCar}/>
                </div>

                <div className="car__item-content mt-4">
                    <h4 className="section__title text-center"><span>{brand} {model}</span></h4>


                    <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-time-line"></i>
                {yearProduction ? yearProduction : 'Nie podano'}
            </span>
                        <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {engineType ? engineType : 'Nie podano'}
            </span>
                        <span className=" d-flex align-items-center gap-1">
              <i className="ri-shape-2-fill"></i> {carType ? carType : 'Nie podano'}
            </span>
                    </div>

                    <button className=" w-50 car__item-btn car__btn-rent">
                        {<Link to={`/cars/${id}`}>Szczegóły</Link>
                        }
                    </button>

                    <button className=" w-50 car__item-btn car__btn-details" onClick={() => {deleteHandler(id)}}>
                        {<Link className='delete__car__button' to='#'>Usuń</Link>
                        }
                    </button>
                </div>
            </div>
        </Col>
    );
};

export default ClientCar;
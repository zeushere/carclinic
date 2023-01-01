import React  from "react";
import {Col} from "reactstrap";
import unknownCar from "../assets/all-images/cars-img/unknown-car.png"
import {Link} from "react-router-dom";

const ClientCar = (props) => {
    const {id, brand, model, yearProduction, engineType, engineCapacity, description, imagePath} = props.car;

    return (
        <Col lg="4" md="4" sm="6" className="mb-5">
            <div className="car__item">
                <div className="car__img">
                    <img className={'w-100'} src={imagePath ? imagePath : unknownCar}/>
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
              <i className="ri-timer-flash-line"></i> {engineCapacity ? engineCapacity : 'Nie podano'}
            </span>
                    </div>

                    <button className=" w-50 car__item-btn car__btn-rent">
                        {<Link to={`/cars/${id}`}>Szczegóły</Link>
                        }
                    </button>

                    <button className=" w-50 car__item-btn car__btn-details">
                        {<Link to={`/cars/${id}`}>Usuń</Link>
                        }
                    </button>
                </div>
            </div>
        </Col>
    );
};

export default ClientCar;
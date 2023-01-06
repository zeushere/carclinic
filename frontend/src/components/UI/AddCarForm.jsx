import React, {useState} from "react";
import "../../styles/find-car-form.css";
import {Form, FormGroup} from "reactstrap";
import '../../styles/add-car-form.css';
import useWindowDimensions from "../WindowDimension/WindowDimension";
import {useDispatch, useSelector} from "react-redux";
import {addCar} from "../../actions/carActions";
import Axios from "axios";
import {CAR_DELETE_FAIL} from "../../constants/carConstants";
import {MdClose} from "react-icons/md";


const AddCarForm = (props) => {
    const {width} = useWindowDimensions();
    const dispatch = useDispatch();
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [yearProduction, setYearProduction] = useState('');
    const [engineType, setEngineType] = useState('');
    const [carType, setCarType] = useState('');
    const [description, setDescription] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const carAdd = useSelector(state => state.carAdd);
    const {addedCarId} = carAdd;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCar(brand, model, yearProduction, engineType, carType, description));
        props.setAddCarViewFlag(!props.addCarViewFlag)
        dispatch(addImageToCar());
    }

    const addImageToCar = () => async (dispatch) => {
        if (localStorage.getItem('invoke') != null) {
            const bodyFormData = props.formdata;
            try {
                const {data} = await Axios.post(`/cars/${addedCarId}`, bodyFormData, {
                    headers: {Authorization: `Bearer ${userInfo.token}`}
                });
            } catch (error) {
                const message = error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
                dispatch({type: CAR_DELETE_FAIL, payload: message});
                localStorage.removeItem('invoke')
                localStorage.removeItem('addedCarId')
            }
        }
    };

    return (
        <Form className="form" onSubmit={handleSubmit}>
            <div className={'text-right'}>

                <button className="header__btn btn hide_car__add__button"
                        onClick={() => {
                            props.setAddCarViewFlag(!props.addCarViewFlag)
                        }}>
                    <MdClose size={'30px'}/>
                </button>

            </div>
            <div className=" d-flex justify-content-around flex-wrap">
                <FormGroup className="form__group">
                    <input type="text"
                           placeholder="Marka"
                           value={brand}
                           onChange={(e) => setBrand(e.target.value)}/>
                </FormGroup>

                <FormGroup className="form__group">
                    <input type="text" placeholder="Model" required
                           value={model}
                           onChange={(e) => setModel(e.target.value)}/>
                </FormGroup>

                <FormGroup className="form__group">
                    <input type="text" placeholder="Rok produkcji"
                           value={yearProduction}
                           onChange={(e) => setYearProduction(e.target.value)}/>
                </FormGroup>

                <FormGroup className="form__group">
                    <input type="text" placeholder="Typ silnika"
                           value={engineType}
                           onChange={(e) => setEngineType(e.target.value)}/>
                </FormGroup>
                <FormGroup className="justify-content-b form__group">
                    <input type="text" placeholder="Typ samochodu"
                           value={carType}
                           onChange={(e) => setCarType(e.target.value)}/>
                </FormGroup>
            </div>
            <div className={'d-flex flex-wrap justify-content-around mt-2'}>
                <textarea type="text" className='textarea__add__car__form mb-0' placeholder="Opis samochodu"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}/>
                <button type={"submit"} className={width >= 768 ? "btn add__car-btn" : "btn add__car-btn mt-2"}>Dodaj
                    samochód
                </button>
            </div>
        </Form>
    );
};

export default AddCarForm;

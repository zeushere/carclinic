import React, {useState} from "react";
import "../../styles/find-car-form.css";
import {Form, FormGroup} from "reactstrap";
import '../../styles/add-car-form.css';
import useWindowDimensions from "../WindowDimension/WindowDimension";
import {useDispatch} from "react-redux";
import {addCar} from "../../actions/carActions";

const AddCarForm = () => {
    const {width} = useWindowDimensions();
    const dispatch = useDispatch();
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [yearProduction, setYearProduction] = useState('');
    const [engineType, setEngineType] = useState('');
    const [engineCapacity, setEngineCapacity] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCar(brand, model, yearProduction, engineType, engineCapacity, description));
    }
    return (
        <Form className="form" onSubmit={handleSubmit}>
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
                    <input type="text" placeholder="Pojemność silnika"
                           value={engineCapacity}
                           onChange={(e) => setEngineCapacity(e.target.value)}/>
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

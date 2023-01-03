import React, {useEffect} from "react";
import "../../styles/find-car-form.css";
import {Col, Form, FormGroup, Row} from "reactstrap";
import '../../styles/add-car-form.css';
import useWindowDimensions from "../WindowDimension/WindowDimension";

const AddCarForm = () => {
    const {width } = useWindowDimensions();
    return (
        <Form className="form">
            <div className=" d-flex justify-content-around flex-wrap">
                <FormGroup className="form__group">
                    <input type="text" placeholder="Marka" />
                </FormGroup>

                <FormGroup className="form__group">
                    <input type="text" placeholder="Model" required />
                </FormGroup>

                <FormGroup className="form__group">
                    <input type="text" placeholder="Rok produkcji" />
                </FormGroup>

                <FormGroup className="form__group">
                    <input type="text" placeholder="Typ silnika"/>
                </FormGroup>
                <FormGroup className="justify-content-b form__group">
                    <input type="text" placeholder="Pojemność silnika"/>
                </FormGroup>
            </div>
            <div className={'d-flex flex-wrap justify-content-around mt-2'}>
                <textarea type="text" className='textarea__add__car__form mb-0' placeholder="Opis samochodu"/>
                <button className={width >= 768 ? "btn add__car-btn" : "btn add__car-btn mt-2"}>Dodaj samochód</button>

            </div>

        </Form>
    );
};

export default AddCarForm;

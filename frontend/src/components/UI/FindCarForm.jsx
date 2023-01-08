import React, {useEffect, useState} from "react";
import "../../styles/find-car-form.css";
import '../../styles/select-component.css'
import {Form, FormGroup} from "reactstrap";
import SelectComponent from "../SelectBoxWithSearch/SelectComponent";
import {useDispatch, useSelector} from "react-redux";
import {listCars} from "../../actions/carActions";
import {listMechanicalServices} from "../../actions/mechanicalServicesActions";

const FindCarForm = () => {

    const mechanicalServices = useSelector(state => state.mechanicalServicesList);
    const {cars} = mechanicalServices;
    const [options,setOptions] = useState([]);
    const dispatch = useDispatch();

    function fillData() {

    }

    useEffect(() => {

    }, [cars]);

    const [selectedMechanicalService, setSelectedMechanicalService] = useState("");

    return (
        <Form className="form">
            <div className=" d-flex align-items-center justify-content-between flex-wrap">
                <FormGroup className="form__group">
                    <input type="text" placeholder="From address" required/>
                </FormGroup>

                <FormGroup className="form__group">
                    <input type="text" placeholder="To address" required/>
                </FormGroup>

                <FormGroup className="form__group">
                    <input type="date" placeholder="Journey date" required/>
                </FormGroup>

                <FormGroup className="form__group" onClick={() => {
                    dispatch(listMechanicalServices())
                    fillData();
                }}>

                    <SelectComponent
                        options={options}
                        onChange={(item) => setSelectedMechanicalService(item)}
                        selectedKey={selectedMechanicalService}
                        placeholder={"Wyszukaj usługę"}
                    />

                </FormGroup>
                <FormGroup className="select__group">
                    <select>
                        <option value="ac">AC Car</option>
                        <option value="non-ac">Non AC Car</option>
                    </select>
                </FormGroup>

                <FormGroup className="form__group">
                    <button className="btn find__car-btn">Find Car</button>
                </FormGroup>
            </div>
        </Form>
    );
};

export default FindCarForm;

import React, {useEffect, useState} from "react";
import "../../styles/find-car-form.css";
import '../../styles/select-component.css'
import {Form, FormGroup} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {listMechanicalServices} from "../../actions/mechanicalServicesActions";

const FindCarForm = () => {

    const mechanicalServices = useSelector(state => state.mechanicalServicesList);
    const {cars} = mechanicalServices;
    const dispatch = useDispatch();

    function fillData() {

    }

    useEffect(() => {
        // options = []
        // cars.forEach(data => {
        //     options.push({
        //             key: data.id, value: data.name
        //         }
        //     )
        // })
        // options = [...options]
        // console.log(options)
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

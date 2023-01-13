import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import Snackbar from "../components/Snackbar/Snackbar";
import SnackbarType from "../components/Snackbar/SnackbarType";
import Helmet from "../components/Helmet/Helmet";
import React, {useEffect, useRef, useState} from "react";
import {addMechanicalService, updateMechanicalService} from "../actions/mechanicalServicesActions";
import {MECHANICAL_SERVICE_ADD_RESET, MECHANICAL_SERVICE_UPDATE_RESET} from "../constants/mechanicalServicesConstants";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const AddMechanicalService = () => {

    const addedMechanicalServiceId = useSelector((state) => state.addedMechanicalServiceId);
    const {mechanicalServiceId} = addedMechanicalServiceId;
    const [name, setName] = useState('');
    const [expectedServiceCost, setExpectedServiceCost] = useState('');
    const [expectedExecutionTime, setExpectedExecutionTime] = useState('');
    const dispatch = useDispatch();
    const snackbarRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (expectedExecutionTime !== 0 && expectedExecutionTime !== '') {
            dispatch(
                addMechanicalService(
                    name,
                    expectedExecutionTime,
                    expectedServiceCost,
                )
            );
        }
        if (expectedExecutionTime === 0 || expectedExecutionTime === '') {
            dispatch(
                addMechanicalService(
                    name,
                    '00:01',
                    expectedServiceCost,
                )
            );
        }
        dispatch({type: MECHANICAL_SERVICE_ADD_RESET});
        snackbarRef.current.show();
    }
    // if(mechanicalServiceId) {
    //     const timer = setTimeout(() =>{
    //         navigate('/mechanical-services/employee')
    //     },3000)
    // }
    return (
        <Helmet title="Dodawanie usługi mechanicznej">
            <MDBContainer fluid>
                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol
                                className='d-flex flex-column align-items-center justify-content-md-start'>
                                <span className={'login__title'}><h1>Dodawanie usługi: {name}</h1></span>
                                <form className={'login__form'} autoComplete="off" onSubmit={handleSubmit}>
                                    <label htmlFor="name">Nazwa:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="name"
                                        autoComplete="off"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={'Nazwa'}
                                        required
                                    />
                                    <label htmlFor="lastName">Szacowany koszt:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="number"
                                        min={'10'}
                                        max={'9999'}
                                        id="expectedServiceCost"
                                        autoComplete="off"
                                        value={expectedServiceCost}
                                        onChange={(e) => setExpectedServiceCost(e.target.value)}
                                        placeholder={'Szacowany koszt'}
                                        required
                                    />

                                    <label htmlFor="email">Szacowany czas:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="time"
                                        id="email"
                                        autoComplete="off"
                                        min={'00:15'}
                                        max={'10:00'}
                                        step={'900'}
                                        value={expectedExecutionTime}
                                        onChange={(e) => setExpectedExecutionTime(e.target.value)}
                                        placeholder={'Szacowany czas'}
                                        required={!name.startsWith('Diagnostyka')}
                                    />
                                    <button className={'profile__button'} type={"submit"}>Zatwierdź</button>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
            <Snackbar
                ref={snackbarRef}
                message="Usługa została pomyślnie dodana!"
                type={SnackbarType.success}
            />
        </Helmet>
    )
}

export default AddMechanicalService;
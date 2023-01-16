import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import Snackbar from "../components/Snackbar/Snackbar";
import SnackbarType from "../components/Snackbar/SnackbarType";
import Helmet from "../components/Helmet/Helmet";
import React, {useEffect, useRef, useState} from "react";
import {addMechanicalService, updateMechanicalService} from "../actions/mechanicalServicesActions";
import {MECHANICAL_SERVICE_ADD_RESET, MECHANICAL_SERVICE_UPDATE_RESET} from "../constants/mechanicalServicesConstants";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RABAT_CODE_ADD_RESET} from "../constants/rabatCodeConstants";
import {addRabatCode} from "../actions/rabatCodeActions";

const AddRabatCode = () => {

    const rabatCodeAddedId = useSelector((state) => state.rabatCodeAddedId);
    const {rabatCodeId} = rabatCodeAddedId;
    const [code, setCode] = useState('');
    const [discountSize, setDiscountSize] = useState('');
    const dispatch = useDispatch();
    const snackbarRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            addRabatCode(
                code,
                discountSize,
            )
        );
        dispatch({type: RABAT_CODE_ADD_RESET});
        snackbarRef.current.show();
    }

    return (
        <Helmet title="Dodawanie kodu">
            <MDBContainer fluid>
                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol
                                className='d-flex flex-column align-items-center justify-content-md-start'>
                                <span className={'login__title'}><h1>Dodawanie kodu: {code}</h1></span>
                                <form className={'login__form'} autoComplete="off" onSubmit={handleSubmit}>
                                    <label htmlFor="name">Kod:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="name"
                                        autoComplete="off"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder={'Kod'}
                                        required
                                    />
                                    <label htmlFor="lastName">Wielkość zniżki:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="number"
                                        min={'1'}
                                        max={'100'}
                                        id="discountSize"
                                        autoComplete="off"
                                        value={discountSize}
                                        onChange={(e) => setDiscountSize(e.target.value)}
                                        placeholder={'Wielkość zniżki'}
                                        required
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
                message="Kod został pomyślnie dodany!"
                type={SnackbarType.success}
            />
        </Helmet>
    )
}

export default AddRabatCode;
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Helmet from "../components/Helmet/Helmet";
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import Snackbar from "../components/Snackbar/Snackbar";
import SnackbarType from "../components/Snackbar/SnackbarType";
import {useNavigate, useParams} from "react-router-dom";
import {MECHANICAL_SERVICE_UPDATE_RESET} from "../constants/mechanicalServicesConstants";
import {detailsMechanicalService, updateMechanicalService} from "../actions/mechanicalServicesActions";
import {RABAT_CODE_UPDATE_RESET} from "../constants/rabatCodeConstants";
import {detailsRabatCode, updateRabatCode} from "../actions/rabatCodeActions";

const EditRabatCode = () => {
    const {id} = useParams();
    const rabatCodeDetails = useSelector((state) => state.rabatCodeDetails);
    const {rabatCode} = rabatCodeDetails;
    const [code, setCode] = useState('');
    const [discountSize, setDiscountSize] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updateRabatCode(
                id,
                code,
                discountSize,
            )
        );
        navigate('/rabat-codes/employee')
    }


    useEffect(() => {
        if (!rabatCode || (rabatCode.id) !== id) {
            dispatch(detailsRabatCode(id));
            dispatch({type: RABAT_CODE_UPDATE_RESET});
        }
        window.scroll(0, 100)
    }, [dispatch]);

    useEffect(() => {
        if (rabatCode) {
            setCode(rabatCode.code)
            setDiscountSize(rabatCode.discountSize)
        }
    }, [rabatCode])

    return (
        <Helmet title="Edycja kodu rabatowego">
            <MDBContainer fluid>
                <MDBCard className='text-black mt-3' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol
                                className='d-flex flex-column align-items-center justify-content-md-start'>
                                <span className={'login__title'}><h1>Edycja kodu: {code}</h1></span>
                                <form className={'login__form'} autoComplete="off" onSubmit={handleSubmit}>
                                    <label htmlFor="name">Kod:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="code"
                                        autoComplete="off"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder={'Kod'}
                                        required
                                        minLength={3}
                                    />
                                    <label htmlFor="lastName">Wysokość zniżki:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="number"
                                        min={'1'}
                                        max={'100'}
                                        id="discountSize"
                                        autoComplete="off"
                                        value={discountSize}
                                        onChange={(e) => setDiscountSize(e.target.value)}
                                        placeholder={'Wysokość zniżki'}
                                        required
                                    />
                                    <button className={'profile__button'} type={"submit"}>Zatwierdź</button>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </Helmet>
    );
};
export default EditRabatCode;
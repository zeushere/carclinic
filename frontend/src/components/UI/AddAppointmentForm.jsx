import React, {useEffect, useRef, useState} from "react";
import "../../styles/find-car-form.css";
import '../../styles/select-component.css'
import {Form, FormGroup} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import 'jquery/dist/jquery'
import * as PropTypes from "prop-types";
import date from "moment";
import moment from "moment";
import * as dayjs from 'dayjs'
import {Dayjs} from 'dayjs'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker, LocalizationProvider, plPL} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import 'dayjs/locale/pl';
import {useDispatch, useSelector} from "react-redux";
import {listCars} from "../../actions/carActions";
import {rabatCodeDiscount} from "../../actions/rabatCodeActions";
import Snackbar from "../Snackbar/Snackbar";
import SnackbarType from "../Snackbar/SnackbarType";
import {availableWorkingPeriodList} from "../../actions/workingPeriodActions";
import {addAppointment} from "../../actions/appointmentActions";
import {APPOINTMENT_ADD_RESET, APPOINTMENT_UPDATE_PAYMENT_RESET} from "../../constants/appointmentConstants";
import {RABAT_CODE_DISCOUNT_RESET} from "../../constants/rabatCodeConstants";

function StaticDateRangePicker(props) {
    return null;
}

StaticDateRangePicker.propTypes = {
    disablePast: PropTypes.bool,
    disableCloseOnSelect: PropTypes.bool,
    onChange: PropTypes.any,
    onOpen: PropTypes.func,
    calendars: PropTypes.number,
    onMonthChange: PropTypes.func,
    open: PropTypes.func,
    displayStaticWrapperAs: PropTypes.string
};

const AddAppointmentForm = () => {

    const [mechanicalServiceId, setMechanicalServiceId] = useState(null);
    const [mechanicalServiceName, setMechanicalServiceName] = useState(null);
    const [mechanicalServiceExpectedServiceCost, setMechanicalServiceExpectedServiceCost] = useState(null);
    const [mechanicalServiceExpectedServiceTime, setMechanicalServiceExpectedServiceTime] = useState(null);
    const [typeOfWork, setTypeOfWork] = useState(null);
    const [typeOfPayment, setTypeOfPayment] = useState(null);
    const [fromTime, setFromTime] = useState(null);
    const [carId, setCarId] = useState(null);
    const [description, setDescription] = useState(null);
    const [rabatCode, setRabatCode] = useState(null);
    const [cost, setCost] = useState(0);
    const [isRemote, setIsRemote] = useState(false);
    const rabatDiscount = useSelector(state => state.rabatDiscount)
    const {discount} = rabatDiscount;
    const [rabatActivated, setRabatActivated] = useState(false);
    const formRef = useRef(null);
    const fromTimeRef = useRef(null);
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin;
    const isUserRegularCustomer = useSelector((state) => state.isUserRegularCustomer);
    const {regularCustomer} = isUserRegularCustomer
    const carsList = useSelector(state => state.carList);
    const {cars} = carsList;
    const availableWorkingPeriod = useSelector(state => state.availableWorkingPeriods);
    const {availableWorkingPeriods} = availableWorkingPeriod;
    const dispatch = useDispatch();
    const snackBarRefAddRabatCodeSuccess = useRef(null);
    const snackBarRefAddRabatCodeFail = useRef(null);
    const snackBarRefAddRabatCodeWarning = useRef(null);
    const snackBarRefAddAppointmentSuccess = useRef(null);
    const snackBarRefAddAppointmentFail = useRef(null);
    const snackBarRefLeakData = useRef(null);
    let navigate = useNavigate();
    const [value, setValue] = useState(
        dayjs(date.now())
    );
    const paidAppointment = useSelector(state => state.paidAppointment);
    const {appointmentPaid} = paidAppointment;
    const snackBarRefAppointmentPaid = useRef(null);

    const addedAppointment = useSelector(state => state.addedAppointment);
    const {appointment, loading, error} = addedAppointment;
    const [userAddedAppointment, setUserAddedAppointment] = useState(null);

    useEffect(() => {
        if(appointmentPaid){

            localStorage.removeItem('fromTime');
            localStorage.removeItem('date')
            localStorage.removeItem('repairType');
            localStorage.removeItem('paymentType');
            localStorage.removeItem("cost");
            localStorage.removeItem("appointment");
            localStorage.removeItem("description");
            localStorage.removeItem("mechanicalServiceExpectedServiceCost");
            localStorage.removeItem("carId");

            snackBarRefAppointmentPaid.current.show();
            setCost('')
            dispatch({type: APPOINTMENT_UPDATE_PAYMENT_RESET});
            window.scrollTo(0, 400);
        }
    },[appointmentPaid])

    useEffect(() => {
        if (appointment) {
            snackBarRefAddAppointmentSuccess.current.show();
            setCost('')
            setRabatCode('')
            setFromTime('')
            setDescription('')
            setTypeOfWork('')
            setTypeOfPayment('')
            setDescription('')
            setValue(Date.now())
            setCarId('')
            dispatch({type: APPOINTMENT_ADD_RESET});
            localStorage.removeItem('addedAppointment')
        }
    }, [appointment])
    useEffect(() => {
        fillMechanicalService();
    }, [typeOfWork, fromTime, carId, typeOfPayment, rabatCode, rabatActivated, description, dispatch])

    useEffect(() => {
        console.log(value)
        if (mechanicalServiceId && typeOfWork && value) {
            getAvailableWorkingPeriods(mechanicalServiceId, typeOfWork, value)
        }
    }, [typeOfWork, value])

    function getAvailableWorkingPeriods(mechanicalServiceId, typeOfWork, value) {
        let formattedDate = value.format('YYYY-MM-DD');

        dispatch(availableWorkingPeriodList(mechanicalServiceId, typeOfWork, formattedDate))
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(listCars());
        }
    }, [])

    useEffect(() => {
        if (discount) {
            calculateDiscount();
            dispatch({type: RABAT_CODE_DISCOUNT_RESET});
        }
    }, [discount])

    function fillMechanicalService() {
        if (!mechanicalServiceId) {
            setMechanicalServiceId(localStorage.getItem('mechanicalServiceId'))
            setMechanicalServiceName(localStorage.getItem('mechanicalServiceName'))
            setMechanicalServiceExpectedServiceCost(localStorage.getItem('mechanicalServiceExpectedServiceCost'))
            setMechanicalServiceExpectedServiceTime(localStorage.getItem('mechanicalServiceExpectedExecutionTime'))
            if (regularCustomer) {
                const regularCustomerDiscount = Math.round((localStorage.getItem('mechanicalServiceExpectedServiceCost') * 10) / 100)
                setCost(localStorage.getItem('mechanicalServiceExpectedServiceCost') - regularCustomerDiscount);
            } else if (!regularCustomer) {
                setCost(localStorage.getItem('mechanicalServiceExpectedServiceCost'))

            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userInfo) {
            navigate('/login')
        }
        if (!fromTime || !typeOfPayment || !typeOfWork || !value || !mechanicalServiceId) {
            snackBarRefLeakData.current.show();
            return;
        }
        if (typeOfPayment === 'Przy odbiorze') {
            dispatch(addAppointment(value, fromTime, description, typeOfWork, typeOfPayment, cost, mechanicalServiceId, carId));
        } else if (typeOfPayment === 'Online') {

            localStorage.setItem('fromTime', fromTime);
            localStorage.setItem('date', value.format('YYYY-MM-DD'))
            localStorage.setItem('repairType', typeOfWork);
            localStorage.setItem('paymentType', typeOfPayment);
            localStorage.setItem("cost", cost);
            localStorage.setItem("carId", carId);
            localStorage.setItem("description", description);

            navigate('/payment-screen')
            setCost('')
        }
    }

    useEffect(() => {
            setUserAddedAppointment(addedAppointment.appointment)
        }
        , [addedAppointment.appointment])

    const theme = createTheme(
        {
            palette: {
                primary: {main: '#1976d2'},
            },
        },
        plPL,
    );

    function changeHandler(e) {

    }

    function isCalendarShouldOpen() {
        if (localStorage.getItem('mechanicalServiceId') == null) {
            return true;
        } else {
            return false;
        }
    }


    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
    };

    const isWeekend = (date: Dayjs) => {
        const day = date.day();

        return day === 0 || day === 6;
    };


    function onChangeTypeOfWork(event) {
        setTypeOfWork(event.target.value)
        if (fromTime !== null) {
            setFromTime(null);
            document.getElementById('fromToValue').value = ''
        }
        if (event.target.value === 'Zdalna' && !isRemote) {
            setCost(() => parseInt(cost) + 70)
            setIsRemote(() => true);
        } else if (isRemote && event.target.value === 'Tradycyjna') {
            setCost(() => parseInt(cost) - 70)
            setIsRemote(() => false);

        }
    }

    function onChangeFromTime(event) {
        setFromTime(event.target.value)
    }

    function onChangeCarId(event) {
        if (event.target.value === '') {
            setCarId(null)
        } else {
            setCarId(event.target.value)
        }
    }

    function onChangeTypeOfPayment(event) {
        setTypeOfPayment(event.target.value)

    }

    function onChangeDescription(event) {
        setDescription(event.target.value)
    }

    function setRabatCodeToCheck(event) {
        setRabatCode(event.target.value);
    }


    function isRabatCodeCheckBeActive() {
        if (localStorage.getItem('mechanicalServiceId') === null || typeOfWork === null) {
            return true;
        } else {
            return false;
        }
    }

    function checkRabatCode() {
        if (rabatCode !== '' && rabatCode !== null && typeOfWork !== null) {
            dispatch(rabatCodeDiscount(rabatCode));
        } else {
            return;
        }
    }

    function calculateDiscount() {
        if (discount && !rabatActivated) {
            setCost(() => Math.round(cost - ((cost * discount) / 100)));
            setRabatActivated(() => true)
            snackBarRefAddRabatCodeSuccess.current.show()
        } else if(discount && rabatActivated){
            snackBarRefAddRabatCodeWarning.current.show()
        }
    }

    function navigateToMechanicalServices() {
        navigate('/mechanical-services')
    }

    return (
        <div>
            <Form id={'addAppointmentForm'} className="form" ref={formRef}>
                <div className=" d-flex align-items-center justify-content-between flex-wrap">
                    <FormGroup className="form__group text-center">
                        {localStorage.getItem('mechanicalServiceId') === null ?
                            <Link className={'btn find__service-btn'} to={'/mechanical-services'}>Wybierz typ
                                usługi</Link>
                            :
                            <span onClick={() => navigateToMechanicalServices()} style={{color: "green"}}><i
                                title={`Wybrano typ usługi: ${mechanicalServiceName}`}
                                className="fa fa-check-circle fa-2x"
                                aria-hidden="true"></i>
                        <p>Usługa została dodana</p></span>}

                    </FormGroup>

                    <FormGroup className="form__group">
                        <ThemeProvider theme={theme}>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs} adapterLocale="pl"
                                localeText={plPL.components.MuiLocalizationProvider.defaultProps.localeText}>
                                <DesktopDatePicker
                                    shouldDisableDate={isWeekend}
                                    className={'form-select'}
                                    label="Wybierz datę"
                                    disabled={isCalendarShouldOpen()}
                                    minDate={Date.now()}
                                    maxDate={moment('12/31/2023').toDate()}
                                    inputFormat="YYYY-MM-DD"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </ThemeProvider>
                    </FormGroup>

                    <FormGroup className="form__group">
                        <select onChange={(e) => onChangeTypeOfPayment(e)} value={typeOfPayment} className="form-select"
                                aria-label="Default select example"
                        >
                            <option value="" disabled selected hidden>Typ płatności</option>
                            <option value="Online">Online</option>
                            <option value="Przy odbiorze">Przy odbiorze</option>

                        </select>

                    </FormGroup>

                    <FormGroup className="form__group">
                        <select id='addAppointmentTypeOfWork' value={typeOfWork}
                                onChange={(e) => onChangeTypeOfWork(e)}
                                className="form-select" aria-label="Default select example"
                                disabled={rabatActivated}

                        >
                            <option value='' disabled selected hidden>Typ naprawy</option>
                            <option value="Tradycyjna">Tradycyjna</option>
                            <option value="Zdalna">Zdalna</option>

                        </select>


                    </FormGroup>
                    <FormGroup className="form__group">
                        <select id='fromToValue' ref={fromTimeRef}
                                title={!typeOfWork ? 'Aby wybrać godzinę najpierw wybierz typ naprawy' : null}
                                className="form-select"
                                aria-label="Default select example"
                                disabled={!typeOfWork || isCalendarShouldOpen()}
                                onChange={(e) => onChangeFromTime(e)}
                                value={fromTime}
                        >
                            <option value="" disabled selected hidden>Wybierz godzinę</option>
                            {
                                availableWorkingPeriods?.length !== 0 ? availableWorkingPeriods?.map((item) => (
                                    <option
                                        value={item.time}>{item.time.substr(0, 5)}</option>
                                )) : <option value="">Brak dostępnych godzin</option>
                            }
                        </select>


                    </FormGroup>
                    <FormGroup className="form__group">
                        <select id='addAppointmentCarValue' className="form-select"
                                aria-label="Default select example" value={carId}
                                onChange={(e) => onChangeCarId(e)}
                        >
                            <option value="" disabled selected hidden>Jeśli dodałeś samochód - możesz go wybrać
                            </option>
                            {
                                userInfo && cars?.length !== 0 ? cars?.map((item) => (
                                    <option
                                        value={item.id}>{item.brand} {item.model} {item.yearProduction} {item.engineType}</option>
                                )) : <option value="">Brak dodanych samochodów</option>
                            }


                        </select>


                    </FormGroup>
                    <FormGroup className="form__group">
                  <textarea onChange={(e) => onChangeDescription(e)}
                            rows="1"
                            placeholder="Opcjonalny opis problemu"
                            className="textarea appointment__description"
                            style={{resize: "none", width: "335%"}}
                            value={description}
                  ></textarea>
                    </FormGroup>


                </div>
                <div className={'d-flex flex-wrap justify-content-between'}><FormGroup className="form__group"
                                                                                       style={{}}>
                    <input disabled={rabatActivated} placeholder={'Kod rabatowy'} value={rabatCode}
                           onChange={(e) => setRabatCodeToCheck(e)}
                           className="input-group input-group__rabat__code mb-2" aria-label="Default select example"
                           style={{width: "100%"}}
                    >
                    </input>
                </FormGroup>
                    <FormGroup className="form__group">
                        <Link id={'rabatCodeButton'} className={'btn find__rabat__code-btn'}

                              disabled={isRabatCodeCheckBeActive() || rabatActivated} onClick={() => checkRabatCode()}
                              to={'#'}>Sprawdź
                            kod

                        </Link>
                    </FormGroup>


                    <FormGroup className="form__group mt-3 text-center">
                            <span
                                className={'font-weight-bold appointment__cost__span'}>Podsumowanie: {parseInt(cost) ? cost : 0} zł</span>
                    </FormGroup>
                </div>

                <FormGroup className="form__group mt-3 text-center w-100">
                    <button type={'submit'} onClick={(e) => handleSubmit(e)} className="btn find__car-btn"
                            style={{width: "35%"}}>Zarezerwuj wizytę
                    </button>
                </FormGroup>
                <div className={'paypal-button-container'}>

                </div>
            </Form>
            <Snackbar
                ref={snackBarRefAddRabatCodeSuccess}
                message="Pomyślnie dodano kod rabatowy!"
                type={SnackbarType.success}
            />
            <Snackbar
                ref={snackBarRefAddRabatCodeSuccess}
                message="Pomyślnie dodano kod rabatowy!"
                type={SnackbarType.success}
            />
            <Snackbar
                ref={snackBarRefAddAppointmentSuccess}
                message="Pomyślnie dodano zgłoszenie!"
                type={SnackbarType.success}
            />
            <Snackbar
                ref={snackBarRefAddRabatCodeFail}
                message="Kod rabatowy jest niepoprawny!"
                type={SnackbarType.fail}
            />
            <Snackbar
                ref={snackBarRefAddRabatCodeWarning}
                message="Dodałeś już kod rabatowy!"
                type={SnackbarType.success}
            />
            <Snackbar
                ref={snackBarRefLeakData}
                message="Uzupełnij brakujące dane!"
                type={SnackbarType.fail}
            />
            <Snackbar
                ref={snackBarRefAddAppointmentFail}
                message="Nie udalo się dodać rezerwacji!
                Spróbuj ponownie"
                type={SnackbarType.fail}
            />
            <Snackbar
                ref={snackBarRefAppointmentPaid}
                message="Pomyślnie opłacono zamówienie!"
                type={SnackbarType.success}
            />

        </div>
    );
};

export default AddAppointmentForm;

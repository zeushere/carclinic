import React, {useEffect, useRef, useState} from 'react';
import '../styles/appointment-view.css'
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {detailsCar} from "../actions/carActions";
import {
    deleteAppointment,
    getDetailsAppointment,
    payAppointment,
    setCompleteAppointment, setInProgressAppointment
} from "../actions/appointmentActions";
import moment from "moment";
import SnackbarType from "../components/Snackbar/SnackbarType";
import Snackbar from "../components/Snackbar/Snackbar";


const AppointmentView = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const appointmentOfDayDetails = useSelector(state => state.appointmentOfDayDetails);
    const {appointmentOfDay} = appointmentOfDayDetails;
    let formattedDate = moment(moment()).format('YYYY-MM-DD');
    let formattedTime = moment(moment()).format('HH:mm:SS');

    const snackbarRefChangeStatusAppointment = useRef(null);
    const snackbarRefPayAppointment = useRef(null);


    function checkIsCanBeCancelled(date, time, repairStatus) {
        let dateToCheck = moment(date).format('YYYY-MM-DD');
        if (moment(dateToCheck).isBefore(formattedDate)) {
            return true;
        } else if (moment(dateToCheck).isSame(formattedDate) && (parseInt(time.substr(0, 2)) < parseInt(formattedTime.substr(0, 2)))) {
            return true;
        } else if (moment(dateToCheck).isSame(formattedDate) && (parseInt(time.substr(0, 2)) === parseInt(formattedTime.substr(0, 2)) && parseInt(formattedTime.substr(3, 2)) > parseInt(time.substr(3, 2)))) {
            return true;
        }
        if(repairStatus === 'Wykonane') {
            return true;
        }
    }

    function checkIsCanBePaid(paymentStatus) {
        if(paymentStatus === 'Opłacone')
            return true;
    }

    function checkIsCanBeInProgress(repairStatus) {
        if(repairStatus !== 'Zgłoszone')
            return true;
    }
    function checkIsCanBeCompleted(repairStatus) {
        if(repairStatus === 'Wykonane')
            return true;
    }


    const deleteHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz anulować zgłoszenie?')) {
            dispatch(deleteAppointment(id));
            navigate('/appointments')
        }
    };

    const inProgressHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz zmienić status na W trakcie?')) {
            dispatch(setInProgressAppointment(id))
            snackbarRefChangeStatusAppointment.current.show()
        }
    };

    const completeHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz zmienić status na Wykonane?')) {
            dispatch(setCompleteAppointment(id));
            snackbarRefChangeStatusAppointment.current.show()
        }
    };

    const payHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz opłacić zgłoszenie?')) {
            dispatch(payAppointment(id));
            snackbarRefPayAppointment.current.show()
        }
    };

    useEffect(() => {
        dispatch(getDetailsAppointment(id))
    },[dispatch])

    return (
        <section className="section about-section" id="about">
            <div className="container align-items-center">
                <div className="row justify-content-center">
                    <div className="col-8 ">
                        <div className="about-text go-to text-center">
                            <h3 className="dark-color">Zgłoszenie {appointmentOfDay?.day}</h3>
                            <h6 className="theme-color lead mt-4">{appointmentOfDay?.mechanicalService}</h6>
                            <p className={'description__section'}>
                                {appointmentOfDay?.description ? appointmentOfDay?.description : 'Brak opisu'}
                            </p>
                            <div className="row about-list mt-4">
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>Czas wykonania</label>
                                        <p>{appointmentOfDay?.fromTime.substr(0,5)}</p>
                                    </div>
                                    <div className="media">
                                        <label>Czas ukończenia</label>
                                        <p>{appointmentOfDay?.toTime.substr(0,5)}</p>
                                    </div>
                                    <div className="media">
                                        <label>Typ naprawy</label>
                                        <p>{appointmentOfDay?.repairType}</p>
                                    </div>
                                    <div className="media">
                                        <label>Status naprawy</label>
                                        <p>{appointmentOfDay?.repairStatus}</p>
                                    </div>
                                    <div className="media">
                                        <label>Typ płatności</label>
                                        <p>{appointmentOfDay?.paymentType}</p>
                                    </div>
                                    <div className="media">
                                        <label>Status płatności</label>
                                        <p>{appointmentOfDay?.paymentStatus}</p>
                                    </div>
                                    <div className="media">
                                        <label>Koszt usługi</label>
                                        <p>{appointmentOfDay?.appointmentCost} zł</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>E-mail</label>
                                        <p>{appointmentOfDay?.userEmail}</p>
                                    </div>
                                    <div className="media">
                                        <label>Imię</label>
                                        <p>{appointmentOfDay?.userFirstName}</p>
                                    </div>
                                    <div className="media">
                                        <label>Nazwisko</label>
                                        <p>{appointmentOfDay?.userLastName}</p>
                                    </div>
                                    <div className="media">
                                        <label>Marka</label>
                                        <p>{appointmentOfDay?.carBrand ? appointmentOfDay.carBrand : 'Nie podano'}</p>
                                    </div>
                                    <div className="media">
                                        <label>Model</label>
                                        <p>{appointmentOfDay?.carModel ? appointmentOfDay.carModel : 'Nie podano'}</p>
                                    </div>
                                    <div className="media">
                                        <label>Rok produkcji</label>
                                        <p>{appointmentOfDay?.yearProduction ? appointmentOfDay.yearProduction : 'Nie podano'}</p>
                                    </div>
                                    <div className="media">
                                        <label>Typ silnika</label>
                                        <p>{appointmentOfDay?.engineType ? appointmentOfDay.engineType : 'Nie podano'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="counter">
                    <div className="row">
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <button type="button" className="btn btn-danger btn-lg appointment_car__link m-2"
                                        disabled={checkIsCanBeCancelled(appointmentOfDay?.date? appointmentOfDay.date : '', appointmentOfDay?.fromTime ? appointmentOfDay.fromTime : '', appointmentOfDay?.repairStatus? appointmentOfDay.repairStatus : '')}
                                        onClick={() => deleteHandler(appointmentOfDay?.appointmentId)}><Link to={'#'}
                                                                                                            className="appointment_car__link">Anuluj</Link>
                                </button>
                                <p className="m-0px font-w-600">Anuluj zgłoszenie</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <button type="button" className="btn btn-warning btn-lg appointment_car__link m-2"
                                        disabled={checkIsCanBeInProgress(appointmentOfDay?.repairStatus?  appointmentOfDay.repairStatus : '')}
                                        onClick={() => inProgressHandler(appointmentOfDay?.appointmentId)}><Link to={'#'}
                                                                                                             className="appointment_car__link">W trakcie</Link>
                                </button>
                                <p className="m-0px font-w-600">Zmień status na <b>W trakcie</b></p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <button type="button" className="btn btn-success  btn-lg appointment_car__link m-2"
                                        disabled={checkIsCanBeCompleted(appointmentOfDay?.repairStatus?  appointmentOfDay.repairStatus : '')}
                                        onClick={() => completeHandler(appointmentOfDay?.appointmentId)}><Link to={'#'}
                                                                                                             className="appointment_car__link">Wykonane</Link>
                                </button>
                                <p className="m-0px font-w-600">Zmień status na <b>Wykonane</b></p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <button type="button" className="btn btn-lg btn-primary appointment_car__link m-2"
                                        disabled={checkIsCanBePaid(appointmentOfDay?.paymentStatus? appointmentOfDay.paymentStatus : '')}
                                        onClick={() => payHandler(appointmentOfDay?.appointmentId)}><Link to={'#'}
                                                                                                             className="appointment_car__link">Opłać</Link>
                                </button>
                                <p className="m-0px font-w-600">Opłać zgłoszenie</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                ref={snackbarRefPayAppointment}
                message="Pomyślnie opłacono zgłoszenie!"
                type={SnackbarType.success}
            />
            <Snackbar
                ref={snackbarRefChangeStatusAppointment}
                message="Pomyślnie zmienono status zgłoszenia!"
                type={SnackbarType.success}
            />
        </section>
    );
}

export default AppointmentView;
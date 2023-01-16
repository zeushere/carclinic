import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MdClose} from "react-icons/md";
import {Link} from "react-router-dom";
import '../../styles/appointment-car-history.css'
import mechanicalServices from "./MechanicalServices";
import dayjs from "dayjs";
import moment from "moment";
import {deleteCar} from "../../actions/carActions";
import {CAR_DELETE_RESET} from "../../constants/carConstants";
import Snackbar from "../Snackbar/Snackbar";
import SnackbarType from "../Snackbar/SnackbarType";
import {deleteAppointment} from "../../actions/appointmentActions";

const AppointmentsCarHistory = (props) => {
    const appointmets = useSelector(state => state.carAppointments);
    const {carAppointments} = appointmets;
    const dispatch = useDispatch();
    const snackbarRefDeleteAppointment = useRef(null);


    let formattedDate = moment(moment()).format('YYYY-MM-DD');
    let formattedTime = moment(moment()).format('HH:mm:SS');

    function checkDate(date, time, repairStatus) {
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

    const deleteHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz anulować zgłoszenie?')) {
            dispatch(deleteAppointment(id));
            snackbarRefDeleteAppointment.current.show();
            dispatch({type: CAR_DELETE_RESET});
        }
    };

    function checkRepairStatusIsCompleted(carAppointment) {
        if(carAppointment.repairStatus === 'Wykonane'){
            return true
        }
    }

    useEffect(() => {
        window.scrollTo(0, 700);
    },[])

    return (
        <div className="table-responsive-md">
            <div className={'text-right mb-0'}>
                <MdClose className={'hide_faults__button'} size={'30px'} onClick={() =>
                    props.setCarAppointmentsViewFlag(!props.carAppointmentsViewFlag)
                }/>
            </div>
            <div className="table-responsive-md m-0">
                <table className="table table-faults mb-0" style={{color: "white"}}>
                    <thead className="text-center">
                    <tr className={'table-th'}>
                        <th>Nazwa usługi</th>
                        <th>Data wykonania</th>
                        <th>Godzina wykonania</th>
                        <th>Typ naprawy</th>
                        <th>Status naprawy</th>
                        <th>Typ płatności</th>
                        <th>Status płatności</th>
                        <th>Koszt usługi</th>
                        <th>Akcja</th>
                    </tr>
                    </thead>
                    {carAppointments?.map((carAppointment) => (
                        <tbody className="align-middle text-center">
                        <tr
                            style={checkRepairStatusIsCompleted(carAppointment) && {color : "lawngreen"}}
                            key={carAppointment?.appointmentId} className={'table-th'}>
                            <td>{carAppointment?.mechanicalService} </td>
                            <td>{carAppointment?.date} </td>
                            <td>{carAppointment?.fromTime.substr(0, 5)} </td>
                            <td>{carAppointment?.repairType} </td>
                            <td>{carAppointment?.repairStatus} </td>
                            <td>{carAppointment?.paymentType} </td>
                            <td>{carAppointment?.paymentStatus} </td>
                            <td>{carAppointment?.appointmentCost} zł</td>
                            <td>
                                <button type="button" className="btn btn-danger btn-lg appointment_car__link "
                                        disabled={checkDate(carAppointment?.date, carAppointment?.fromTime, carAppointment?.repairStatus)}
                                        onClick={() => deleteHandler(carAppointment?.appointmentId)}><Link to={'#'}
                                                                                                 className="appointment_car__link">Anuluj</Link>
                                </button>
                                {/*<button type="button" className="btn btn-primary btn-lg appointment_car__link m-2 "*/}
                                {/*        disabled={carAppointment?.paymentStatus === 'Opłacone' || carAppointment?.paymentType !== 'Online' || checkDate(carAppointment?.date, carAppointment?.fromTime)}*/}
                                {/*        onClick={() => getAppointment(carAppointment?.id)}><Link to={'/home'}*/}
                                {/*                                                                 className="appointment_car__link">Opłać</Link>*/}
                                {/*</button>*/}
                            </td>
                        </tr>
                        </tbody>
                    ))}
                    {carAppointments?.length === 0 && <tbody className="align-middle text-center">
                    <tr  className={'table-th'}>
                        <td>Brak</td>
                        <td>Brak</td>
                        <td>Brak</td>
                        <td>Brak</td>
                        <td>Brak</td>
                        <td>Brak</td>
                        <td>Brak</td>
                        <td>Brak</td>
                        <td>Brak</td>

                    </tr>
                    </tbody>
                    }
                </table>

            </div>
            <Snackbar
                ref={snackbarRefDeleteAppointment}
                message="Pomyślnie anulowano zgłoszenie!"
                type={SnackbarType.success}
            />
        </div>
    );
};

export default AppointmentsCarHistory;

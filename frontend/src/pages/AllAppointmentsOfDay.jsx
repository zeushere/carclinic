import React, {useEffect, useRef, useState} from 'react';
import {Col, Container, Row} from "reactstrap";
import SnackbarType from "../components/Snackbar/SnackbarType";
import Snackbar from "../components/Snackbar/Snackbar";
import useWindowDimensions from "../components/WindowDimension/WindowDimension";
import {useDispatch, useSelector} from "react-redux";
import {deleteAppointment, listAppointmentsOfDay, listUserAppointments} from "../actions/appointmentActions";
import {Link} from "react-router-dom";
import moment from "moment/moment";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {DesktopDatePicker, LocalizationProvider, plPL} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TextField} from "@mui/material";
import {Dayjs} from "dayjs";
import * as dayjs from "dayjs";
import date from "moment/moment";

const AllAppointmentsOfDay = () => {
    const snackbarRefDeleteAppointment = useRef(null);
    const {width} = useWindowDimensions();
    const dispatch = useDispatch();
    const allAppointmentsForDay = useSelector(state => state.allAppointmentsOfDay);
    const {allAppointmentsOfDay} = allAppointmentsForDay;
    const [value, setValue] = useState(
        dayjs(date.now())
    );

    let formattedDate = moment(moment()).format('YYYY-MM-DD');
    let formattedTime = moment(moment()).format('HH:mm:SS');

    function checkDate(date, time) {
        let dateToCheck = moment(date).format('YYYY-MM-DD');
        if (moment(dateToCheck).isBefore(formattedDate)) {
            return true;
        } else if (moment(dateToCheck).isSame(formattedDate) && (parseInt(time.substr(0, 2)) < parseInt(formattedTime.substr(0, 2)))) {
            return true;
        } else if (moment(dateToCheck).isSame(formattedDate) && (parseInt(time.substr(0, 2)) === parseInt(formattedTime.substr(0, 2)) && parseInt(formattedTime.substr(3, 2)) > parseInt(time.substr(3, 2)))) {
            return true;
        }
    }

    useEffect(() => {
        if(value) {
            let formattedDate = value.format('YYYY-MM-DD');
            dispatch(listAppointmentsOfDay(formattedDate))
        }
    }, [dispatch, value]);

    function connectCarVars(brand, model) {
        return brand + ' ' + model;
    }
    function checkRepairStatusIsDone(appointment) {
        if(appointment.repairStatus === 'Wykonane' && appointment.paymentStatus === 'Opłacone'){
            return true
        }
    }

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
    };

    const isWeekend = (date: Dayjs) => {
        const day = date.day();

        return day === 0 || day === 6;
    };

    const theme = createTheme(
        {
            palette: {
                primary: {main: '#1976d2'},
            },
        },
        plPL,
    );

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12" md='12' className={'text-center mb-4'}>
                        <h2 className="section__title">Panel zgłoszeń</h2>
                    </Col>
                </Row>
                <Row className={'justify-content-center mt-2 mb-4'}>
                    <Col lg='4'>
                        <ThemeProvider theme={theme}>
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs} adapterLocale="pl"
                                localeText={plPL.components.MuiLocalizationProvider.defaultProps.localeText}>
                                <DesktopDatePicker
                                    shouldDisableDate={isWeekend}
                                    className={'form-select'}
                                    label="Wybierz datę"
                                    minDate={moment('01/02/2023').toDate()}
                                    maxDate={moment('12/31/2023').toDate()}
                                    inputFormat="YYYY-MM-DD"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </ThemeProvider>
                    </Col>
                </Row>
                <Row>
                    <div className="table-responsive-lg mt-5">
                        <table className="table table-faults mb-0" style={{color: "white"}}>
                            <thead className="text-center">
                            <tr className={'table-th'}>
                                <th>Nazwa usługi</th>
                                <th>Godzina wykonania</th>
                                <th>Godzina zakończenia</th>
                                <th>Typ naprawy</th>
                                <th>Status naprawy</th>
                                <th>Typ płatności</th>
                                <th>Status płatności</th>
                                <th>Koszt usługi</th>
                                <th>Samochód</th>
                                <th>Akcja</th>
                            </tr>
                            </thead>
                            {allAppointmentsOfDay?.map((appointment) => (
                                <tbody className="align-middle text-center">
                                <tr style={checkRepairStatusIsDone(appointment) && {color : "lawngreen"}}


                                    key={appointment?.appointmentId} className={'table-th'}>
                                    <td>{appointment?.mechanicalService} </td>
                                    <td>{appointment?.fromTime.substr(0, 5)} </td>
                                    <td>{appointment?.toTime.substr(0, 5)} </td>
                                    <td>{appointment?.repairType} </td>
                                    <td>{appointment?.repairStatus} </td>
                                    <td>{appointment?.paymentType} </td>
                                    <td>{appointment?.paymentStatus} </td>
                                    <td>{appointment?.appointmentCost} zł</td>
                                    <td>{appointment.carModel ? connectCarVars(appointment.carBrand, appointment.carModel) : 'Nie dodano'}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary btn-lg appointment_car__link m-2">
                                            <Link to={`/appointments/${appointment?.appointmentId}`} className="appointment_car__link">Podgląd</Link>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            ))}
                            {allAppointmentsOfDay?.length === 0 && <tbody className="align-middle text-center">
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
                                <td>Brak</td>
                            </tr>
                            </tbody>
                            }
                        </table>
                    </div>
                </Row>
                <Snackbar
                    ref={snackbarRefDeleteAppointment}
                    message="Pomyślnie usunięto zgłoszenie!"
                    type={SnackbarType.success}
                />
            </Container>
        </section>
    );
}

export default AllAppointmentsOfDay;
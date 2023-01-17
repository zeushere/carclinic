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
import sortTable from "../components/table-sorting/table-sorting";
import $ from "jquery";
import {
    APPOINTMENT_DELETE_RESET,
    APPOINTMENT_SET_COMPLETE_RESET,
    APPOINTMENT_SET_IN_PROGRESS_RESET, APPOINTMENT_UPDATE_PAYMENT_RESET
} from "../constants/appointmentConstants";

const AllAppointmentsOfDay = () => {
    const snackbarRefDeleteAppointment = useRef(null);
    const snackbarRefChangeStatusAppointment = useRef(null);
    const snackbarRefPayAppointment = useRef(null);

    const {width} = useWindowDimensions();
    const dispatch = useDispatch();
    const allAppointmentsForDay = useSelector(state => state.allAppointmentsOfDay);
    const {allAppointmentsOfDay} = allAppointmentsForDay;
    const appointmentDelete = useSelector((state) => state.appointmentDelete);
    const {loading, error, success} = appointmentDelete;
    const [value, setValue] = useState(
        dayjs(date.now())
    );

    const setProgressAppointment = useSelector(state => state.setProgressAppointment);
    const {setInProgressAppointment} = setProgressAppointment;
    const setCompletedAppointment = useSelector(state => state.setCompletedAppointment);
    const {setCompleteAppointment} = setCompletedAppointment;
    const paidAppointment = useSelector(state => state.paidAppointment);
    const {appointmentPaid} = paidAppointment;

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
        if (setInProgressAppointment) {
            snackbarRefChangeStatusAppointment.current.show();
            dispatch({type: APPOINTMENT_SET_IN_PROGRESS_RESET})
        }
    }, [setInProgressAppointment])

    useEffect(() => {
        if (setCompleteAppointment) {
            snackbarRefChangeStatusAppointment.current.show();
            dispatch({type: APPOINTMENT_SET_COMPLETE_RESET})
        }
    }, [setCompleteAppointment])

    useEffect(() => {
        if (appointmentPaid) {
            snackbarRefPayAppointment.current.show();
            dispatch({type: APPOINTMENT_UPDATE_PAYMENT_RESET})
        }
    }, [appointmentPaid])


    useEffect(() => {
        if (success) {
            snackbarRefDeleteAppointment.current.show();
            dispatch({type: APPOINTMENT_DELETE_RESET})
        }
    }, [success])

    useEffect(() => {
        if (value) {
            let formattedDate = value.format('YYYY-MM-DD');
            dispatch(listAppointmentsOfDay(formattedDate))
        }
    }, [dispatch, value]);

    function connectCarVars(brand, model) {
        return brand + ' ' + model;
    }

    function checkRepairStatusIsCompleted(appointment) {
        if (appointment.repairStatus === 'Wykonane') {
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
    $(document).ready(function () {
        $("#myInput").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr:not(:first)").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

    function sortAllAppointemntsOfDay(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable");
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount++;
            } else {
                /* If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again. */
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

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
                <Row className={'justify-content-end mr-4'}>
                    <Col lg='2' className={''}>
                        <input className={'search__box'} id="myInput" type="text" placeholder="Szukaj"/>
                    </Col>
                </Row>
                <Row>
                    <div className="table-responsive-lg mt-3">
                        <table id="myTable" className="table table-faults mb-0" style={{color: "white"}}>
                            <thead className="text-center">
                            <tr className={'table-th'}>
                                <th onClick={() => sortAllAppointemntsOfDay(0)}>Nazwa usługi</th>
                                <th onClick={() => sortAllAppointemntsOfDay(1)}>Godzina wykonania</th>

                                <th onClick={() => sortAllAppointemntsOfDay(2)}>Godzina zakończenia</th>
                                <th onClick={() => sortAllAppointemntsOfDay(3)}>Typ naprawy</th>
                                <th onClick={() => sortAllAppointemntsOfDay(4)}>Status naprawy</th>
                                <th onClick={() => sortAllAppointemntsOfDay(5)}>Typ płatności</th>
                                <th onClick={() => sortAllAppointemntsOfDay(6)}>Status płatności</th>
                                <th onClick={() => sortAllAppointemntsOfDay(7)}>Koszt usługi</th>
                                <th onClick={() => sortAllAppointemntsOfDay(8)}>Samochód</th>
                                <th>Akcja</th>
                            </tr>
                            </thead>
                            {allAppointmentsOfDay?.map((appointment) => (
                                <tbody className="align-middle text-center">
                                <tr style={checkRepairStatusIsCompleted(appointment) && {color: "lawngreen"}}


                                    key={appointment?.appointmentId} className={'table-th'} iskey={true}>
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
                                        <button type="button"
                                                className="btn btn-primary btn-lg appointment_car__link m-2">
                                            <Link to={`/appointments/${appointment?.appointmentId}`}
                                                  className="appointment_car__link">Podgląd</Link>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            ))}
                            {allAppointmentsOfDay?.length === 0 && <tbody className="align-middle text-center">
                            <tr className={'table-th'}>
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
            </Container>
        </section>

    );
}

export default AllAppointmentsOfDay;

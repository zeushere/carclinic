import React, {useEffect, useRef} from 'react';
import {Col, Container, Row} from "reactstrap";
import SnackbarType from "../components/Snackbar/SnackbarType";
import Snackbar from "../components/Snackbar/Snackbar";
import useWindowDimensions from "../components/WindowDimension/WindowDimension";
import {useDispatch, useSelector} from "react-redux";
import {deleteAppointment, listUserAppointments} from "../actions/appointmentActions";
import {Link} from "react-router-dom";
import moment from "moment/moment";
import $ from 'jquery'
import {APPOINTMENT_DELETE_RESET} from "../constants/appointmentConstants";

const UserAppointments = () => {
    const snackbarRefDeleteAppointment = useRef(null);
    const {width} = useWindowDimensions();
    const dispatch = useDispatch();
    const appointmentList = useSelector(state => state.appointmentList);
    const {userAppointments} = appointmentList;
    const appointmentDelete = useSelector((state) => state.appointmentDelete);
    const {loading, error, success} = appointmentDelete;

    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myTable tr:not(:first)").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
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
        if(repairStatus === 'Wykonane'){
            return true;
        }
    }

    const deleteHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz anulować zgłoszenie?')) {
            dispatch(deleteAppointment(id));
            snackbarRefDeleteAppointment.current.show();
            dispatch({type: APPOINTMENT_DELETE_RESET})

        }
    };



    useEffect(() => {
        dispatch(listUserAppointments());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listUserAppointments());
    }, [success]);

    function connectCarVars(brand, model) {
        return brand + ' ' + model;
    }
    function checkRepairStatusIsCompleted(userAppointment) {
        if(userAppointment.repairStatus === 'Wykonane'){
            return true;
        }
    }
    function sortUserAppointments(n) {
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
                switchcount ++;
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
                        <h2 className="section__title">Twoje zgłoszenia</h2>
                    </Col>
                </Row>
                    <Row className={'justify-content-end'}>
                    <Col lg= '2' className={'mb-4'}>
                    <div className="search__box mr-3">
                        <input id="myInput" type="text" placeholder="Szukaj"/>
                    </div>
                    </Col>
                    </Row>

                <Row>

                    <div className="table-responsive-lg m-0">
                        <table id="myTable" className="table table-faults mb-0" style={{color: "white"}}>
                            <thead className="text-center">
                            <tr className={'table-th'}>
                                <th onClick={() => sortUserAppointments(0)}>Nazwa usługi</th>
                                <th onClick={() => sortUserAppointments(1)}>Data wykonania</th>
                                <th onClick={() => sortUserAppointments(2)}>Godzina wykonania</th>
                                <th onClick={() => sortUserAppointments(3)}>Typ naprawy</th>
                                <th onClick={() => sortUserAppointments(4)}>Status naprawy</th>
                                <th onClick={() => sortUserAppointments(5)}>Typ płatności</th>
                                <th onClick={() => sortUserAppointments(6)}>Status płatności</th>
                                <th onClick={() => sortUserAppointments(7)}>Koszt usługi</th>
                                <th onClick={() => sortUserAppointments(8)}>Samochód</th>
                                <th>Akcja</th>
                            </tr>
                            </thead>
                            {userAppointments?.map((userAppointment) => (
                                <tbody className="align-middle text-center">
                                <tr style={checkRepairStatusIsCompleted(userAppointment) && {color : "lawngreen"}}
                                    key={userAppointment?.appointmentId} className={'table-th'}>
                                    <td>{userAppointment?.mechanicalService} </td>
                                    <td>{userAppointment?.date} </td>
                                    <td>{userAppointment?.fromTime.substr(0, 5)} </td>
                                    <td>{userAppointment?.repairType} </td>
                                    <td>{userAppointment?.repairStatus} </td>
                                    <td>{userAppointment?.paymentType} </td>
                                    <td>{userAppointment?.paymentStatus} </td>
                                    <td>{userAppointment?.appointmentCost} zł</td>
                                    <td>{userAppointment.carModel ? connectCarVars(userAppointment.carBrand, userAppointment.carModel) : 'Nie dodano'}</td>
                                    <td>
                                        <button type="button" className="btn btn-danger btn-lg appointment_car__link m-2"
                                                disabled={checkDate(userAppointment?.date, userAppointment?.fromTime, userAppointment?.repairStatus)}
                                                onClick={() => deleteHandler(userAppointment?.appointmentId)}><Link to={'#'}
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
                            {userAppointments?.length === 0 && <tbody className="align-middle text-center">
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
                    message="Pomyślnie anulowano zgłoszenie!"
                    type={SnackbarType.success}
                />
            </Container>
        </section>
    );
}

export default UserAppointments;
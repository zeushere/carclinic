import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef} from "react";
import {deleteMechanicalService, listMechanicalServices} from "../actions/mechanicalServicesActions";
import Helmet from "../components/Helmet/Helmet";
import {Link, useNavigate} from "react-router-dom";
import {Col, Container, Row} from "reactstrap";
import '../styles/mechanical-service-employee.css'
import SnackbarType from "../components/Snackbar/SnackbarType";
import Snackbar from "../components/Snackbar/Snackbar";
import {deleteUserByAdmin, getUsersWithUserRole} from "../actions/userActions";
import $ from "jquery";

export const UsersAdmin = () => {

    const mechanicalServicesList = useSelector(state => state.mechanicalServicesList);
    const {mechanicalServices} = mechanicalServicesList;
    const isUserDeletedByAdmin = useSelector((state) => state.isUserDeletedByAdmin);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = isUserDeletedByAdmin;
    const usersWithUserRoleList = useSelector(state => state.usersWithUserRole);
    const {users} = usersWithUserRoleList;
    const dispatch = useDispatch();
    const snackbarRefDeleteUser = useRef(null);
    const navigate = useNavigate();

    const addUserHandler = (e) => {
        if (window.confirm('Czy na pewno chcesz dodać użytkownika?')) {
            navigate('/users/admin/add/')
        }
    }

    const deleteUserHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz usunąć użytkownika?')) {
            dispatch(deleteUserByAdmin(id));
            snackbarRefDeleteUser.current.show();
        }
    };

    useEffect(() => {
        dispatch(getUsersWithUserRole())
    }, [dispatch])

    useEffect(() => {
            dispatch(getUsersWithUserRole())
     }, [successDelete])

    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myTable tr:not(:first)").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

    function sortUsersAdmin(n) {
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
        <Helmet title="Panel użytkowników">
            <section>
                <Container>
                    <Row>
                        <Col lg="12" md='12' className={'text-center mb-5'}>
                            <h2 className="section__title">Panel zarządzania użytkownikami</h2>
                        </Col>
                        <Row className={'justify-content-center'}>
                            <Col  md={'3'}><button className={'btn add__mechanical__service__btn'} onClick={() => addUserHandler()}><Link to={'#'}>Dodaj użytkownika</Link></button></Col></Row>
                    </Row>
                    <Row>
                        <Col lg={'12'} md={'12'}>
                            <div className="table-responsive-md m-5">
                                <Row className={'justify-content-end mr-3 mb-2'}>
                                    <Col lg= '2' className={'search__box'}>
                                        <input id="myInput" type="text" placeholder="Szukaj"/>
                                    </Col>
                                </Row>
                                <table id="myTable" className="table table-faults mb-0 mt-3" style={{color: "white"}}>
                                    <thead className="text-center">
                                    <tr className={'table-th'}>
                                        <th onClick={() =>sortUsersAdmin(0)}>Email</th>
                                        <th onClick={() =>sortUsersAdmin(1)}>Login</th>
                                        <th onClick={() =>sortUsersAdmin(2)}>Imię</th>
                                        <th onClick={() =>sortUsersAdmin(3)}>Nazwisko</th>
                                        <th>Akcja</th>
                                    </tr>
                                    </thead>
                                    {users?.map((user) => (
                                        <tbody className="align-middle text-center">
                                        <tr key={user?.id} className={'table-th'}>
                                            <td>{user?.email} </td>
                                            <td>{user?.login} </td>
                                            <td>{user?.firstName}</td>
                                            <td>{user?.lastName}</td>
                                            <td className={'mechanical__service__link'}>
                                                <button type="button"
                                                        className="btn btn-danger btn-lg appointment_car__link m-2"
                                                        onClick={() => deleteUserHandler(user?.id)}><Link
                                                    to={'#'}
                                                    className="appointment_car__link">Usuń</Link>
                                                </button>
                                                <button type="button"
                                                        className="btn btn-lg mechanicalService__button edit-mechanical-service-button btn-warning"
                                                ><Link
                                                    to={`/users/admin/edit/${user?.id}`} className="">Edytuj</Link></button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    ))}
                                    {users?.length === 0 && <tbody className="align-middle text-center">
                                    <tr  className={'table-th'}>
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
                        </Col>
                    </Row>
                    <Snackbar
                        ref={snackbarRefDeleteUser}
                        message="Pomyślnie usunięto użytkownika!"
                        type={SnackbarType.success}
                    />
                </Container>
            </section>
        </Helmet>
    )
}
export default UsersAdmin;
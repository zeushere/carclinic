import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef} from "react";
import {deleteMechanicalService, listMechanicalServices} from "../actions/mechanicalServicesActions";
import Helmet from "../components/Helmet/Helmet";
import {Link, useNavigate} from "react-router-dom";
import {Col, Container, Row} from "reactstrap";
import '../styles/mechanical-service-employee.css'
import SnackbarType from "../components/Snackbar/SnackbarType";
import Snackbar from "../components/Snackbar/Snackbar";
import $ from "jquery";

export const MechanicalServiceEmployee = () => {

    const mechanicalServicesList = useSelector(state => state.mechanicalServicesList);
    const {mechanicalServices} = mechanicalServicesList;
    const mechanicalServiceDelete = useSelector((state) => state.mechanicalServiceDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = mechanicalServiceDelete;
    const dispatch = useDispatch();
    const snackbarRefDeleteMechanicalService = useRef(null);
    const navigate = useNavigate();

    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myTable tr:not(:first)").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

    const addMechanicalServiceHandler = (e) => {
        if (window.confirm('Czy na pewno chcesz dodać usługę?')) {
            navigate('/mechanical-services/employee/add/')
        }
    }

    const deleteHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz usunąć usługę?')) {
            dispatch(deleteMechanicalService(id));
            snackbarRefDeleteMechanicalService.current.show();
        }
    };

    useEffect(() => {
        dispatch(listMechanicalServices())
    }, [dispatch])

    useEffect(() => {
            dispatch(listMechanicalServices())
    }, [successDelete])


    function sortEmployeeMechanicalServices(n) {
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
        <Helmet title="Usługi Mechaniczne">
            <section>
                <Container>
                    <Row>
                        <Col lg="12" md='12' className={'text-center mb-4'}>
                            <h2 className="section__title">Panel usług mechanicznych</h2>
                        </Col>
                        <Row className={'justify-content-center'}>
                            <Col  md={'3'}><button className={'btn add__mechanical__service__btn'} onClick={() => addMechanicalServiceHandler()}><Link to={'#'}>Dodaj usługę</Link></button></Col></Row>
                    </Row>
                    <Row className={'justify-content-end mr-5'}>
                        <Col lg= '2' className={'search__box'}>
                            <input id="myInput" type="text" placeholder="Szukaj"/>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={'12'} md={'12'}>

                            <div className="table-responsive-md mt-3 m-4">
                                <table id="myTable" className="table table-faults mb-0" style={{color: "white"}}>
                                    <thead className="text-center">
                                    <tr className={'table-th'}>
                                        <th onClick={() => sortEmployeeMechanicalServices(0)}>Nazwa usługi</th>
                                        <th onClick={() => sortEmployeeMechanicalServices(1)}>Czas wykonania</th>
                                        <th onClick={() => sortEmployeeMechanicalServices(2)}>Koszt usługi</th>
                                        <th>Akcja</th>
                                    </tr>
                                    </thead>
                                    {mechanicalServices?.map((mechanicalService) => (
                                        <tbody className="align-middle text-center">
                                        <tr key={mechanicalService?.id} className={'table-th'}>
                                            <td>{mechanicalService?.name} </td>
                                            <td>{mechanicalService.expectedExecutionTime?.substr(0, 5)}{mechanicalService.expectedExecutionTime ? ' h' : 'Zależny od usterki'} </td>
                                            <td>{mechanicalService?.expectedServiceCost} {mechanicalService?.expectedServiceCost ? ' zł' : 'Do uzgodnienia'}</td>
                                            <td className={'mechanical__service__link'}>
                                                <button type="button"
                                                        className="btn btn-danger btn-lg appointment_car__link m-2"
                                                        onClick={() => deleteHandler(mechanicalService?.id)}><Link
                                                    to={'#'}
                                                    className="appointment_car__link">Usuń</Link>
                                                </button>
                                                <button type="button"
                                                        className="btn btn-lg mechanicalService__button edit-mechanical-service-button btn-warning"
                                                        ><Link
                                                    to={`/mechanical-services/employee/edit/${mechanicalService?.id}`} className="">Edytuj</Link></button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    ))}
                                    {mechanicalServices?.length === 0 && <tbody className="align-middle text-center">
                                    <tr  className={'table-th'}>
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
                        ref={snackbarRefDeleteMechanicalService}
                        message="Pomyślnie usunięto usługę!"
                        type={SnackbarType.success}
                    />
                </Container>
            </section>
        </Helmet>
    )
}
export default MechanicalServiceEmployee;
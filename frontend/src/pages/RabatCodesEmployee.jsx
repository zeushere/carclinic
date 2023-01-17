import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef} from "react";
import {deleteMechanicalService, listMechanicalServices} from "../actions/mechanicalServicesActions";
import Helmet from "../components/Helmet/Helmet";
import {Link, useNavigate} from "react-router-dom";
import {Col, Container, Row} from "reactstrap";
import '../styles/mechanical-service-employee.css'
import SnackbarType from "../components/Snackbar/SnackbarType";
import Snackbar from "../components/Snackbar/Snackbar";
import {deleteRabatCode, listRabatCodes} from "../actions/rabatCodeActions";
import $ from "jquery";
import {RABAT_CODE_ADD_RESET, RABAT_CODE_UPDATE_RESET} from "../constants/rabatCodeConstants";

export const RabatCodesEmployee = () => {

    const rabatCodesList = useSelector(state => state.rabatCodesList);
    const {rabatCodes} = rabatCodesList;
    const rabatCodeAddedId = useSelector((state) => state.rabatCodeAddedId);
    const {rabatCodeId} = rabatCodeAddedId;
    const rabatCodeUpdate = useSelector((state) => state.rabatCodeUpdate);
    const {success} = rabatCodeUpdate;
    const rabatCodeDelete = useSelector((state) => state.rabatCodeDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = rabatCodeDelete;
    const dispatch = useDispatch();
    const snackbarRefDeleteRabatCode = useRef(null);
    const navigate = useNavigate();
    const snackbarRef = useRef(null);
    const snackbarRefUpdate = useRef(null);



    const addRabatCodeHandler = (e) => {
        if (window.confirm('Czy na pewno chcesz dodać kod?')) {
            navigate('/rabat-codes/employee/add/')
        }
    }

    const deleteRabatCodeHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz usunąć kod?')) {
            dispatch(deleteRabatCode(id));
            snackbarRefDeleteRabatCode.current.show();
        }
    };

    useEffect(() => {
        dispatch(listRabatCodes())
    }, [dispatch])

    useEffect(() => {
            dispatch(listRabatCodes())
    }, [successDelete])

    useEffect(() => {
        if(rabatCodeId) {
            dispatch(listRabatCodes())
            snackbarRef.current.show()
            dispatch({type: RABAT_CODE_ADD_RESET});
        }

    },[rabatCodeId])

    useEffect(() => {
        if(success) {
            dispatch(listRabatCodes())
            snackbarRefUpdate.current.show()
            dispatch({type: RABAT_CODE_UPDATE_RESET});
        }

    },[success])



    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myTable tr:not(:first)").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

    function sortRabatCodes(n) {
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
        <Helmet title="Kody rabatowe">
            <section>
                <Container>
                    <Row>
                        <Col lg="12" md='12' className={'text-center mb-5'}>
                            <h2 className="section__title">Panel kodów rabatowych</h2>
                        </Col>
                        <Row className={'justify-content-center'}>
                            <Col md={'3'}>
                                <button className={'btn add__mechanical__service__btn'}
                                        onClick={() => addRabatCodeHandler()}><Link to={'#'}>Dodaj kod rabatowy</Link>
                                </button>
                            </Col></Row>

                    </Row>
                    <Row>

                            <div className="table-responsive-md m-4">
                                <Row className={'justify-content-end mr-3 mb-3'}>
                                    <Col lg= '2' className={'search__box'}>
                                        <input id="myInput" type="text" placeholder="Szukaj"/>
                                    </Col>
                                </Row>
                                <Col md={'12'}>
                                <table id="myTable" className="table table-faults mb-0" style={{color: "white"}}>
                                    <thead className="text-center">
                                    <tr className={'table-th'}>
                                        <th className={'text-center'} onClick={() => sortRabatCodes(0)}>Kod rabatowy</th>
                                        <th className={''} onClick={() => sortRabatCodes(1)}>Wysokość zniżki</th>
                                        <th>Akcja</th>
                                    </tr>
                                    </thead>
                                    {rabatCodes?.map((rabatCode) => (
                                        <tbody className="align-middle text-center">
                                        <tr key={rabatCode?.id} className={'table-th'}>
                                            <td>{rabatCode?.code} </td>
                                            <td>{rabatCode?.discountSize} %</td>
                                            <td className={'mechanical__service__link'}>
                                                <button type="button"
                                                        className="btn btn-danger btn-lg appointment_car__link m-2"
                                                        onClick={() => deleteRabatCodeHandler(rabatCode?.id)}><Link
                                                    to={'#'}
                                                    className="appointment_car__link">Usuń</Link>
                                                </button>
                                                <button type="button"
                                                        className="btn btn-lg mechanicalService__button edit-mechanical-service-button btn-warning"
                                                ><Link
                                                    to={`/rabat-codes/employee/edit/${rabatCode?.id}`}
                                                    className="">Edytuj</Link></button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    ))}
                                    {rabatCodes?.length === 0 && <tbody className=" text-center">
                                    <tr className={'table-th'}>
                                        <td>Brak</td>
                                        <td>Brak</td>
                                        <td>Brak</td>
                                    </tr>
                                    </tbody>
                                    }
                                </table>
                                </Col>
                            </div>
                    </Row>
                    <Snackbar
                        ref={snackbarRefDeleteRabatCode}
                        message="Pomyślnie usunięto kod!"
                        type={SnackbarType.success}
                    />
                    <Snackbar
                        ref={snackbarRef}
                        message="Kod został pomyślnie dodany!"
                        type={SnackbarType.success}
                    />
                    <Snackbar
                        ref={snackbarRefUpdate}
                        message="Kod został pomyślnie zaktualizowany!"
                        type={SnackbarType.success}
                    />
                </Container>
            </section>
        </Helmet>
    )
}
export default RabatCodesEmployee;
import React, {useEffect} from "react";
import '../../styles/mechanical-service.css'
import CommonSection from "./CommonSection";
import Helmet from "../Helmet/Helmet";
import {useDispatch, useSelector} from "react-redux";
import {MdClose} from "react-icons/md";
import {listMechanicalServices} from "../../actions/mechanicalServicesActions";
import {Link} from "react-router-dom";
import $ from "jquery";
import {Col, Container, Row} from "reactstrap";

export const MechanicalServices = () => {

    const mechanicalServicesList = useSelector(state => state.mechanicalServicesList);
    const {mechanicalServices} = mechanicalServicesList;
    const dispatch = useDispatch();

    function getMechanicalServiceId (mechanicalServiceId) {
        localStorage.setItem('mechanicalServiceId', mechanicalServiceId.id);
        localStorage.setItem('mechanicalServiceName', mechanicalServiceId.name);
        localStorage.setItem('mechanicalServiceExpectedServiceCost', mechanicalServiceId.expectedServiceCost)
        localStorage.setItem('mechanicalServiceExpectedExecutionTime', mechanicalServiceId.expectedExecutionTime.substr(0, 5))
    }

    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myTable tr:not(:first)").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
    function sortMechanicalServices(n) {
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
    useEffect(() => {
        dispatch(listMechanicalServices())
    },[dispatch])
    return (
        <Helmet title="Usługi Mechaniczne">
            <CommonSection title="Usługi mechaniczne"/>
            <Container>
                <Row>
                    <Col className={'mb-2 col-3'} style={{width: "100%"}}>
                        <Col className={'col-9'}></Col>
                        <input className={'search__box'} id="myInput" type="text" placeholder="Szukaj"/>
                    </Col>
                </Row>
                <Row>

            <div className="table-responsive-md mb-3 service_table">

                <Row className="justify-content-end">

                </Row>
                <table className="table table-faults mb-0 " id="myTable" style={{color: "white"}}>
                    <thead className="text-center">
                    <tr className={'table-th'}>
                        <th onClick={() => sortMechanicalServices(0)}>Nazwa usługi</th>
                        <th onClick={() => sortMechanicalServices(1)}>Czas wykonania</th>
                        <th onClick={() => sortMechanicalServices(2)}>Koszt usługi</th>
                        <th>Wybór</th>
                    </tr>
                    </thead>
                    {mechanicalServices?.map((mechanicalService) => (
                        <tbody className="align-middle text-center">
                        <tr key={mechanicalService?.id} className={'table-th'}>
                            <td>{mechanicalService?.name} </td>
                            <td>{mechanicalService.expectedExecutionTime?.substr(0, 5)}{mechanicalService.expectedExecutionTime ? ' h' : 'Zależny od usterki'} </td>
                            <td>{mechanicalService?.expectedServiceCost} {mechanicalService?.expectedServiceCost ? ' zł' : 'Do uzgodnienia'}</td>
                            <td className={'mechanical__service__link'}>
                                <button type="button" className="btn btn-primary btn-lg mechanicalService__button "
                                onClick={() => getMechanicalServiceId(mechanicalService)}><Link to={'/home'} className= "">Wybierz</Link></button>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>

            </div>
                </Row>
            </Container>
        </Helmet>
    )
}
export default MechanicalServices;
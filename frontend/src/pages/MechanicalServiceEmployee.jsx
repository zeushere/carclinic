import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef} from "react";
import {deleteMechanicalService, listMechanicalServices} from "../actions/mechanicalServicesActions";
import Helmet from "../components/Helmet/Helmet";
import {Link, useNavigate} from "react-router-dom";
import {Col, Container, Row} from "reactstrap";
import '../styles/mechanical-service-employee.css'
import SnackbarType from "../components/Snackbar/SnackbarType";
import Snackbar from "../components/Snackbar/Snackbar";

export const MechanicalServiceEmployee = () => {

    const mechanicalServicesList = useSelector(state => state.mechanicalServicesList);
    const {mechanicalServices} = mechanicalServicesList;
    const mechanicalServiceDelete = useSelector((state) => state.mechanicalServiceDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = mechanicalServiceDelete;
    const dispatch = useDispatch();
    const snackbarRefDeleteMechanicalService = useRef(null);
    const navigate = useNavigate();

    const addMechanicalServiceHandler = (e) => {
        if (window.confirm('Czy na pewno chcesz dodać usługę?')) {
            navigate('/mechanical-services/employee/add/')
        }
    }

    const deleteHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz usunąć usługę?')) {
            dispatch(deleteMechanicalService(id));
        }
    };

    useEffect(() => {
        dispatch(listMechanicalServices())
    }, [dispatch])

    useEffect(() => {
        if(successDelete){
            snackbarRefDeleteMechanicalService.current.show();
            dispatch(listMechanicalServices())
        }

    }, [successDelete])
    return (
        <Helmet title="Usługi Mechaniczne">
            <section>
                <Container>
                    <Row>
                        <Col lg="12" md='12' className={'text-center mb-5'}>
                            <h2 className="section__title">Panel usług mechanicznych</h2>
                        </Col>
                        <Row className={'justify-content-center'}>
                            <Col  md={'3'}><button className={'btn add__mechanical__service__btn'} onClick={() => addMechanicalServiceHandler()}><Link to={'#'}>Dodaj usługę</Link></button></Col></Row>
                    </Row>
                    <Row>
                        <Col lg={'12'} md={'12'}>
                            <div className="table-responsive-md m-5">
                                <table className="table table-faults mb-0" style={{color: "white"}}>
                                    <thead className="text-center">
                                    <tr className={'table-th'}>
                                        <th>Nazwa usługi</th>
                                        <th>Czas wykonania</th>
                                        <th>Koszt usługi</th>
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
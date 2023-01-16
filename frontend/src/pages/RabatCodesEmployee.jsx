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

export const RabatCodesEmployee = () => {

    const rabatCodesList = useSelector(state => state.rabatCodesList);
    const {rabatCodes} = rabatCodesList;
    const rabatCodeDelete = useSelector((state) => state.rabatCodeDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = rabatCodeDelete;
    const dispatch = useDispatch();
    const snackbarRefDeleteRabatCode = useRef(null);
    const navigate = useNavigate();

    const addRabatCodeHandler = (e) => {
        if (window.confirm('Czy na pewno chcesz dodać kod?')) {
            navigate('/rabat-codes/employee/add/')
        }
    }

    const deleteRabatCodeHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz usunąć kod?')) {
            dispatch(deleteRabatCode(id));
        }
    };

    useEffect(() => {
        dispatch(listRabatCodes())
    }, [dispatch])

    useEffect(() => {
        if (successDelete) {
            snackbarRefDeleteRabatCode.current.show();
            dispatch(listRabatCodes())
        }

    }, [successDelete])
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
                        <Col lg={'12'} md={'12'}>
                            <div className="table-responsive-md m-5">
                                <table className="table table-faults mb-0" style={{color: "white"}}>
                                    <thead className="text-center">
                                    <tr className={'table-th'}>
                                        <th>Kod rabatowy</th>
                                        <th>Wielkość zniżki</th>
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
                                    {rabatCodes?.length === 0 && <tbody className="align-middle text-center">
                                    <tr className={'table-th'}>
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
                        ref={snackbarRefDeleteRabatCode}
                        message="Pomyślnie usunięto kod!"
                        type={SnackbarType.success}
                    />
                </Container>
            </section>
        </Helmet>
    )
}
export default RabatCodesEmployee;
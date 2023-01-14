import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef} from "react";
import {deleteMechanicalService, listMechanicalServices} from "../actions/mechanicalServicesActions";
import Helmet from "../components/Helmet/Helmet";
import {Link, useNavigate} from "react-router-dom";
import {Col, Container, Row} from "reactstrap";
import '../styles/mechanical-service-employee.css'
import SnackbarType from "../components/Snackbar/SnackbarType";
import Snackbar from "../components/Snackbar/Snackbar";
import {
    deleteUserByAdmin,
    getUsersWithAdminRole,
    getUsersWithEmployeeRole,
    getUsersWithUserRole
} from "../actions/userActions";

export const AdminsAdmin = () => {

    const mechanicalServicesList = useSelector(state => state.mechanicalServicesList);
    const {mechanicalServices} = mechanicalServicesList;
    const isUserDeletedByAdmin = useSelector((state) => state.isUserDeletedByAdmin);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = isUserDeletedByAdmin;
    const usersWithAdminRoleList = useSelector(state => state.usersWithAdminRole);
    const {admins} = usersWithAdminRoleList;
    const dispatch = useDispatch();
    const snackbarRefDeleteEmployee = useRef(null);
    const navigate = useNavigate();

    const addUserHandler = (e) => {
        if (window.confirm('Czy na pewno chcesz dodać administratora?')) {
            navigate('/admins/admin/add')
        }
    }

    const deleteUserHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz usunąć administratora?')) {
            dispatch(deleteUserByAdmin(id));
        }
    };

    useEffect(() => {
        dispatch(getUsersWithAdminRole())
    }, [dispatch])

    useEffect(() => {
        if(successDelete){
            snackbarRefDeleteEmployee.current.show();
            dispatch(getUsersWithAdminRole())
        }

    }, [successDelete])
    return (
        <Helmet title="Panel administratorów">
            <section>
                <Container>
                    <Row>
                        <Col lg="12" md='12' className={'text-center mb-5'}>
                            <h2 className="section__title">Panel zarządzania administratorami</h2>
                        </Col>
                        <Row className={'justify-content-center'}>
                            <Col  md={'3'}><button className={'btn add__mechanical__service__btn'} onClick={() => addUserHandler()}><Link to={'#'}>Dodaj administatora</Link></button></Col></Row>
                    </Row>
                    <Row>
                        <Col lg={'12'} md={'12'}>
                            <div className="table-responsive-md m-5">
                                <table className="table table-faults mb-0" style={{color: "white"}}>
                                    <thead className="text-center">
                                    <tr className={'table-th'}>
                                        <th>Email</th>
                                        <th>Login</th>
                                        <th>Imię</th>
                                        <th>Nazwisko</th>
                                        <th>Akcja</th>
                                    </tr>
                                    </thead>
                                    {admins?.map((user) => (
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
                                    {admins?.length === 0 && <tbody className="align-middle text-center">
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
                        ref={snackbarRefDeleteEmployee}
                        message="Pomyślnie usunięto administratora!"
                        type={SnackbarType.success}
                    />
                </Container>
            </section>
        </Helmet>
    )
}
export default AdminsAdmin;
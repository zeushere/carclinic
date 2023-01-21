import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Helmet from "../components/Helmet/Helmet";
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import Snackbar from "../components/Snackbar/Snackbar";
import SnackbarType from "../components/Snackbar/SnackbarType";
import {useNavigate, useParams} from "react-router-dom";
import {MECHANICAL_SERVICE_UPDATE_RESET} from "../constants/mechanicalServicesConstants";
import {detailsMechanicalService, updateMechanicalService} from "../actions/mechanicalServicesActions";
import {getUserForAdmin, updateUserByAdmin} from "../actions/userActions";
import {UPDATE_USER_BY_ADMIN_RESET} from "../constants/userConstants";

const EditUser = () => {
    const {id} = useParams();
    const userForAdmin = useSelector((state) => state.userForAdmin);
    const {user} = userForAdmin;
    const updatedUserByAdmin = useSelector((state) => state.updatedUserByAdmin);
    const {updatedUser} = updatedUserByAdmin;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [regularCustomer, isRegularCustomer] = useState('');
    const [role, setRole] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === '' && confirmPassword === '') {
            dispatch(
                updateUserByAdmin(
                    id,
                    firstName,
                    lastName,
                    email,
                    login,
                    null,
                    address,
                    role,
                    regularCustomer
                )
            );

        } else if (password !== confirmPassword) {
            alert('Podane hasła nie pasują do siebie!');
            setPassword('');
            setConfirmPassword('');
        } else {
            dispatch(
                updateUserByAdmin(
                    id,
                    firstName,
                    lastName,
                    email,
                    login,
                    password,
                    address,
                    role,
                    regularCustomer
                )
            );
        }
        navigate('/users/admin')
    }

    useEffect(() => {
        dispatch(getUserForAdmin(id));
        setFirstName(user?.firstName)
        setLastName(user?.lastName)
        setEmail(user?.email)
        setLogin(user?.login)
        setAddress(user?.address)
        setRole(user?.role)
        isRegularCustomer(user?.regularCustomer)
    },[updatedUser])

    useEffect(() => {
        if (!user || (user.id) !== id) {
            dispatch(getUserForAdmin(id));
            dispatch({type: UPDATE_USER_BY_ADMIN_RESET});
        }
        window.scroll(0, 100)
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setEmail(user.email)
            setLogin(user.login)
            setAddress(user.address)
            setRole(user.role)
            isRegularCustomer(user.regularCustomer)
        }
    }, [user])

    return (
        <Helmet title="Edycja użytkownika">
            <MDBContainer fluid>
                <MDBCard className='text-black mt-3' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol
                                className='d-flex flex-column align-items-center justify-content-md-start'>
                                <span className={'login__title'}><h1>Edycja danych: {email}</h1></span>
                                <form className={'login__form'} autoComplete="off" onSubmit={handleSubmit}>
                                    <label htmlFor="firstName">Imię:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="firstName"
                                        autoComplete="off"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder={'Imię'}
                                        required
                                    />
                                    <label htmlFor="lastName">Nazwisko:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="lastName"
                                        autoComplete="off"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder={'Nazwisko'}
                                        required
                                    />

                                    <label htmlFor="lastName">Adres:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="address"
                                        autoComplete="off"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder={'Adres'}
                                        required
                                    />
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="email"
                                        id="email"
                                        autoComplete="off"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={'Email'}
                                        required
                                    />

                                    <label htmlFor="login">Login:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="login"
                                        autoComplete="off"
                                        value={login}
                                        minLength={4}
                                        maxLength={20}
                                        onChange={(e) => setLogin(e.target.value)}
                                        placeholder={'Login'}
                                        required
                                    />

                                    <label htmlFor="login">Rola:</label>
                                    <select className="bg-white edit__user__select" aria-label="Default select example"
                                            required
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}>
                                        <option value="" disabled selected hidden>Rola</option>
                                        <option value="USER">Użytkownik</option>
                                        <option value="EMPLOYEE">Pracownik</option>
                                        <option value="ADMIN">Administrator</option>

                                    </select>

                                    <label htmlFor="login">Stały klient:</label>
                                    <select className="bg-white edit__user__select" aria-label="Default select example"
                                            required
                                            value={regularCustomer}
                                            onChange={(e) => isRegularCustomer(e.target.value)}>
                                        <option value="" disabled selected hidden>Stały klient</option>
                                        <option value="true">Tak</option>
                                        <option value="false">Nie</option>

                                    </select>

                                    <label htmlFor="password">Hasło:</label>
                                    <input className={'login__input d-flex flex-row align-items-center'}
                                           type="password"
                                           id="password"
                                           onChange={(e) => setPassword(e.target.value)}
                                           value={password}
                                           minLength={4}
                                           autoComplete={'off'}
                                           placeholder={'Hasło'}
                                    />

                                    <label htmlFor="confirmPassword">Powtórz hasło:</label>
                                    <input className={'login__input d-flex flex-row align-items-center'}
                                           type="password"
                                           id="confirmPassword"
                                           onChange={(e) => setConfirmPassword(e.target.value)}
                                           value={confirmPassword}
                                           autoComplete={'off'}
                                           placeholder={'Powtórz hasło'}
                                    />

                                    <button className={'profile__button'} type={"submit"}>Zatwierdź</button>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </Helmet>
    );
};
export default EditUser;
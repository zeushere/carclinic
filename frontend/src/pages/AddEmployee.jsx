import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import Snackbar from "../components/Snackbar/Snackbar";
import SnackbarType from "../components/Snackbar/SnackbarType";
import Helmet from "../components/Helmet/Helmet";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {registerUserByAdmin} from "../actions/userActions";

const AddEmployee = () => {

    const addedMechanicalServiceId = useSelector((state) => state.addedMechanicalServiceId);
    const {mechanicalServiceId} = addedMechanicalServiceId;
    const [name, setName] = useState('');
    const [expectedServiceCost, setExpectedServiceCost] = useState('');
    const [expectedExecutionTime, setExpectedExecutionTime] = useState('');
    const dispatch = useDispatch();
    const snackbarRef = useRef(null);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [regularCustomer, isRegularCustomer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Podane hasła nie pasują do siebie!');
            setPassword('');
            setConfirmPassword('');
        } else {
            dispatch(
                registerUserByAdmin(
                    firstName,
                    lastName,
                    login,
                    email,
                    password,
                    address,
                    "EMPLOYEE",
                    regularCustomer
                )
            );
            snackbarRef.current.show();
        }
    }
    // if(mechanicalServiceId) {
    //     const timer = setTimeout(() =>{
    //         navigate('/mechanical-services/employee')
    //     },3000)
    // }
    return (
        <Helmet title="Dodawanie pracownika">
            <MDBContainer fluid>
                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol
                                className='d-flex flex-column align-items-center justify-content-md-start'>
                                <span className={'login__title'}><h1>Dodawanie pracownika</h1></span>
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
                                        onChange={(e) => setLogin(e.target.value)}
                                        placeholder={'Login'}
                                        required
                                    />

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
                                           autoComplete={'off'}
                                           placeholder={'Hasło'}
                                           required
                                    />

                                    <label htmlFor="confirmPassword">Powtórz hasło:</label>
                                    <input className={'login__input d-flex flex-row align-items-center'}
                                           type="password"
                                           id="confirmPassword"
                                           onChange={(e) => setConfirmPassword(e.target.value)}
                                           value={confirmPassword}
                                           autoComplete={'off'}
                                           placeholder={'Powtórz hasło'}
                                           required
                                    />

                                    <button className={'profile__button'} type={"submit"}>Zatwierdź</button>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
            <Snackbar
                ref={snackbarRef}
                message="Pracownik został pomyślnie dodany!"
                type={SnackbarType.success}
            />
        </Helmet>
    )
}

export default AddEmployee;
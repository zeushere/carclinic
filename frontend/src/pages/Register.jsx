import React, {useEffect, useRef, useState} from "react";

import "../styles/login.css";
import Helmet from "../components/Helmet/Helmet";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import registerImg from '../assets/all-images/register-img.png';
import {register} from "../actions/userActions";
import {USER_REGISTER_RESET} from "../constants/userConstants";
import LoadingBox from "../components/Boxes/LoadingBox";
import MessageBox from "../components/Boxes/MessageBox";
import Snackbar from "../components/Snackbar/Snackbar";
import SnackbarType from "../components/Snackbar/SnackbarType";

const Register = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [plError, setPlError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo} = userSignin;
    const userRegister = useSelector((state) => state.userRegister);
    const {loading,error, successfulRegister} = userRegister;
    const snackBarRefInvalidPassword = useRef(null);
    let navigate = useNavigate();

    const redirect = '/login';

    useEffect(() => {
        if (userInfo || successfulRegister) {
            navigate(redirect)
            dispatch({type: USER_REGISTER_RESET})
        }
    }, [navigate, userInfo, successfulRegister]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
        snackBarRefInvalidPassword.current.show();
        } else {
            dispatch(register(firstName, lastName, address, username, email, password));
        }
    };

    return (

        <Helmet title="Register">

            <MDBContainer fluid>

                <MDBCard className='text-black mt-4 mb-4' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md='6' lg='6' className=' d-flex flex-column align-items-center justify-content-md-start'>
                                {loading && <LoadingBox></LoadingBox>}
                                {error && <MessageBox variant="danger">Podany email lub login jest zajęty</MessageBox>}
                                <span className={'login__title'}><h1>Rejestracja</h1></span>
                                <form className={'login__form'} onSubmit={handleSubmit}>
                                    <label htmlFor="name">Imię:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="name"
                                        autoComplete="off"
                                        minLength={3}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder={'Imię'}
                                        required
                                    />
                                    <label htmlFor="surname">Nazwisko:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="surname"
                                        autoComplete="off"
                                        minLength={3}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder={'Nazwisko'}
                                        required
                                    />
                                    <label htmlFor="surname">Adres:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="address"
                                        minLength={5}
                                        autoComplete="off"
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder={'Adres'}
                                        required
                                    />
                                    <label htmlFor="username">Login:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="username"
                                        minLength={4}
                                        maxLength={20}
                                        autoComplete="off"
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder={'Login'}
                                        required
                                    />

                                    <label htmlFor="username">Email:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="email"
                                        id="email"
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                        autoComplete="off"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={'Email'}
                                        required
                                    />

                                    <label htmlFor="password">Hasło:</label>
                                    <input className={'login__input d-flex flex-row align-items-center'}
                                           type="password"
                                           id="password"
                                           title={'Hasło musi zawierać od 8 do 12 znaków. Co najmniej jedną duża literę, jedną małą, jedną liczbę oraz jeden znak specjalny spośród zbioru (!@#$%^&*_=+-).'}
                                           pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                                           onChange={(e) => setPassword(e.target.value)}
                                           required
                                           placeholder={'Hasło'}
                                    />
                                    <label htmlFor="retypePassword">Powtórz hasło:</label>
                                    <input className={'login__input d-flex flex-row align-items-center'}
                                           type="password"
                                           id="retypePassword"
                                           onChange={(e) => setConfirmPassword(e.target.value)}
                                           required
                                           placeholder={'Powtórz hasło'}
                                    />
                                    <button className={'login__button mb-2'} type={"submit"}>Zarejestruj się</button>
                                </form>


                            </MDBCol>

                            <MDBCol md='6' lg='6' className='d-flex align-items-center'>
                                <MDBCardImage src={registerImg} fluid/>
                            </MDBCol>

                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
                <Snackbar
                    ref={snackBarRefInvalidPassword}
                    message="Hasła nie pasują do siebie!"
                    type={SnackbarType.fail}
                />
            </MDBContainer>
        </Helmet>
    );
};

export default Register;
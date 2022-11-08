import React, {useEffect, useState} from "react";

import "../styles/login.css";
import Helmet from "../components/Helmet/Helmet";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import registerImg from '../assets/all-images/register-img.png';
import {register} from "../actions/userActions";

const Register = (props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo} = userSignin;

    let navigate = useNavigate();

    const redirect = '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Wprowadzone hasła nie pasują do siebie!');
        } else {
            dispatch(register(username, email, password));
        }
    };

    return (

        <Helmet title="Register">

            <MDBContainer fluid>

                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md='6' lg='6' className=' d-flex flex-column align-items-center justify-content-md-start'>

                                <span className={'login__title'}><h1>Rejestracja</h1></span>
                                <form className={'login__form'} onSubmit={handleSubmit}>
                                    <label htmlFor="name">Imię:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="name"
                                        autoComplete="off"
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={'Imię'}
                                        required
                                    />
                                    <label htmlFor="surname">Nazwisko:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="surname"
                                        autoComplete="off"
                                        onChange={(e) => setSurname(e.target.value)}
                                        placeholder={'Nazwisko'}
                                        required
                                    />
                                    <label htmlFor="username">Login:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="username"
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
                                        autoComplete="off"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={'Email'}
                                        required
                                    />

                                    <label htmlFor="password">Hasło:</label>
                                    <input className={'login__input d-flex flex-row align-items-center'}
                                           type="password"
                                           id="password"
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

            </MDBContainer>
        </Helmet>
    );
};

export default Register;
import React, {useEffect, useState} from "react";

import "../styles/login.css";
import Helmet from "../components/Helmet/Helmet";
import {useDispatch, useSelector} from "react-redux";
import {signin} from "../actions/userActions";
import {Link, useNavigate} from "react-router-dom";
import {MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} from "mdb-react-ui-kit";
import loginImg from '../assets/all-images/login-img.png';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    let navigate = useNavigate();

    const redirect = '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signin(username, password));
    }

    return (

        <Helmet title="Login">

            <MDBContainer fluid>

                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md='6' lg='6'
                                    className='mt-5 d-flex flex-column align-items-center justify-content-md-start'>

                                <span className={'login__title'}><h1>Zaloguj się</h1></span>
                                <form className={'login__form'} onSubmit={handleSubmit}>
                                    <label htmlFor="username">Nazwa użytkownika:</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="username"
                                        autoComplete="off"
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder={'Nazwa użytkownika'}
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
                                    <button className={'login__button'} type={"submit"}>Zaloguj</button>
                                    <p className={'login__register'}>
                                        Nie masz konta?<br/>
                                        <Link className={'login__link'} href="#" to={'/#register'}>Zarejestruj
                                            się</Link>
                                    </p>
                                    <hr className={'login__hr col-12'}/>
                                    <p className={'login__password'}>
                                        Nie pamiętasz hasła?<br/>
                                        <Link className={'login__link'} href="#" to={'/#request'}>Odzyskaj hasło</Link>
                                    </p>
                                </form>

                            </MDBCol>

                            <MDBCol md='6' lg='6' className='d-flex align-items-center'>
                                <MDBCardImage src={loginImg} fluid/>
                            </MDBCol>

                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        </Helmet>
    );
};
export default Login;
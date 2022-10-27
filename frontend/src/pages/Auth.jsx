import React, {useState} from "react";

import "../styles/auth.css";
import Helmet from "../components/Helmet/Helmet";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../slices/auth-slice";

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.login(undefined))
    };
    //
    // const userSignin = useSelector((state) => state.userSignin);
    // const { userInfo} = userSignin;

    return (
        <Helmet title="Login">
        <div className="auth__container">
            <h1 className={'auth__h1'}>Login</h1>{" "}
            <form className={'auth__form'} onSubmit={handleSubmit}>
                <label className={'auth__label'} htmlFor="username">Username</label>
                <input className="auth__input" type="text" name="username" id="username" required={true} placeholder={'Nazwa użytkownika'} onChange={(e) => setUsername(e.target.value)}/>
                <br/>
                <label htmlFor="password">Password</label>
                <input className="auth__input" type="password" name="password" id="password" placeholder={'Hasło'} required={true} onChange={(e) => setPassword(e.target.value)}/>
                <button className="login-btn" type="submit">
                    Login
                </button>
            </form>
        </div>
        </Helmet>
    );
};

export default Auth;
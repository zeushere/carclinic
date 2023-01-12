import React, {useEffect, useReducer, useRef, useState} from "react";
import Helmet from "../components/Helmet/Helmet";
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import {detailsUser, updateUserProfile} from "../actions/userActions";
import '../styles/profile.css'
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import MessageBox from "../components/MessageBox/MessageBox";
import Snackbar from "../components/Snackbar/Snackbar";
import SnackbarType from "../components/Snackbar/SnackbarType";

const Profile = () => {
    const snackbarRef = useRef(null);
    const userDetails = useSelector((state) => state.userDetails);
    const {loading, error, user} = userDetails;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    let {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;
    const dispatch = useDispatch();

    const loadUserDetails = () => {
        if (!user) {
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser());
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Podane hasła nie pasują do siebie!');
        } else {
            dispatch(
                updateUserProfile({
                    firstName,
                    lastName,
                    email,
                    login,
                    password,
                })
            );
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            setPassword('');
            setConfirmPassword('');
            dispatch(detailsUser());
            snackbarRef.current.show();
        }
    }

    useEffect(() => {
        loadUserDetails()
        fillVariablesOfUserDetails()
    }, [user, dispatch]);

    const fillVariablesOfUserDetails = () => {
        if (user) {
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setEmail(user.email)
            setLogin(user.login)
        }
    }

    return (
        <Helmet title="Profile">
            <MDBContainer fluid>
                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol
                                    className='d-flex flex-column align-items-center justify-content-md-start'>
                                <span className={'login__title'}><h1>Witaj {firstName}</h1></span>
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

                                    <label htmlFor="password">Hasło:</label>
                                    <input className={'login__input d-flex flex-row align-items-center'}
                                           type="password"
                                           id="password"
                                           onChange={(e) => setPassword(e.target.value)}
                                           value={password}
                                           required
                                           autoComplete={'off'}
                                           placeholder={'Hasło'}
                                    />

                                    <label htmlFor="confirmPassword">Powtórz hasło:</label>
                                    <input className={'login__input d-flex flex-row align-items-center'}
                                           type="password"
                                           id="confirmPassword"
                                           onChange={(e) => setConfirmPassword(e.target.value)}
                                           value={confirmPassword}
                                           required
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
            <Snackbar
                ref={snackbarRef}
                message="Profil został pomyślnie zaktualizowany!"
                type={SnackbarType.success}
            />
        </Helmet>
    );
};
export default Profile;
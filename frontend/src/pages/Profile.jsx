import React, {useEffect, useReducer, useRef, useState} from "react";
import Helmet from "../components/Helmet/Helmet";
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import {detailsUser, updateUserProfile} from "../actions/userActions";
import '../styles/profile.css'
import {USER_DETAILS_RESET, USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import MessageBox from "../components/MessageBox/MessageBox";
import Snackbar from "../components/Snackbar/Snackbar";
import SnackbarType from "../components/Snackbar/SnackbarType";
import {detailsMechanicalService} from "../actions/mechanicalServicesActions";
import {MECHANICAL_SERVICE_UPDATE_RESET} from "../constants/mechanicalServicesConstants";

const Profile = () => {
    const snackbarRef = useRef(null);
    const userDetails = useSelector((state) => state.userDetails);
    const {loading, error, user} = userDetails;
    const userRole = useSelector((state) => state.userRole);
    const {role} = userRole;
    const snackBarRefInvalidPassword = useRef(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
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
    let passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$';
    let adminPasswordPattern = "[A-Za-z0-9]{4,}";
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            snackBarRefInvalidPassword.current.show();
            setPassword('');
            setConfirmPassword('');
        } else {
            dispatch(
                updateUserProfile({
                    firstName,
                    lastName,
                    email,
                    login,
                    password,
                    address
                })
            );
            setPassword('');
            setConfirmPassword('');
            snackbarRef.current.show();
        }
    }


    useEffect(() => {
        if (!user) {
            dispatch(detailsUser());
            dispatch({type: USER_UPDATE_PROFILE_RESET});
        }
        window.scroll(0, 100)
    }, [dispatch]);

    useEffect(() => {
     fillVariablesOfUserDetails()
    }, [user])

    const fillVariablesOfUserDetails = () => {
        if (user) {
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setEmail(user.email)
            setLogin(user.login)
            setAddress(user.address)
        }
    }

    return (
        <Helmet title="Profile">
            <MDBContainer fluid>
                <MDBCard className='text-black m-5 profile__edit_form' style={{borderRadius: '25px'}}>
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
                                        minLength={3}
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
                                        minLength={3}
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
                                        minLength={5}
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
                                        title={'Wprowadzono niepoprawny email.'}
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
                                        minLength={4}
                                        maxLength={20}
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
                                           title={role !== 'ADMIN' ? 'Hasło musi zawierać od 8 do 12 znaków. Co najmniej jedną duża literę, jedną małą, jedną liczbę oraz jeden znak specjalny spośród zbioru (!@#$%^&*_=+-).': 'Administratorze wprowadź minimum 4 znaki'}
                                           pattern={role !== 'ADMIN' ? passwordPattern : adminPasswordPattern}
                                           minLength={role !== 'ADMIN' ? 8 : 4}
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
            <Snackbar
                ref={snackBarRefInvalidPassword}
                message="Hasła nie pasują do siebie!"
                type={SnackbarType.fail}
            />
        </Helmet>
    );
};
export default Profile;
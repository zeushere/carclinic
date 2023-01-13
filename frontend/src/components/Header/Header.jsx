import React, {useEffect, useRef} from "react";

import {Container, Row, Col, Button} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import {useDispatch, useSelector} from "react-redux";
import {signout} from "../../actions/userActions";

const navLinks = [
    {
        path: "/home",
        display: "Strona główna",
    },
    {
        path: "/about",
        display: "O nas",
    },
    {
        path: "/mechanical-services",
        display: "Usługi mechaniczne",
    },

    {
        path: "/blogs",
        display: "Blog",
    },
    {
        path: "/contact",
        display: "Kontakt",
    },
];

const Header = () => {
    const menuRef = useRef(null);

    const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo} = userSignin;
    const userRole = useSelector((state) => state.userRole);
    const { role} = userRole;
    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout());
    }

    function checkIfCanUseEmployeeFunctionality() {
        if(role === 'ADMIN' || role === 'EMPLOYEE') {
            return true;
        }
    }


    function checkIfCanUseAdminFunctionality() {
        if(role === 'ADMIN') {
            return true;
        }
    }

    return (
        <header className="header">
            {/* ============ header top ============ */}
            <div className="header__top">
                <Container>
                    <Row>
                        <Col lg="6" md="6" sm="6">
                            <div className="header__top__left">
                                <span>Potrzebujesz pomocy?</span>
                                <span className="header__top__help">
                  <i class="ri-phone-fill"></i> +48 532 167 665
                </span>
                            </div>
                        </Col>

                        <Col lg="6" md="6" sm="6">
                            <div className="header__top__right d-flex align-items-center justify-content-end gap-3">

                                {userInfo ? (
                                    <>

                                            <button className="p-0 btn__profile dropdown-toggle d-flex align-items-center" type="button"
                                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                <span className={'d-flex gap-1'}><i className="ri-profile-fill"></i>Mój profil</span>
                                            </button>
                                            <div className="dropdown-menu dropdown__profile" aria-labelledby="dropdownMenuButton">
                                                <Link className="dropdown-item dropdown-item__profile" to="/profile">Dane użytkownika</Link>
                                                <Link className="dropdown-item dropdown-item__profile" to="/client-cars">Samochody</Link>
                                                <Link className="dropdown-item dropdown-item__profile" to="/user-appointments">Statusy zgłoszeń</Link>
                                            </div>

                                        { checkIfCanUseEmployeeFunctionality() &&
                                            <>
                                            <button className="p-0 btn__profile dropdown-toggle d-flex align-items-center" type="button"
                                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                            <span className={'d-flex gap-1'}><i className="ri-user-settings-fill"></i>Panel pracownika</span>
                                        </button>
                                        <div className="dropdown-menu dropdown__profile" aria-labelledby="dropdownMenuButton">
                                            <Link className="dropdown-item dropdown-item__profile" to="/profile">Zgłoszenia</Link>
                                            <Link className="dropdown-item dropdown-item__profile" to="/client-cars">Usługi mechaniczne</Link>
                                            <Link className="dropdown-item dropdown-item__profile" to="/user-appointments">Blog</Link>
                                        </div>
                                            </>
                                        }

                                        { checkIfCanUseAdminFunctionality() &&
                                            <>
                                                <button className="p-0 btn__profile dropdown-toggle d-flex align-items-center" type="button"
                                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                    <span className={'d-flex gap-1'}><i className="ri-admin-fill"></i>Panel adminstratora</span>
                                                </button>
                                                <div className="dropdown-menu dropdown__profile" aria-labelledby="dropdownMenuButton">
                                                    <Link className="dropdown-item dropdown-item__profile" to="/profile">Użytkownicy</Link>
                                                </div>
                                            </>
                                        }
                                    <Link to='/home' className=" d-flex align-items-center gap-1"  onClick={signoutHandler}>
                                        <i className="ri-login-circle-line"></i> Wylogowanie
                                    </Link>
                                    </>)
                                : ( <><Link to="/login" className=" d-flex align-items-center gap-1">
                                        <i className="ri-login-circle-line"></i> Logowanie
                                    </Link>
                                        <Link to="/register" className=" d-flex align-items-center gap-1">
                                            <i className="ri-user-line"></i> Rejestracja
                                        </Link></>)}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* =============== header middle =========== */}
            <div className="header__middle">
                <Container>
                    <Row>
                        <Col lg="4" md="3" sm="4">
                            <div className="logo">
                                <h1>
                                    <Link to="/home" className=" d-flex align-items-center gap-2">
                                        <i class="ri-car-line"></i>
                                        <span>
                      Car <br /> Clinic
                    </span>
                                    </Link>
                                </h1>
                            </div>
                        </Col>

                        <Col lg="3" md="3" sm="4">
                            <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                                <div className="header__location-content">
                                    <h4>Pigonia 1</h4>
                                    <h6>Rzeszów, Polska</h6>
                                </div>
                            </div>
                        </Col>

                        <Col lg="3" md="3" sm="4">
                            <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                                <div className="header__location-content">
                                    <h4>Poniedziałek - Piątek</h4>
                                    <h6>07:00 - 17:00</h6>
                                </div>
                            </div>
                        </Col>

                        <Col
                            lg="2"
                            md="3"
                            sm="0"
                            className=" d-flex align-items-center justify-content-end "
                        >
                            <button className="header__btn btn ">
                                <Link to="/contact">
                                    <i class="ri-phone-line"></i> Poproś o kontakt
                                </Link>
                            </button>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* ========== main navigation =========== */}

            <div className="main__navbar p-4">
                <Container>
                    <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

                        <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                            <div className="menu">
                                {navLinks.map((item, index) => (
                                    <NavLink
                                        to={item.path}
                                        className={(navClass) =>
                                            navClass.isActive ? "nav__active nav__item" : "nav__item"
                                        }
                                        key={index}
                                    >
                                        {item.display}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                {/*        <div className="nav__right">*/}
                {/*            <div className="search__box">*/}
                {/*                <input type="text" placeholder="Search" />*/}
                {/*                <span>*/}
                {/*  <i class="ri-search-line"></i>*/}
                {/*</span>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                    </div>
                </Container>
            </div>
        </header>
    );
};

export default Header;

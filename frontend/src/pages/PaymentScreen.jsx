import CommonSection from "../components/UI/CommonSection";
import React, {useEffect, useRef, useState} from "react";
import Helmet from "../components/Helmet/Helmet";
import {Col, Row} from "reactstrap";
import {MdClose} from "react-icons/md";
import {PayPalButtons} from "@paypal/react-paypal-js";
import '../styles/payment-screen.css'
import PayPalCheckoutButton from "../components/PayPal/PayPalCheckoutButton";
import {useDispatch, useSelector} from "react-redux";
import Snackbar from "../components/Snackbar/Snackbar";
import SnackbarType from "../components/Snackbar/SnackbarType";
import {APPOINTMENT_UPDATE_PAYMENT_RESET} from "../constants/appointmentConstants";
import {useNavigate} from "react-router-dom";

const PaymentScreen = () => {

    const product = {
        description: localStorage.getItem('mechanicalServiceName'),
        price : localStorage.getItem('cost'),
    }

    const paidAppointment = useSelector(state => state.paidAppointment);
    const {appointmentPaid} = paidAppointment;
    const navigate = useNavigate();

    useEffect(() => {
        if(appointmentPaid){
            navigate('/home')
        }
    },[appointmentPaid])

    useEffect(() => {
        window.scrollTo(0, 220);
    },[])
    return (
        <Helmet title="Płatność online">
            <CommonSection title="Płatność online" />
            <Row className={'text-center w-100'}>
                <Col lg={'6'} className={'font-weight-normal'}><span className={'font-weight-normal display-6'}>Wybrana usługa</span>
                <div className="table-responsive-md ml-2 mt-5">
                    <table className="table">
                        <thead  className="text-center">
                        <tr className={'table-th'}>
                            <th>Nazwa</th>
                            <th>Typ</th>
                            <th>Data</th>
                            <th>Godzina</th>
                        </tr>
                        </thead>
                            <tbody className="align-middle text-center">
                            <tr className={'table-th'}>
                                <td>{localStorage.getItem("mechanicalServiceName")} </td>
                                <td>{localStorage.getItem("repairType")} </td>
                                <td>{localStorage.getItem("date")} </td>
                                <td>{localStorage.getItem("fromTime").substr(0,5)} </td>
                            </tr>
                            </tbody>
                        <thead className="align-middle text-center summary-cost__appointment">
                        <tr>
                            <th>Koszt usługi</th>
                            <th></th>
                            <th></th>
                            <th>{localStorage.getItem("cost")} zł</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                </Col>
                <Col lg={'6'}><span className={'display-6 font-weight-normal'}>Zrealizuj płatność</span>
                <div className={'mt-4'}>
                        <PayPalCheckoutButton product={product}/>
                </div>
                </Col>
            </Row>

        </Helmet>
            )}

export default PaymentScreen;
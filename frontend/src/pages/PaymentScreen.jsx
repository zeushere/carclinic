import CommonSection from "../components/UI/CommonSection";
import React, {useEffect, useState} from "react";
import Helmet from "../components/Helmet/Helmet";
import {Col, Row} from "reactstrap";
import {MdClose} from "react-icons/md";
import {PayPalButtons} from "@paypal/react-paypal-js";
import '../styles/payment-screen.css'
import PayPalCheckoutButton from "../components/PayPal/PayPalCheckoutButton";
import {useSelector} from "react-redux";

const PaymentScreen = () => {

    const product = {
        description: localStorage.getItem('mechanicalServiceName'),
        price : localStorage.getItem('cost'),
    }
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
      {/*              {(addedAppointment && appointmentStatus === 'Opłacone') ? (<span style = {{color: "green"}}>*/}
      {/*<i class="fa fa-check-circle fa-5x" aria-hidden="true"></i></span>) :*/}
                        <PayPalCheckoutButton product={product}/>

                </div>
                </Col>
            </Row>
        </Helmet>
            )}

export default PaymentScreen;
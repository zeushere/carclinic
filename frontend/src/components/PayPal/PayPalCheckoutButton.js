import {PayPalButtons} from "@paypal/react-paypal-js";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addAppointment, payAppointment} from "../../actions/appointmentActions";
import {APPOINTMENT_ADD_RESET} from "../../constants/appointmentConstants";

const PayPalCheckoutButton = (props) => {
    const {product} = props;
    const fromTime = localStorage.getItem('fromTime');
    const date = localStorage.getItem('date');
    const repairType = localStorage.getItem('repairType');
    const paymentType = localStorage.getItem('paymentType');
    const cost = localStorage.getItem("cost");
    const carId = localStorage.getItem("carId");
    const description = localStorage.getItem("description");
    const mechanicalServiceId = localStorage.getItem('mechanicalServiceId');
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const handleApprove = () => {
        setPaidFor(true);
    };
    if (error) {

        alert(error);
    }

    return <PayPalButtons


        onClick={(data, actions) => {
            const hasAlreadyBoughtCourse = false;
            if (hasAlreadyBoughtCourse) {
                setError(
                    "You already bought this course..."
                )
                return actions.reject();
            } else {
                return actions.resolve();
            }
        }
        }

        createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units: [
                    {
                        description: product.description,
                        amount: {
                            value: product.price
                        }
                    }
                ]
            });
        }}

        onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            console.log("order", order);
            dispatch(addAppointment(date, fromTime, description, repairType, paymentType, cost, mechanicalServiceId, carId))
            dispatch({type: APPOINTMENT_ADD_RESET})
            handleApprove(data.orderID);
            localStorage.setItem('appointment', 'paid')
        }}

        onCancel={() => {
        }}
        onError={(err) => {


            setError(err);
            console.log("PayPal Checkout onError", err);
        }}
    />
}

export default PayPalCheckoutButton;
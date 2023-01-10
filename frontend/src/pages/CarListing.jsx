import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";

const CarListing = () => {
    return (
        <Helmet title = "Usługi Mechaniczne">
        <CommonSection title="Usługi mechaniczne" />

        </Helmet>
    );
};

export default CarListing;

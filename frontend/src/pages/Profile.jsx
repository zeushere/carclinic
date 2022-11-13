import React from "react";
import Helmet from "../components/Helmet/Helmet";
import Register from "./Register";
import {MDBContainer} from "mdb-react-ui-kit";

const Profile = () => {
    return (
        <Helmet title="Profile">
            <MDBContainer fluid>
                Elo
            </MDBContainer>
        </Helmet>
    );
};
export default Profile;
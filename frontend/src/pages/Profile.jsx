import React from "react";
import Helmet from "../components/Helmet/Helmet";
import Register from "./Register";
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {useSelector} from "react-redux";

const Profile = () => {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo} = userSignin;
    return (
        <Helmet title="Profile">
            <MDBContainer fluid>
                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md='6' lg='6' className=' d-flex flex-column align-items-center justify-content-md-start'>
                                <span className={'login__title'}><h1></h1></span>
                                {userInfo}
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </Helmet>
    );
};
export default Profile;
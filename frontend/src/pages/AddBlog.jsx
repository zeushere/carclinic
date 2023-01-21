import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import Snackbar from "../components/Snackbar/Snackbar";
import SnackbarType from "../components/Snackbar/SnackbarType";
import Helmet from "../components/Helmet/Helmet";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RABAT_CODE_ADD_RESET} from "../constants/rabatCodeConstants";
import {addRabatCode} from "../actions/rabatCodeActions";
import {detailsUser} from "../actions/userActions";
import {BLOG_ADD_RESET} from "../constants/blogConstants";
import {addBlog} from "../actions/blogActions";
import '../styles/add-blog.css'

const AddBlog = () => {

    const userDetails = useSelector((state) => state.userDetails);
    const {loading, error, user} = userDetails;
    const [title, setTitle] = useState('');
    const [article, setArticle] = useState('');
    const [image, setImage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(image != null) {
            const bodyFormData = new FormData();
            bodyFormData.append('image', image);
            dispatch(
                addBlog(
                    title,
                    user?.firstName,
                    article,
                    bodyFormData
                )
            );
        } else {
            dispatch(
                addBlog(
                    title,
                    user?.firstName,
                    article,
                    null
                )
            );
        }
        navigate('/blogs/employee')
    }

    useEffect(() => {
        dispatch(detailsUser());
    }, [])

    function getImage(e) {
    setImage(e.target.files[0])
    }

    return (
        <Helmet title="Dodawanie wpisu na bloga">
            <MDBContainer fluid className={'w-100'}>
                <MDBCard className='text-black mt-3' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol
                                className='d-flex flex-column align-items-center justify-content-md-start'>
                                <span className={'login__title'}><h1>Dodawanie wpisu na bloga</h1></span>
                                <form className={'login__form align-items-center form__add__blog'} autoComplete="off" onSubmit={handleSubmit}>
                                    <label className={'label__add__blog'} htmlFor="name">Tytuł</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center title__input'}
                                        type="text"
                                        id="title"
                                        autoComplete="off"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder={'Tytuł'}
                                        required
                                    />
                                    <label className={'mt-4'} htmlFor="imageFile">Obraz</label>

                                    <input type="file" id="imageFile" label="Choose File" onChange={(e) => getImage(e)} required></input>
                                    <label  className={'label__add__blog mt-5'} htmlFor="lastName">Wpis:</label>
                                    <textarea
                                        value={article}
                                        onChange={(e) => setArticle(e.target.value)}
                                        rows="20"
                                        cols="130"
                                        placeholder="Wiadomość"
                                        className="textarea textarea__blog w-100"
                                        required
                                    ></textarea>
                                    <button className={'profile__button w-30'} type={"submit"}>Zatwierdź</button>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>

        </Helmet>
    )
}

export default AddBlog;
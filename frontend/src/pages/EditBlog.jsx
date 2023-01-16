import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Helmet from "../components/Helmet/Helmet";
import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import Snackbar from "../components/Snackbar/Snackbar";
import SnackbarType from "../components/Snackbar/SnackbarType";
import {useParams} from "react-router-dom";
import {addBlog, detailsBlog, updateBlog} from "../actions/blogActions";
import {BLOG_UPDATE_RESET} from "../constants/blogConstants";
import {detailsUser} from "../actions/userActions";

const EditBlog = () => {
    const {id} = useParams();
    const snackbarRef = useRef(null);
    const blogDetails = useSelector((state) => state.blogDetails);
    const {blog} = blogDetails;
    const userDetails = useSelector((state) => state.userDetails);
    const {loading, error, user} = userDetails;
    const [title, setTitle] = useState('');
    const [article, setArticle] = useState('');
    const [image, setImage] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (image !== '') {
            const bodyFormData = new FormData();
            bodyFormData.append('image', image);
            dispatch(
                updateBlog(
                    id,
                    title,
                    user?.firstName,
                    article,
                    bodyFormData
                )
            );
        } else {
            dispatch(
                updateBlog(
                    id,
                    title,
                    user?.firstName,
                    article,
                    null
                )
            );
        }


        dispatch({type: BLOG_UPDATE_RESET});
        snackbarRef.current.show();
    }

    useEffect(() => {
        dispatch(detailsUser());
    },[])

    useEffect(() => {
        if (!blog || (blog.id) !== id) {
            dispatch(detailsBlog(id));
            dispatch({type: BLOG_UPDATE_RESET});
        }
        window.scroll(0, 100)
    }, [dispatch]);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title)
            setArticle(blog.article)
        }
    }, [blog])

    function getImage(e) {
        setImage(e.target.files[0])
    }

    return (
        <Helmet title="Edycja wpisu bloga">
            <MDBContainer fluid>
                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol
                                className='d-flex flex-column align-items-center justify-content-md-start'>
                                <span className={'login__title'}><h1>Edycja wpisu: {title}</h1></span>
                                <form className={'login__form align-items-center'} autoComplete="off"
                                      onSubmit={handleSubmit}>
                                    <label className={'label__add__blog'} htmlFor="name">Tytuł</label>
                                    <input
                                        className={'login__input d-flex flex-row align-items-center'}
                                        type="text"
                                        id="title"
                                        autoComplete="off"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder={'Tytuł'}
                                        required
                                    />
                                    <label className={'mt-4'} htmlFor="imageFile">Obraz</label>

                                    <input type="file" id="imageFile" label="Choose File" onChange={(e) => getImage(e)}
                                    ></input>
                                    <label className={'label__add__blog mt-5'} htmlFor="lastName">Wpis:</label>
                                    <textarea
                                        value={article}
                                        onChange={(e) => setArticle(e.target.value)}
                                        rows="20"
                                        cols="130"
                                        placeholder="Wiadomość"
                                        className="textarea textarea__blog"
                                        required
                                    ></textarea>
                                    <button className={'profile__button w-25'} type={"submit"}>Zatwierdź</button>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
            <Snackbar
                ref={snackbarRef}
                message="Wpis został pomyślnie zaktualizowany!"
                type={SnackbarType.success}
            />
        </Helmet>
    );
};
export default EditBlog;
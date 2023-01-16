import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef} from "react";
import {deleteMechanicalService, listMechanicalServices} from "../actions/mechanicalServicesActions";
import Helmet from "../components/Helmet/Helmet";
import {Link, useNavigate} from "react-router-dom";
import {Col, Container, Row} from "reactstrap";
import '../styles/mechanical-service-employee.css'
import SnackbarType from "../components/Snackbar/SnackbarType";
import Snackbar from "../components/Snackbar/Snackbar";
import {deleteRabatCode, listRabatCodes} from "../actions/rabatCodeActions";
import {deleteBlog, getBlogs} from "../actions/blogActions";

export const BlogsEmployee = () => {

    const blogList = useSelector(state => state.blogList);
    const {blogs} = blogList;
    const rabatCodeDelete = useSelector((state) => state.rabatCodeDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = rabatCodeDelete;
    const dispatch = useDispatch();
    const snackbarRefDeleteBlog = useRef(null);
    const navigate = useNavigate();

    const addBlogHandler = (e) => {
        if (window.confirm('Czy na pewno chcesz dodać wpis na bloga?')) {
            navigate('/blogs/employee/add/')
        }
    }

    const deleteBlogHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz usunąć wpis z bloga?')) {
            dispatch(deleteBlog(id));
        }
    };

    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch])

    useEffect(() => {
        if (successDelete) {
            snackbarRefDeleteBlog.current.show();
            dispatch(getBlogs())
        }

    }, [successDelete])
    return (
        <Helmet title="Zarządzanie blogiem">
            <section>
                <Container>
                    <Row>
                        <Col lg="12" md='12' className={'text-center mb-5'}>
                            <h2 className="section__title">Panel zarządzania wpisami bloga</h2>
                        </Col>
                        <Row className={'justify-content-center'}>
                            <Col md={'2'}>
                                <button className={'btn add__mechanical__service__btn'}
                                        onClick={() => addBlogHandler()}><Link to={'#'}>Dodaj wpis</Link>
                                </button>
                            </Col></Row>
                    </Row>
                    <Row>
                        <Col lg={'12'} md={'12'}>
                            <div className="table-responsive-md m-5">
                                <table className="table table-faults mb-0" style={{color: "white"}}>
                                    <thead className="text-center">
                                    <tr className={'table-th'}>
                                        <th>Autor</th>
                                        <th>Tytuł</th>
                                        <th>Data utworzenia</th>
                                        <th>Godzina utworzenia</th>
                                        <th>Akcja</th>
                                    </tr>
                                    </thead>
                                    {blogs?.map((blog) => (
                                        <tbody className="align-middle text-center">
                                        <tr key={blog?.id} className={'table-th'}>
                                            <td>{blog?.author} </td>
                                            <td>{blog?.title}</td>
                                            <td>{blog?.creationDate?.substr(0,10)}</td>
                                            <td>{blog?.creationDate?.substr(11,5)}</td>
                                            <td className={'mechanical__service__link'}>
                                                <button type="button"
                                                        className="btn btn-danger btn-lg appointment_car__link m-2"
                                                        onClick={() => deleteBlogHandler(blog?.id)}><Link
                                                    to={'#'}
                                                    className="appointment_car__link">Usuń</Link>
                                                </button>
                                                <button type="button"
                                                        className="btn btn-lg mechanicalService__button edit-mechanical-service-button btn-warning"
                                                ><Link
                                                    to={`/blogs/employee/edit/${blog?.id}`}
                                                    className="">Edytuj</Link></button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    ))}
                                    {blogs?.length === 0 && <tbody className="align-middle text-center">
                                    <tr className={'table-th'}>
                                        <td>Brak</td>
                                        <td>Brak</td>
                                        <td>Brak</td>
                                        <td>Brak</td>
                                        <td>Brak</td>
                                    </tr>
                                    </tbody>
                                    }
                                </table>

                            </div>
                        </Col>
                    </Row>
                    <Snackbar
                        ref={snackbarRefDeleteBlog}
                        message="Pomyślnie usunięto wpis!"
                        type={SnackbarType.success}
                    />
                </Container>
            </section>
        </Helmet>
    )
}
export default BlogsEmployee;
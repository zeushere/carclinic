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
import $ from "jquery";
import {BLOG_ADD_RESET, BLOG_DELETE_RESET, BLOG_UPDATE_RESET} from "../constants/blogConstants";
import '../styles/footer-fix.css';

export const BlogsEmployee = () => {

    const blogList = useSelector(state => state.blogList);
    const {blogs} = blogList;
    const blogDelete = useSelector((state) => state.blogDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = blogDelete;
    const blogUpdate = useSelector((state) => state.blogUpdate);
    const {success: successUpdate} = blogUpdate;
    const blogAdded = useSelector((state) => state.blogAdded);
    const {blog} = blogAdded;
    const dispatch = useDispatch();
    const snackbarRefDeleteBlog = useRef(null);
    const navigate = useNavigate();
    const snackbarRefAdd = useRef(null);
    const snackbarRefEdit = useRef(null);

    const addBlogHandler = (e) => {
        if (window.confirm('Czy na pewno chcesz dodać wpis na bloga?')) {
            navigate('/blogs/employee/add/')
        }
    }

    const deleteBlogHandler = (id) => {
        if (window.confirm('Czy na pewno chcesz usunąć wpis z bloga?')) {
            dispatch(deleteBlog(id));
            snackbarRefDeleteBlog.current.show();
        }
    };

    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch])

    useEffect(() => {
        if(successDelete){
            dispatch(getBlogs())
            dispatch({type: BLOG_DELETE_RESET})
        }
    }, [successDelete])

    useEffect(() => {
        if(blog){
            dispatch(getBlogs())
            dispatch({type: BLOG_ADD_RESET})
            snackbarRefAdd.current.show()
        }
    }, [blog])

    useEffect(() => {
        if(successUpdate){
            dispatch(getBlogs())
            dispatch({type: BLOG_UPDATE_RESET});
            snackbarRefEdit.current.show();
        }
    }, [successUpdate])

    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myTable tr:not(:first)").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

    function sortEmployeeBlogs(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable");
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount ++;
            } else {
                /* If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again. */
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
    return (
        <Helmet title="Zarządzanie blogiem">
            <section className={blogs ? 'cars__section' : ''}>
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
                        <Col className={'mb-2 mt-3 col-3'} style={{width: "100%"}}>
                            <Col className={'col-9'}></Col>
                            <input className={'search__box'} id="myInput" type="text" placeholder="Szukaj"/>
                        </Col>
                    </Row>
                    <Row>

                        <Col lg={'12'} md={'12'}>

                            <div className="table-responsive-md mt-2 ">
                                <table id="myTable" className="table table-faults mb-0" style={{color: "white"}}>
                                    <thead className="text-center">
                                    <tr className={'table-th'}>
                                        <th onClick={() => sortEmployeeBlogs(0)}>Autor</th>
                                        <th onClick={() => sortEmployeeBlogs(1)}>Tytuł</th>
                                        <th onClick={() => sortEmployeeBlogs(2)}>Data utworzenia</th>
                                        <th onClick={() => sortEmployeeBlogs(3)}>Godzina utworzenia</th>
                                        <th>Rodzaj akcji</th>
                                    </tr>
                                    </thead>
                                    {blogs?.map((blog) => (
                                        <tbody className="align-middle text-center">
                                        <tr key={blog?.id} className={'table-th'}>
                                            <td>{blog?.author} </td>
                                            <td>{blog?.title}</td>
                                            <td>{blog?.creationDate?.substr(0, 10)}</td>
                                            <td>{blog?.creationDate?.substr(11, 5)}</td>
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
                    <Snackbar
                        ref={snackbarRefAdd}
                        message="Wpis został pomyślnie dodany!"
                        type={SnackbarType.success}
                    />
                    <Snackbar
                        ref={snackbarRefEdit}
                        message="Wpis został pomyślnie zaktualizowany!"
                        type={SnackbarType.success}
                    />
                </Container>
            </section>
        </Helmet>
    )
}
export default BlogsEmployee;
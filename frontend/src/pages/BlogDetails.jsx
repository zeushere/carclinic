import React, { useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";

import {useNavigate, useParams} from "react-router-dom";
import blogData from "../assets/data/blogData.js";
import Helmet from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";

import commentImg from "../assets/all-images/ava-1.jpg";

import "../styles/blog-details.css";
import {useDispatch, useSelector} from "react-redux";
import {detailsBlog, getBlogs} from "../actions/blogActions";

const BlogDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const blogDetails = useSelector(state => state.blogDetails);
    const {blog} = blogDetails;
    const blogList = useSelector(state => state.blogList);
    const {blogs} = blogList;
    useEffect(() => {
        dispatch(getBlogs())
        dispatch(detailsBlog(id))
        window.scrollTo(0, 0);
    }, [id]);




    return (
        <Helmet title={blog?.title}>
            <section>
                <Container>
                    <Row>
                        <Col lg="8" md="8">
                            <div className="blog__details">
                                <img src={blog?.image} alt="" className="w-100" />
                                <h2 className="section__title mt-4">{blog?.title}</h2>

                                <div className="blog__publisher d-flex align-items-center gap-4 mb-4">
                  <span className="blog__author">
                    <i class="ri-user-line"></i> {blog?.author}
                  </span>

                                    <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-calendar-line"></i> {blog?.creationDate?.substr(0,10)}
                  </span>

                                    <span className=" d-flex align-items-center gap-1 section__description">
                    <i class="ri-time-line"></i> {blog?.creationDate?.substr(11,5)}
                  </span>
                                </div>

                                <p className="section__description">{blog?.article}</p>


                            </div>




                        </Col>

                        <Col lg="4" md="4">
                            <div className="recent__post mb-4">
                                <h5 className=" fw-bold">Polecane posty</h5>
                            </div>
                            {blogs?.map((item) => (
                                <div className="recent__blog-post mb-4" key={item.id}>
                                    <div className="recent__blog-item d-flex gap-3">
                                        <img src={item.image} alt="" className="w-25 rounded-2" />
                                        <h6>
                                           <Link to={`/blogs/${item?.id}`}>{item.title}</Link>
                                        </h6>
                                    </div>
                                </div>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default BlogDetails;

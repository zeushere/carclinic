import React, {useEffect} from "react";
import {Col} from "reactstrap";
import "../../styles/blog-item.css";
import {Link} from "react-router-dom";
// import blogData from "../../assets/data/blogData";
import {useDispatch, useSelector} from "react-redux";
import {getBlogs} from "../../actions/blogActions";

const BlogList = () => {

    const dispatch = useDispatch();
    const blogList = useSelector(state => state.blogList);
    const {blogs} = blogList;

    useEffect(() => {
        dispatch(getBlogs())
    }, [])

    return (
        <>
            {blogs?.map((item) => (
                <BlogItem item={item} key={item.id}/>
            ))}
        </>
    );
};

const BlogItem = ({item}) => {
    const {id, image, title, author, creationDate, article} = item;

    return (
        <Col lg="4" md="6" sm="6" className="mb-5">
            <div className="blog__item">
                <img src={image} alt="" className="w-100" style={{height: '276px'}}/>
                <div className="blog__info p-3">
                    <Link to={`/blogs/${id}`} className="blog__title">
                        {title}
                    </Link>
                    <p className="section__description mt-3">
                        {article.length > 100
                            ? article.substr(0, 45)
                            : article}
                    </p>
                    <Link to={`/blogs/${id}`} className="read__more">
                        Czytaj więcej
                    </Link>

                    <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
            <span className="blog__author">
              <i class="ri-user-line"></i> {author}
            </span>

                        <div className=" d-flex align-items-center gap-3">
              <span className=" d-flex align-items-center gap-1 section__description">
                <i class="ri-calendar-line"></i> {creationDate.substr(0,10)}
              </span>

                            <span className=" d-flex align-items-center gap-1 section__description">
                <i class="ri-time-line"></i> {creationDate.substr(11,5)}
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default BlogList;

import React from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import BlogList from "../components/UI/BlogList";

const Blog = () => {
    return (
        <Helmet title="Blog">
            <CommonSection title="Blog" />
            <section>
                <Container>
                    <Row>
                        <BlogList />
                   </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Blog;

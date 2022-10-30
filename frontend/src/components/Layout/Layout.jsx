import React, {Fragment} from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import {MemoryRouter} from "react-router-dom";

const Layout = () => {
    return (
        <MemoryRouter>
            <Header />
            <div>
                <Routers />
            </div>
            <Footer />
        </MemoryRouter>
    );
};

export default Layout;

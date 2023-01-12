import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {QueryClient, QueryClientProvider} from "react-query";
import {MemoryRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'remixicon/fonts/remixicon.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Provider} from "react-redux";
import store from "./store/store";
import {LocalizationProvider, plPL} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
    <Provider store = {store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <App/>
        </LocalizationProvider>
    </Provider>
</React.StrictMode>);


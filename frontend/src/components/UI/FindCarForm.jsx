import React, {useEffect, useState} from "react";
import "../../styles/find-car-form.css";
import '../../styles/select-component.css'
import {Form, FormGroup} from "reactstrap";
import {Link} from "react-router-dom";
import 'jquery/dist/jquery'
// import {DatePicker, DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import * as PropTypes from "prop-types";
import date from "moment";
import moment from "moment";
import * as dayjs from 'dayjs'
import {Dayjs} from 'dayjs'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker, LocalizationProvider, plPL} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import {deDE} from "@mui/material/locale";
import 'dayjs/locale/pl';

function StaticDateRangePicker(props) {
    return null;
}

StaticDateRangePicker.propTypes = {
    disablePast: PropTypes.bool,
    disableCloseOnSelect: PropTypes.bool,
    onChange: PropTypes.any,
    onOpen: PropTypes.func,
    calendars: PropTypes.number,
    onMonthChange: PropTypes.func,
    open: PropTypes.func,
    displayStaticWrapperAs: PropTypes.string
};
const FindCarForm = () => {

    useEffect(() => {
        console.log('elo')
    }, [])
    const [value, setValue] = useState(
        dayjs(date.now())
    );

    const theme = createTheme(
        {
            palette: {
                primary: {main: '#1976d2'},
            },
        },
        plPL, // use 'de' locale for UI texts (start, next month, ...)
    );

    function changeHandler(e) {

    }

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
    };

    const isWeekend = (date: Dayjs) => {
        const day = date.day();

        return day === 0 || day === 6;
    };


    return (
        <Form className="form">
            <div className=" d-flex align-items-center justify-content-between flex-wrap">
                <FormGroup className="form__group">
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs} adapterLocale="pl"
                            localeText={plPL.components.MuiLocalizationProvider.defaultProps.localeText}>
                            <DesktopDatePicker
                                shouldDisableDate={isWeekend}
                                label="Wybierz datę"
                                minDate={Date.now()}
                                maxDate={moment('12/31/2023').toDate()}
                                inputFormat="YYYY-MM-DD"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </ThemeProvider>
                </FormGroup>

                <FormGroup className="form__group">
                    <select className="form-select" aria-label="Default select example"
                    >
                        <option value="" disabled selected hidden>Typ płatności</option>
                        <option value="Online">Online</option>
                        <option value="Pobranie">Przy odbiorze</option>

                    </select>
                </FormGroup>

                <FormGroup className="form__group">

                    <input type="text" placeholder="Godzina"/>
                </FormGroup>

                <FormGroup className="form__group">
                    <Link className={'find__service-btn'} to={'/mechanical-services'}>Wybierz typ usługi</Link>

                </FormGroup>
                <FormGroup className="form__group">
                    <select className="form-select" aria-label="Default select example"

                    >
                        <option value="" disabled selected hidden>Typ naprawy</option>
                        <option value="Tradycyjna">Tradycyjna</option>
                        <option value="Zdalna">Zdalna</option>

                    </select>
                </FormGroup>

                <FormGroup className="form__group">
                    <button className="btn find__car-btn">Zarezerwuj wizytę</button>
                </FormGroup>
            </div>
        </Form>
    );
};

export default FindCarForm;

import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import ClientCars from "../pages/ClientCars";
import ClientCarDetails from "../pages/ClientCarDetails";
import MechanicalServices from "../components/UI/MechanicalServices";
import PaymentScreen from "../pages/PaymentScreen";
import UserAppointments from "../pages/UserAppointments";
import MechanicalServiceEmployee from "../pages/MechanicalServiceEmployee";
import EditMechanicalService from "../pages/EditMechanicalService";
import AddMechanicalService from "../pages/AddMechanicalService";
import AllAppointmentsOfDay from "../pages/AllAppointmentsOfDay";
import AppointmentView from "../pages/AppointmentView";
import UsersAdmin from "../pages/UsersAdmin";
import EmployeesAdmin from "../pages/EmployeesAdmin";
import AdminsAdmin from "../pages/AdminsAdmin";
import EditUser from "../pages/EditUser";
import AddUser from "../pages/AddUser";
import AddEmployee from "../pages/AddEmployee";
import AddAdmin from "../pages/AddAdmin";
import RabatCodesEmployee from "../pages/RabatCodesEmployee";
import EditRabatCode from "../pages/EditRabatCode";
import AddRabatCode from "../pages/AddRabatCode";
import BlogsEmployee from "../pages/BlogsEmployee";
import AddBlog from "../pages/AddBlog";
import EditBlog from "../pages/EditBlog";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home"/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/mechanical-services" element={<MechanicalServices/>}/>
            <Route path="/mechanical-services/employee" element={<MechanicalServiceEmployee/>}/>
            <Route path="/rabat-codes/employee" element={<RabatCodesEmployee/>}/>
            <Route path="/blogs/employee" element={<BlogsEmployee/>}/>
            <Route path="/rabat-codes/employee/edit/:id" element={<EditRabatCode/>}/>
            <Route path="/blogs/employee/edit/:id" element={<EditBlog/>}/>
            <Route path="/mechanical-services/employee/edit/:id" element={<EditMechanicalService/>}/>
            <Route path="/mechanical-services/employee/add/" element={<AddMechanicalService/>}/>
            <Route path="/rabat-codes/employee/add/" element={<AddRabatCode/>}/>
            <Route path="/blogs/employee/add/" element={<AddBlog/>}/>
            <Route path="/appointments/:id" element={<AppointmentView/>}/>
            <Route path="/appointments" element={<AllAppointmentsOfDay/>}/>
            <Route path="/users/admin" element={<UsersAdmin/>}/>
            <Route path="/users/admin/edit/:id" element={<EditUser/>}/>
            <Route path="/users/admin/add/" element={<AddUser/>}/>
            <Route path="/employees/admin/add/" element={<AddEmployee/>}/>
            <Route path="/employees/admin" element={<EmployeesAdmin/>}/>
            <Route path="/admins/admin" element={<AdminsAdmin/>}/>
            <Route path="/admins/admin/add" element={<AddAdmin/>}/>
            <Route path="/cars/:id" element={<ClientCarDetails/>} exact/>
            <Route path="/blogs" element={<Blog/>}/>
            <Route path="/blogs/:id" element={<BlogDetails/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/payment-screen" element={<PaymentScreen/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/client-cars" element={<ClientCars/>}/>
            <Route path="/user-appointments" element={<UserAppointments/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
};

export default Routers;


import React from "react";

import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { connect } from "react-redux";

import './styles.css';

// components import
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import CompanyForm from "./components/CompanyForm";
import CompanyForm2 from "./components/CompanyForm2";
import Header from "./components/Header";
import CompanyLogin from "./components/CompanyLogin";
import CompanyForm3 from "./components/CompanyForm3";
import MembershipStatus from "./components/MembershipStatus";
import Chat from "./components/Chat";
import CreateUser from "./components/CreateUser";
import MembershipTable from "./components/MembershipTable";

const mapStateToProps = ({ session }) => ({
  session
});

function App({ session }) {
  if(session.typeOfUser == "member"){
      return(
      <>
      <Navbar/>
      <div className="backImage">
        <Routes>
          <Route path="/profile" element={<Home/>} />
          <Route path="/membership-form" element={<CompanyForm/>} />
          <Route path="/company-info-2" element={<CompanyForm2/>} />
          <Route path="/company-info-3" element={<CompanyForm3/>} />
          <Route path="/membership-status" element={<MembershipStatus/>} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
      </div>
      <ToastContainer />
      </>
      )
  } else if(session.typeOfUser == "admin"){
    return(
      <>
        <Navbar/>
        <Routes>
          <Route path="/profile" element={<Home/>} />
          <Route path="/create user" element={<CreateUser/>} />
          <Route path="/pending-memberships" element={<MembershipTable/>} />
        </Routes>
        <ToastContainer />
      </>
    )
  } else if(session.typeOfUser == "approver"){
    return(
      <>
        <Navbar/>
        <Routes>
          <Route path="/pending-memberships" element={<MembershipTable/>} />
          <Route path="/membership-status" element={<MembershipStatus/>} />
          <Route path="/*" element={<Home/>} />
        </Routes>
        <ToastContainer />
      </>
    )
  } else {
    return(
      <>
      <Routes>
        <Route path="/login" element={<CompanyLogin/>} />
        <Route path="/*" element={<Login/>} />
      </Routes>
      <ToastContainer />
      
    </>
   )
  }
}


export default connect(
  mapStateToProps
)(App);
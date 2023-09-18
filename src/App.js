
import React from "react";

import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { connect } from "react-redux";

import socketio from "socket.io-client";

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
import ChatHome from "./components/ChatHome";
import ShowUser from "./components/ShowUser";


const mapStateToProps = ({ session }) => ({
  session
});

function App({ session }) {
 
  const getSocket = () => {
    // const token = LocalStorage.get("token"); // Retrieve jwt token from local storage or cookie
    const user = session

    // Create a socket connection with the provided URI and authentication
    return socketio("http://localhost:3001/", {
      withCredentials: true,
      auth: { user },
    });
  };

  const socket = getSocket()


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
          <Route path="/membership-table" element={<MembershipTable/>}/>
          <Route path="/chat" element={<ChatHome socket={socket} />}/>
      </Routes>
      </div>
      <ToastContainer />
      </>
      )
  } else if(session.typeOfUser == "admin"){
    return(
      <>
        <Navbar/>
        <div className="backImage">
        <Routes>
          <Route path="/profile" element={<Home/>} />
          <Route path="/create-user" element={<CreateUser/>} />
          <Route path="/show-users" element={<ShowUser/>} />
          <Route path="/pending-memberships" element={<MembershipTable type="pending" />} />
          <Route path="/completed-memberships" element={<MembershipTable type="completed" />} />
          <Route path="/all-memberships" element={<MembershipTable type="all" />} />
          <Route path="/membership-status" element={<MembershipStatus/>} />
        </Routes>
        </div>
        <ToastContainer />
      </>
    )
  } else if(session.typeOfUser == "approver"){
    return(
      <>
        <Navbar/>
        <div className="backImage">
        <Routes>
          <Route path="/profile" element={<Home/>} />
          <Route path="/pending-memberships" element={<MembershipTable type="pending" />} />
          <Route path="/completed-memberships" element={<MembershipTable type="completed" />} />
          <Route path="/membership-status" element={<MembershipStatus/>} />
        </Routes>
        </div>
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
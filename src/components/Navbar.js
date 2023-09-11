import React, { useEffect, useState } from "react";
import "../Navbar.css";
import Loader from "./Loader";


import { useNavigate } from "react-router";

import { connect } from "react-redux";

import { logOutUser } from '../actions/session';

const mapStateToProps = ({ session }) => ({
  session
})
  
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logOutUser())
});


const Navbar = ({session, logout}) => {
  const [li, setLi] = useState([]);
  
  const navigate = useNavigate()
  
  const memberLi = [
    ["Home", "images/dashboard.svg"],
    ["Profile", "images/profile.svg"],    
    ["Membership-Form", "images/addmem.svg"],
    ["Chats", "images/chat.svg"],
    ["Log Out", "images/signout.svg"]
  ];
  
  const adminLi = [
    ["Home", "images/dashboard.svg"],
    ["Create User", "images/Magazine.svg"],
    ["Show Users", "images/profile.svg"],
    ["Memberships", "images/member.svg"],
    ["Log Out", "images/signout.svg"]
  ];

  const approverLi = [
  ["Home", "images/dashboard.svg"],
  ["Pending-Memberships", "images/member.svg"],
  ["Approved Memberships", "images/Magazine.svg"],  
  ["Log Out", "images/signout.svg"]];

    const [loader, setLoader] = useState(false)
    
    const [activeClass, setActiveClass] = useState("Home") 

  useEffect(() => {
    if(session.typeOfUser === "approver"){
      setLi(approverLi)
    } else if(session.typeOfUser === "admin"){
      setLi(adminLi)
    }else{
      setLi(memberLi)
    }
  }, [])

  const windoww = true;
  const [showTooltip, setShowTooltip] = useState(null);

  const handleMouseEnter = (index) => {
    setShowTooltip(index);

  };

  const openPage = async(index) => {
    setActiveClass(li[index][0])
    if(li[index][0].toLowerCase() == "log out"){
      const userConfirmed = window.confirm("Are you sure you want to log out?");
      if (userConfirmed) {
        setLoader(true)
        await logout();
        setLoader(false)
      }} else {
      navigate(li[index][0].toLowerCase())
    }
  }

  const handleMouseLeave = () => {
    setShowTooltip(null);
  };

  const openHome = () => {
    navigate("/")
    setActiveClass('Home')
  }
  if(loader){
    return (
      <Loader/>
    )
  }else{
  return (
    <nav className="navbar-menu" style={{ width: windoww ? 53: 250 }}>
      <div className="burger">
        <img src="images/title_logo.png" onClick={openHome} alt="burger" />
      </div>
      <ul className="navbar__list">
        {li.map((item, i) => (
          <>
          <div
          className={activeClass == item[0] ?  "navbar__li-box active" : "navbar__li-box"}
            key={i}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            onClick={() => openPage(i)}
          >
            <img
              src={item[1]}
              alt={item[1]}
              style={{
                paddingLeft: windoww ? 13 : 27,
                paddingRight: "6px",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
            />
            <li
              className="navbar__li"
              style={{ display: windoww ? "none" : "inline-block" }}
            >
              {item[0]}
            </li>
            {showTooltip === i && (
              <div className="tooltip">
                {item[0]}
              </div>
            )}
          </div>

            </>
        ))}
      </ul>
    </nav>
  );
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
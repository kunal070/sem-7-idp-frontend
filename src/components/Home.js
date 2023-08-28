import React from 'react'

import { connect } from 'react-redux'

import { logOutUser } from '../actions/session';

const mapStateToProps = ({ session }) => ({
  session
})

// dispatch logout action
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logOutUser())
});
const Home = ({session, logout}) => {
  console.log("home: " , session)
  return (
    <div className='main-container'>
      <div className='temp'>
      <p style={{color:'#0f3c69',padding:'1rem'}}><b>Name :</b> {(session.firstName + " "  + session.lastName) || session.name}</p>
      <p style={{color:'#0f3c69',padding:'1rem'}}><b>Phone :</b> {session.phone}</p>
      <p style={{color:'#0f3c69',padding:'1rem'}}><b>E-mail :</b> {session.email || session.emailId}</p>
      <p style={{color:'#0f3c69',padding:'1rem'}}><b>TypeOfUser :</b> {session.typeOfUser}</p>
      <center>
        <button onClick={logout} style={{color:'white', backgroundColor:'#0f3c69', borderRadius:'0.7rem', padding:'15px 40px'}} > <b> Logout </b> </button>
      </center>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
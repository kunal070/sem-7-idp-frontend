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
    <div className='main-container flex'>
      <div className='temp' style={{ display: 'flex', flexDirection: 'column'}}>
        <div className='flex '>
          <p style={{color:'#0f3c69',padding:'1rem'}}><b>Name :</b> </p>
          <p style={{color:'#0f3c69',paddingRight:'1rem', paddingTop: '1rem', paddingBottom: '1rem', paddingLeft: '2.55rem'}}>{(session.firstName + " "  + session.lastName) || session.name} </p>
        </div>

        <div className='flex '>
          <p style={{color:'#0f3c69',padding:'1rem'}}><b>Phone :</b> </p>
          <p style={{color:'#0f3c69',paddingRight:'1rem', paddingTop: '1rem', paddingBottom: '1rem', paddingLeft: '1.9rem'}}>{session.phone}</p>
        </div>

        <div className='flex '>
          <p style={{color:'#0f3c69',padding:'1rem'}}><b>Email :</b></p>
          <p style={{color:'#0f3c69',paddingRight:'1rem', paddingTop: '1rem', paddingBottom: '1rem', paddingLeft: '2.5em'}}>{session.email || session.emailId}</p>
        </div>

        <div className='flex '>
          <p style={{color:'#0f3c69',padding:'1rem'}}><b>User Type :</b> </p>
          <p style={{color:'#0f3c69',paddingRight:'1rem', paddingTop: '1rem', paddingBottom: '1rem'}}>{session.typeOfUser}</p>
        </div>
      <center>
        <button onClick={logout} style={{color:'white', backgroundColor:'#0f3c69', borderRadius:'5px', padding:'10px 10px'}} > <b> Log Out </b> </button>
      </center>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
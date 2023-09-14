import React, {useState, useRef} from 'react'

import { connect } from 'react-redux'

import { logOutUser } from '../actions/session';

//import { Dialog } from "primereact/dialog";

//import { Button } from "primereact/button";

//import img from "./dp. jpg";

//import { ReactComponent as YourSvg } from './profile.svg';

 
const mapStateToProps = ({ session }) => ({
  session
})

// dispatch logout action
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logOutUser())
});

const Home = ({session, logout}) => {

  const inputRef = useRef(null);

  const [image, setImage] = useState("");

  const handleImageClick = () =>{
    inputRef.current.click();
  }

  const handleImageChange = (event) =>{
    const file = event.target.files[0];
    const imgname = event. target. files [0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement ("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height= maxSize;
        const ctx = canvas.getContext ("2d");
        ctx.drawImage ( 
          img, 
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob( 
          (blob) => {
            const file = new File([blob], imgname, {
               type:"image/png",
               lastModified: Date.now(),
            });

            console.log(file);
            setImage(event.target.files[0]);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  return (
    <div className='main-container flex'>
      <div className='temp' style={{ display: 'flex', flexDirection: 'column'}}>
      <div onClick={handleImageClick}>
        {image ? (<img src={URL.createObjectURL(image)} alt="" className="imageAfter"/>) : (<img src="images/dp.jpg" alt="" className="imageBefore"/>) }
        <input type="file" ref={inputRef} onChange={handleImageChange} style={{display: "none"}}/>
        <p className="notify">*click on profile photo to change it</p>
      </div>

        <div className='flex '>
          <p style={{color:'#0f3c69',paddingRight:'0.5rem', paddingTop: '1rem', paddingBottom: '0.5rem', paddingLeft: '1rem'}}><b>Name :</b> </p>
          <p style={{color:'#0f3c69',paddingRight:'1rem', paddingTop: '1rem', paddingBottom: '0.5rem'}}>{ session.firstName ? (session.firstName + " "  + session.lastName) : session.name} </p>
        </div>

        <div className='flex '>
          <p style={{color:'#0f3c69',paddingRight:'0.5rem', paddingLeft: '1rem', paddingBottom: '0.5rem',}}><b>Phone :</b> </p>
          <p style={{color:'#0f3c69',paddingRight:'1rem', paddingBottom: '0.5rem',}}>{session.phone}</p>
        </div>

        <div className='flex '>
          <p style={{color:'#0f3c69',paddingRight:'0.5rem', paddingBottom: '0.5rem', paddingLeft: '1rem'}}><b>Email :</b></p>
          <p style={{color:'#0f3c69',paddingRight:'1rem', paddingBottom: '0.5rem',}}>{session.email || session.emailId}</p>
        </div>

        <div className='flex '>
          <p style={{color:'#0f3c69',paddingRight:'0.5rem', paddingBottom: '1rem', paddingLeft: '1rem'}}><b>User Type :</b> </p>
          <p style={{color:'#0f3c69',paddingRight:'1rem', paddingBottom: '1rem'}}>{session.typeOfUser.charAt(0).toUpperCase() + session.typeOfUser.slice(1)}</p>
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
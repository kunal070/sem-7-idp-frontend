import React, {useState, useRef, useEffect} from 'react'

import { connect } from 'react-redux'

import { logOutUser } from '../actions/session';
import axios from 'axios';
import CircleLoader from './CircleLoader'

//import { Dialog } from "primereact/dialog";

//import { Button } from "primereact/button";

//import img from "./dp. jpg";

//import { ReactComponent as YourSvg } from './profile.svg';

import { toast } from 'react-toastify' 

const mapStateToProps = ({ session }) => ({
  session
})

// dispatch logout action
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logOutUser())
});

const Profile = ({session, logout}) => {

  const inputRef = useRef(null);

  const [showImage, setShowImage] = useState(session.profileImage)
  const [image, setImage] = useState("");
  const[loader,setLoader] = useState(false)

  const handleImageClick = () =>{
    inputRef.current.click();
  }

  const fetchCurrentImage = async () => {
    try {
      setLoader(true)
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/get-profile-image`, {url:session.profileImage} , {headers: {"Content-Type":"application/json"}})
      console.log("fetching image: ", response.data)
      if(response.data.success) {
        setShowImage(response.data.url)
      }
    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      setLoader(false)
    }, 1000);
  }

  useEffect(() => {
    if(session.profileImage != "images/dp.jpg") {
      fetchCurrentImage()
    }
  }, [session.profileImage])


  const uploadImage = async () => {
    console.log("UPLOADING IMAGE")
    if(image == "") return;
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/update-profile-image`, {image}, {headers: {"Content-Type":"multipart/form-data"}})
      console.log("UPLOAD IMAGE RESPONSE: ", response.data)
      toast(response.data.message)
      if(response.data.success){
        setImage("")
      }
  }

  useEffect(()=> {
    uploadImage()
  }, [image])

  const handleImageChange = async (event) =>{
    setImage(event.target?.files[0]);
    setShowImage(URL.createObjectURL(event.target?.files[0]))
    // const file = event.target.files[0];
    // const imgname = event. target. files [0].name;
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = () => {
    //   const img = new Image();
    //   img.src = reader.result;
    //   img.onload = () => {
    //     const canvas = document.createElement ("canvas");
    //     const maxSize = Math.max(img.width, img.height);
    //     canvas.width = maxSize;
    //     canvas.height= maxSize;
    //     const ctx = canvas.getContext ("2d");
    //     ctx.drawImage ( 
    //       img, 
    //       (maxSize - img.width) / 2,
    //       (maxSize - img.height) / 2
    //     );
    //     canvas.toBlob( 
    //       (blob) => {
    //         const file = new File([blob], imgname, {
    //            type:"image/png",
    //            lastModified: Date.now(),
    //         });

    //         console.log(file);
    //         setImage(event.target.files[0]);
    //       },
    //       "image/jpeg",
    //       0.8
    //     );
    //   };
    // };
  };

  return (
    <div className='main-container flex'>
      <div className='temp' style={{ display: 'flex', flexDirection: 'column'}}>
        {   
        loader ? 
        <div className="imageAfter">
          <CircleLoader/>  
        </div>
         :  <div>
        <img src={showImage}  onClick={handleImageClick} style={{cursor:'pointer'}} alt="" className="imageAfter"/>
        <input type="file" name="image" ref={inputRef} onChange={handleImageChange} style={{display: "none"}}/>
        {/* {image ? <button style={{color:'white', backgroundColor:'#0f3c69', borderRadius:'5px', padding:'10px 10px'}} onClick={uploadProfile}>Change Profile</button> : null } */}
        <p className="notify">*click on profile photo to change it</p>
      </div>
        }

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
)(Profile)
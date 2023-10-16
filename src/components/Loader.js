import React from 'react'

const Loader = () => {
  return (
    <div style={{width:"100vw", height:"100vh", display:'flex', zIndex:99 ,justifyContent:'center', alignItems:'center',backgroundColor:'white',position:'fixed' }}>
      <video autoPlay={true} loop={true} src="loader.mp4" width="30%" height="30%" type="" />
    </div>
  )
}

// import { BoltLoader } from "react-awesome-loaders";
// const Loader = () => {
//   return (
//     <>
//       <BoltLoader
//         className={"loaderbolt"}
//         boltColor={"#of3069"}
//         backgroundBlurColor={"#E0E7FF"}
//       />
//     </>
//   );
// };

export default Loader

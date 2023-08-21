import React from 'react'

const Loader = () => {
  return (
    <div style={{width:"100vw", height:"100vh", display:'flex', justifyContent:'center', alignItems:'center'}}>
      <video autoPlay={true} loop={true} src="loader.mp4" width="30%" height="30%" type="" />
    </div>
  )
}

export default Loader

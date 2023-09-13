import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'

import { toast } from 'react-toastify'

import { connect } from 'react-redux'

const mapStateToProps = ({ session }) => ({
  session
})

const Chat = ({ session }) => {

    const location = useLocation();
  
    const [oldChats, setOldChats] = useState([])

    const [reload, setReload] = useState(false)

    const chatId = location.state.chat._id;

    const messageRef = useRef(null)

    const [participantName, setParticipantName] = useState("")

    const updateMessage = (e) => {
      if(e.keyCode === 13){
        sendMessage()
      }
    }

    const sendMessage = async () => {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/chat/send-message/${chatId}`, {content: messageRef.current.value}, {"headers":{"Content-Type":"application/json"}})
      if(response.data.success) {
        messageRef.current.value = ""
        setReload(!reload)
      }
      else {
        toast(response.data.message)
      }
    }

    const retriveOldChat = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/chat/get-chat-messages/${chatId}`, {headers: {"Content-Type":"application/json"}})
      console.log(response.data)
      setOldChats(response.data.messages)
    }

    useEffect(() => {
        retriveOldChat()
        console.log("chat: ", location.state.chat)
    }, [reload])

    return (
      <>
        <div style={{paddingLeft:'100px'}}>
          <p style={{color:"black", textAlign:'center'}}>Participant Name</p>

          <div style={{display:'flex', width:'100%', color: 'black', flexDirection:'column', padding:"20px"}}>
            {oldChats?.map((msg) => {
              return (
                <>
                  <p style={{color:"black", margin:"10px"}} className={msg.sender._id === session._id ? "text-left" : ""} >{msg.content}</p>
                </>
              )
            })}
          </div>
          <div style={{width:'100%', display:'flex', justifyContent:'flex-end',  padding:"20px"}}>
            <input name="chat" ref={messageRef} onKeyDown={updateMessage} />
          </div>
        </div>
      </>
    )
}

export default connect(
  mapStateToProps
)(Chat)

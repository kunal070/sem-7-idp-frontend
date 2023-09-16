import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';

import { connect } from 'react-redux';

const mapStateToProps = ({ session }) => ({
  session
})

const CONNECTED_EVENT = "connected";
const DISCONNECT_EVENT = "disconnect";
const JOIN_CHAT_EVENT = "joinChat";
const NEW_CHAT_EVENT = "newChat";
const TYPING_EVENT = "typing";
const STOP_TYPING_EVENT = "stopTyping";
const MESSAGE_RECEIVED_EVENT = "messageReceived";
const LEAVE_CHAT_EVENT = "leaveChat";
const UPDATE_GROUP_NAME_EVENT = "updateGroupName";

const ChatHome = ({ session, socket }) => {

    // const currentChat = useRef(null);
    const [currentChat, setCurrentChat] = useState(null)

    const [currentParticipant, setCurrentParticipant] = useState({})

    const [availableUsers ,setAvailableUsers] = useState([])

    // To keep track of the setTimeout function
    const typingTimeoutRef = useRef(null);
  
    // Define state variables and their initial values using 'useState'
    const [isConnected, setIsConnected] = useState(false); // For tracking socket connection
  
    const [openAddChat, setOpenAddChat] = useState(false); // To control the 'Add Chat' modal
    const [loadingChats, setLoadingChats] = useState(false); // To indicate loading of chats
    const [loadingMessages, setLoadingMessages] = useState(false); // To indicate loading of messages
  
    const [chats, setChats] = useState([]); // To store user's chats
    const [messages, setMessages] = useState([]); // To store chat messages
    const [unreadMessages, setUnreadMessages] = useState(
      []
    ); // To track unread messages
  
    const [isTyping, setIsTyping] = useState(false); // To track if someone is currently typing
    const [selfTyping, setSelfTyping] = useState(false); // To track if the current user is typing
  
    const [message, setMessage] = useState(""); // To store the currently typed message
    const [localSearchQuery, setLocalSearchQuery] = useState(""); // For local search functionality

    const navigate = useNavigate()

    const findMember = async () => {
        axios.defaults.withCredentials = true
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/chat/search-users`, {}, {"headers": {"Content-Type":"application/json"}})
        console.log(response.data)
        if(response.data.success){
          setAvailableUsers(response.data.users)
        } else {
          toast(response.data.message)
        }
    }

    const createChatWithUser = async (receiverPhone) => {
        axios.defaults.withCredentials = true
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/chat/get-one-to-one-chat/${receiverPhone}`)
        console.log("chat with user: ", response.data)
        if(response.data.success) {
            getChats()
        } else {
            toast(response.data.message)
        }
        setAvailableUsers([])
    }

    /**
   *  A  function to update the last message of a specified chat to update the chat list
   */
  const updateChatLastMessage = (
    chatToUpdateId,
    message // The new message to be set as the last message
  ) => {
    // Search for the chat with the given ID in the chats array
    const chatToUpdate = chats.find((chat) => chat._id === chatToUpdateId);

    // Update the 'lastMessage' field of the found chat with the new message
    chatToUpdate.lastMessage = message;

    // Update the 'updatedAt' field of the chat with the 'updatedAt' field from the message
    chatToUpdate.updatedAt = message?.updatedAt;

    // Update the state of chats, placing the updated chat at the beginning of the array
    setChats([
      chatToUpdate, // Place the updated chat first
      ...chats.filter((chat) => chat._id !== chatToUpdateId), // Include all other chats except the updated one
    ]);
  };

  const getChats = async () => {
    console.log("get chats")
    axios.defaults.withCredentials = true
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/chat/all-chats`, {headers: {"Content-Type":"application/json"}})
    console.log("get chats: ", response.data)
    if(response.data.success) {
      setChats(response.data.chats || [])
    } else {  
      toast(response.data.message)
    }

    // requestHandler(
    //   async () => await getUserChats(),
    //   setLoadingChats,
    //   (res) => {
    //     const { data } = res;
    //     setChats(data || []);
    //   },
    //   alert
    // );
  };

  const getMessages = async () => {
    // Check if a chat is selected, if not, show an alert
    if (!currentChat?._id) return;
    //  alert("No chat is selected");

    // Check if socket is available, if not, show an alert
    if (!socket) return alert("Socket not available");

    // Emit an event to join the current chat
    socket.emit(JOIN_CHAT_EVENT, currentChat?._id);

    // Filter out unread messages from the current chat as those will be read
    setUnreadMessages(
      unreadMessages.filter((msg) => msg.chat !== currentChat?._id)
    );


    axios.defaults.withCredentials = true
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/chat/get-chat-messages/${currentChat?._id || ""}`, {headers: {"Content-Type":"application/json"}})
    console.log("get Messages: ", response.data)
    if(response.data.success) {
      setMessages(response.data.messages || [])
    } else {  
      toast(response.data.message)
    }
    // // Make an async request to fetch chat messages for the current chat
    // requestHandler(
    //   // Fetching messages for the current chat
    //   async () => await getChatMessages(currentChat.current?._id || ""),
    //   // Set the state to loading while fetching the messages
    //   setLoadingMessages,
    //   // After fetching, set the chat messages to the state if available
    //   (res) => {
    //     const { data } = res;
    //     setMessages(data || []);
    //   },
    //   // Display any error alerts if they occur during the fetch
    //   alert
    // );
  };

  // Function to send a chat message
  const sendChatMessage = async () => {
    // If no current chat ID exists or there's no socket connection, exit the function
    if (!currentChat?._id || !socket) return;

    // Emit a STOP_TYPING_EVENT to inform other users/participants that typing has stopped
    socket.emit(STOP_TYPING_EVENT, currentChat?._id);

    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/chat/send-message/${currentChat?._id || ""}`, {content: message}, {"headers":{"Content-Type":"application/json"}})
    console.log("send message: ", response.data)
    if(response.data.success) {
      setMessage("")
      setMessages((prev) => [...prev, response.data.message]);
      updateChatLastMessage(currentChat?._id || "", response.data.message);
    } else {
      toast(response.data.message)
    }
    // Use the requestHandler to send the message and handle potential response or error
    // await requestHandler(
    //   // Try to send the chat message with the given message and attached files
    //   async () =>
    //     await sendMessage(
    //       currentChat.current?._id || "", // Chat ID or empty string if not available
    //       message, // Actual text message
    //       attachedFiles // Any attached files
    //     ),
    //   null,
    //   // On successful message sending, clear the message input and attached files, then update the UI
    //   (res) => {
    //     setMessage(""); // Clear the message input
    //     setAttachedFiles([]); // Clear the list of attached files
    //     setMessages((prev) => [res.data, ...prev]); // Update messages in the UI
    //     updateChatLastMessage(currentChat.current?._id || "", res.data); // Update the last message in the chat
    //   },

    //   // If there's an error during the message sending process, raise an alert
    //   alert
    // );
  };

  const handleOnMessageChange = (e) => {
    // Update the message state with the current input value
    setMessage(e.target.value);

    // If socket doesn't exist or isn't connected, exit the function
    if (!socket || !isConnected) return;

    // Check if the user isn't already set as typing
    if (!selfTyping) {
      // Set the user as typing
      setSelfTyping(true);

      // Emit a typing event to the server for the current chat
      socket.emit(TYPING_EVENT, currentChat?._id);
    }

    // Clear the previous timeout (if exists) to avoid multiple setTimeouts from running
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Define a length of time (in milliseconds) for the typing timeout
    const timerLength = 3000;

    // Set a timeout to stop the typing indication after the timerLength has passed
    typingTimeoutRef.current = setTimeout(() => {
      // Emit a stop typing event to the server for the current chat
      console.log("stop typing event call")
      socket.emit(STOP_TYPING_EVENT, currentChat?._id);

      // Reset the user's typing state
      setSelfTyping(false);
    }, timerLength);
  };

  const onConnect = () => {
    console.log("socket connected...")
    setIsConnected(true);
  };
  
  const onDisconnect = () => {
    console.log("socket disconnected...")
    setIsConnected(false);
  };

  /**
   * Handles the "typing" event on the socket.
   */
  const handleOnSocketTyping = (chatId) => {
    console.log("Socket typing started...")
    // Check if the typing event is for the currently active chat.
    if (chatId !== currentChat?._id) return;
    
    // Set the typing state to true for the current chat.
    setIsTyping(true);
  };

  /**
   * Handles the "stop typing" event on the socket.
  */
 const handleOnSocketStopTyping = (chatId) => {
    console.log("Socket typing stopped...")
    // Check if the stop typing event is for the currently active chat.
    if (chatId !== currentChat?._id) return;

    // Set the typing state to false for the current chat.
    setIsTyping(false);
  };

  /**
   * Handles the event when a new message is received.
   */
  const onMessageReceived = (message) => {
    console.log("message received...")
    // Check if the received message belongs to the currently active chat
    if (message?.chat !== currentChat?._id) {
      // If not, update the list of unread messages
      setUnreadMessages((prev) => [message, ...prev]);
    } else {
      // If it belongs to the current chat, update the messages list for the active chat
      setMessages((prev) => [...prev, message]);
    }

    // Update the last message for the chat to which the received message belongs
    updateChatLastMessage(message.chat || "", message);
  };

  const onNewChat = (chat) => {
    console.log("New chat arrived")
    setChats((prev) => [chat, ...prev]);
  };

  // This function handles the event when a user leaves a chat.
  const onChatLeave = (chat) => {
    // Check if the chat the user is leaving is the current active chat.
    if (chat._id === currentChat?._id) {
      // If the user is in the group chat they're leaving, close the chat window.
      setCurrentChat(null);
      // Remove the currentChat from local storage.
      // LocalStorage.remove("currentChat");
    }
    // Update the chats by removing the chat that the user left.
    setChats((prev) => prev.filter((c) => c._id !== chat._id));
  };

  useEffect(() => {
    // Fetch the chat list from the server.
    getChats();

  // we will join the chat when user clicks on button
  // Retrieve the current chat details from local storage.
  const _currentChat = JSON.parse(localStorage.getItem("currentChat"))

  // If there's a current chat saved in local storage:
  if (_currentChat) {
    // Set the current chat reference to the one from local storage.
    setCurrentChat(_currentChat);
    // If the socket connection exists, emit an event to join the specific chat using its ID.
    socket?.emit(JOIN_CHAT_EVENT, _currentChat?._id);
    // Fetch the messages for the current chat.
    getMessages();
  }

    // An empty dependency array ensures this useEffect runs only once, similar to componentDidMount.
  }, []);

  

  // This useEffect handles the setting up and tearing down of socket event listeners.
  useEffect(() => {
    // If the socket isn't initialized, we don't set up listeners.
    if (!socket) return;
    console.log("socket called: ", socket)
    // Set up event listeners for various socket events:
    // Listener for when the socket connects.
    socket.on(CONNECTED_EVENT, onConnect);
    // Listener for when the socket disconnects.
    socket.on(DISCONNECT_EVENT, onDisconnect);
    // Listener for when a user is typing.
    socket.on(TYPING_EVENT, handleOnSocketTyping);
    // Listener for when a user stops typing.
    socket.on(STOP_TYPING_EVENT, handleOnSocketStopTyping);
    // Listener for when a new message is received.
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    // Listener for the initiation of a new chat.
    socket.on(NEW_CHAT_EVENT, onNewChat);
    // Listener for when a user leaves a chat.
    socket.on(LEAVE_CHAT_EVENT, onChatLeave);
    // Listener for when a group's name is updated.
    // socket.on(UPDATE_GROUP_NAME_EVENT, onGroupNameChange);

    // When the component using this hook unmounts or if `socket` or `chats` change:
    return () => {
      // Remove all the event listeners we set up to avoid memory leaks and unintended behaviors.
      socket.off(CONNECTED_EVENT, onConnect);
      socket.off(DISCONNECT_EVENT, onDisconnect);
      socket.off(TYPING_EVENT, handleOnSocketTyping);
      socket.off(STOP_TYPING_EVENT, handleOnSocketStopTyping);
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
      socket.off(NEW_CHAT_EVENT, onNewChat);
      socket.off(LEAVE_CHAT_EVENT, onChatLeave);
      // socket.off(UPDATE_GROUP_NAME_EVENT, onGroupNameChange);
    };

    // Note:
    // The `chats` array is used in the `onMessageReceived` function.
    // We need the latest state value of `chats`. 
    // If we don't pass `chats` in the dependency array, the `onMessageReceived` will consider the initial value of the `chats` array, which is empty.
    // This will not cause infinite renders because the functions in the socket are getting mounted and not executed.
    // So, even if some socket callbacks are updating the `chats` state, it's not
    // updating on each `useEffect` call but on each socket call.
  }, [socket, chats]);

  useEffect(() => {
    setCurrentParticipant(currentChat?.participants.find((participant) => participant._id != session._id))
    getMessages()
  }, [currentChat])

  const getParticipant = (chat) => {
    return chat?.participants.find((participant) => participant._id != session._id)
  }

  if(!socket || session.isApproved == false) {
    return (
      <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', color:'black' }}>
        <p> Only Approved Members can acccess chat </p>
      </div>
    )
  }

  return (
    <div style={{ margin:"20px 100px" }}>

    <div className="flex">
      <div style={{width:"30%"}}>
        <div>
          <button name="fine-member" className='plus-button' style={{ width: "100px", height:"50px" , background:"purple" }} onClick={findMember}> + </button>
        </div>
      
        {
          availableUsers?.map((user, index) => {
            return (
              <div style={{ color:'purple', padding:"20px", display:'flex', margin:'10px 0px', alignItems:'center' }}>
                <p>{index + 1}. {user.firstName + " " + user.lastName}</p>
                <button name="add" className='savebtn' style={{margin:"0px 10px"}} onClick={() => createChatWithUser(user.phone)}>Add</button>
              </div>
            )
          })
        }
        
        {chats?.map((chat, index) => {
          const participant = getParticipant(chat)
          return (
          <div className='chat-block' onClick={() => setCurrentChat(chat)}>
            <p style={{fontWeight:"bold"}}>{participant.firstName}</p>
            <p style={{fontSize:'10px'}}>{participant.email}</p>
          </div>
          )
        })}
      </div>

      <div style={{width:"70%"}}>
        {currentChat && currentChat?._id ? 
          <div style={{color:"black"}}>
            <p style={{fontWeight:"bold"}}>{currentParticipant?.firstName}</p>
            <p style={{fontSize:'10px'}}>{currentParticipant?.email}</p>
            <div style={{display:'flex', width:'100%', color: 'black', flexDirection:'column', padding:"20px", height:'80vh', overflowY:"scroll"}}>
            {messages?.map((msg) => {
              return (
                <>
                  <p style={{color:"black", margin:"10px"}} className={msg.sender._id === session._id ? "text-left" : ""} >{msg.content}</p>
                </>
              )
            })}
          </div>
          <div style={{width:'100%', display:'flex', justifyContent:'flex-end',  padding:"20px"}}>
              <input
                placeholder="Message"
                value={message}
                onChange={handleOnMessageChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendChatMessage();
                  }
                }}
              />
          </div>
          </div>
        : <p style={{color:"black"}}>No Chat Selected</p>}
      </div>

    </div>
    </div>

  )
}

export default connect(
  mapStateToProps
)(ChatHome)

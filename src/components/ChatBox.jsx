import React from "react";
import '../css/ChatBox.css'
import Modal from "react-overlays/Modal";
import { useState, useEffect } from "react";

function ChatBox(props) {

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const renderBackdrop = (props2) => <div className="backdrop" {...props2} />;

  const generateDate = (date) => date.getHours() + ":" + date.getMinutes() + " Today";

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        room: "Portfolio Chat",
        author: props.user,
        message: currentMessage,
        time: generateDate(new Date(Date.now()))
      }

      await props.socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    props.socket.on("receive_message", (data) => {
      console.log(data)
      const list = [...messageList, data];
      setMessageList(list.splice(-1));
    });
  }, [props.socket]);

  return (
    <Modal
      className="modal"
      show={props.show}
      onHide={props.handleClose}
      renderBackdrop={renderBackdrop}
    >
      <div className="chat-main-container">
        <span className="close-button" onClick={props.handleClose}>
          x
        </span>
        <div className="chat-online-users">
          <div className="chat-online-users-header">
            <h3>Users Connected</h3>
          </div>
          <div className="chat-online-users-body">
            <div className="chat-online-users-body-item">
              <h3>Mike</h3>
            </div>
          </div>
        </div>
        <div className="chat-main-content">
          <div className="chat-main-content-header">
            <h3>Portfolio Chat</h3>
          </div>
          <div className="chat-main-content-body">
            {messageList.map((messageContent, i) => {
              const classMain = `chat-main-content-body-msg-container-${(props.user === messageContent.author)? 'sent' : 'recieved'}`;
              const classBubble = `chat-main-content-body-msg-${(props.user === messageContent.author)? 'sent' : 'recieved'}`;
              return ( <div className={classMain} key={i}>
                  <div className={classBubble}>
                    <h3>{(props.user === messageContent.author)? 'You' : messageContent.author}</h3>
                    <p>{messageContent.message}</p>
                    <p className="chat-time">{messageContent.time}</p>
                  </div>
                </div> )
                
                // <div className="chat-main-content-body-msg-container-recieved">
                //   <div className="chat-main-content-body-msg-recieved">
                //     <h3>{messageContent.author}</h3>
                //     <p>{messageContent.message}</p>
                //     <p className="chat-time">{messageContent.time}</p>
                //   </div>
                // </div>
            })}
            
            
          </div>
          <div className="chat-main-content-footer">
            <textarea 
              name="" 
              id="" 
              cols="30" 
              rows="10" 
              value={currentMessage}
              className="chat-main-content-footer-input" 
              onChange={(event) => setCurrentMessage(event.target.value)}
              onKeyPress={(event) => { event.key === "Enter" && sendMessage(); }}></textarea>
            <button className="chat-main-content-footer-send"  onClick={sendMessage}>
              <img src={require(`../icons/paper-plane.png`)} alt="" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ChatBox;
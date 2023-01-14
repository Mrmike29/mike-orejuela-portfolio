import React from "react";
import '../css/ChatBotton.css'

function ChatBotton ({handleOpen}) {
  return (
    <div className="chat-botton" onClick={handleOpen}>
      <img src={require(`../icons/chat.png`)} alt="" />
    </div>
  );
}

export default ChatBotton;
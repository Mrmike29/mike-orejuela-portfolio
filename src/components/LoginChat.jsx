import React from "react";
import '../css/LoginChat.css'
import Modal from "react-overlays/Modal";

function LoginChat (props) {
  
  const renderBackdrop = (props2) => <div className="backdrop" {...props2} />;

  return (
    <Modal
      className="modal"
      show={props.show}
      onHide={props.handleClose}
      renderBackdrop={renderBackdrop}
    >
      <div className="chat-login-container">
        <span className="close-button" onClick={props.handleClose}>
          x
        </span>
        <div className="chat-login">
          <div className="chat-login-header">
            <h3>Login</h3>
          </div>
          <div className="chat-login-body">
            <div className="chat-login-body-item">
              <h3>Nickname</h3>
              <input className="chat-login-input" type="text" name="nickname" id="nickname" onChange={props.onChange} />
            </div>
          </div>
          <div className="chat-login-footer">
            <button className="chat-login-button" onClick={props.joinRoom}>
              Let's Chat
              <img src={require(`../icons/lets-chat.png`)} alt="" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
  
export default LoginChat;
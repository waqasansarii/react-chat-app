import React, { useRef, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import TextField from "./TextField";
import firebase from "../Config/FirebaseConfig";
import { Link } from "react-router-dom";
import {backToChatList} from '../Store/CreateSlice'
// assets
import user from "../Assets/userIcon.png";

const ChatBox = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => {
    return state.chatReducer;
  });
  const currentUserId = firebase.auth().currentUser.uid;
  const currentSelectUserHeadInfo = selector.currentChatBox;
  const chating = selector.chatList;
  const selectFriendId = selector.friendChatUid;
  // console.log(selectFriendId);
  const filterFrienChatList = chating.filter(
    (list) =>
      (list.userId === currentUserId && list.friendId === selectFriendId) ||
      (list.userId === selectFriendId && list.friendId === currentUserId)
  );
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (selectFriendId) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectFriendId]);

  // back to list function 
  const handleBackToChatList = ()=>{
    dispatch(backToChatList(''))
  }

  return (
    <>
      <div className="chat_container">
        <div className="chat_md">
          {currentSelectUserHeadInfo.length ? (
            <div className="chat_content">
              {currentSelectUserHeadInfo.map((val) => (
                <div className="chat_head" key={val.uid}>
                  <Link className="back_link" to="/dashboard" onClick={handleBackToChatList}>
                    <ArrowBackIosIcon className="back_link_icon" />
                  </Link>
                    <img src={user} className="c_usr_img" alt="user" />
                    <p>{val.name}</p>
                </div>
              ))}
              <div className="msgs_box">
                <ul className="user_msg_ul">
                  {filterFrienChatList[0] &&
                    filterFrienChatList[0].messages.map((msg, i) => (
                      <li
                        className={
                          msg.senderId === currentUserId
                            ? "crnt_user_li"
                            : "user_msg_li"
                        }
                        key={i}
                      >
                        <div>
                          {msg.senderId !== currentUserId ? (
                            <img className="msg_img" src={user} alt="" />
                          ) : null}
                          <p>{msg.message}</p>
                        </div>
                        <p className="msgDate">
                          {msg.dateAndTime.slice(10, 22)}
                        </p>
                      </li>
                    ))}
                </ul>
                <div ref={messagesEndRef} />
              </div>
              <TextField />
            </div>
          ) : (
            <div>
              <h1>Empty</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatBox;

import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
// assets
import user from "../Assets/userIcon.png";
import TextField from "./TextField";
import firebase from "../Config/FirebaseConfig";

const ChatBox = () => {
  const selector = useSelector((state) => {
    return state.chatReducer;
  });
  const currentUserId = firebase.auth().currentUser.uid;
  const currentSelectUserHeadInfo = selector.currentChatBox;
  const chating = selector.chatList;
  const selectFriendId = selector.friendChatUid;
  // console.log(chating);
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

  return (
    <>
      <div className="chat_container">
        <div className="chat_md">
          {currentSelectUserHeadInfo.length ? (
            <div className="chat_content">
              {currentSelectUserHeadInfo.map((val) => (
                <div className="chat_head" key={val.uid}>
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

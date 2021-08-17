import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "../Config/FirebaseConfig";
import SendIcon from '@material-ui/icons/Send';
// assets
// import user from "../Assets/userIcon.png";

const TextField = () => {
    
    const selector = useSelector((state) => {
    return state.chatReducer;
  });
  const friendName = selector.currentChatBox[0].name
  const currentUserName = selector.currentUserData.name
  const chating = selector.chatList;
  const selectFriendId = selector.friendChatUid;
  const currentUserId = firebase.auth().currentUser.uid;
  const createChatRoom = firebase.firestore().collection("chatRoom");
  const [msgInput, setMsgInput] = useState("");
  const handleMessage = (e) => {
    setMsgInput(e.target.value);
};
const inputRef = useRef(null);
useEffect(()=>{
   inputRef.current.focus()
},[selectFriendId])
  const date = new Date();
  const time = date.toLocaleString();
  const chatRoomDatObject = {
    userId: currentUserId,
    friendId: selectFriendId,
    name:currentUserName,
    friendName:friendName,
    lastSenderId:currentUserId,
    time:time,
    hasReadAll:false,
    messages: firebase.firestore.FieldValue.arrayUnion({
      dateAndTime: time,
      message: msgInput,
      senderId: currentUserId,
      hasRead:false
    }),
  };
  const existUserChatObject = {
    time:time,
    hasReadAll:false,
    lastSenderId:currentUserId,

    messages: firebase.firestore.FieldValue.arrayUnion({
      dateAndTime: time,
      message: msgInput,
      senderId: currentUserId,
      hasRead:false

    }),
  };
  const checkUserExist =  () => {
    const chatRoomId = `${currentUserId}.${selectFriendId}`;
    let userExist =  createChatRoom
      .doc(chatRoomId)
      .get()
      .then((data) => {
        return data.exists;
      })
      .catch((error) => {
        console.log(error);
      });
    return userExist;
  };
  const checkUltarnateUserIdExist =  () => {
    const chatRoomId = `${selectFriendId}.${currentUserId}`;
    let userExist =  createChatRoom
      .doc(chatRoomId)
      .get()
      .then((data) => {
        return data.exists;
      })
      .catch((error) => {
        console.log(error);
      });
    return userExist;
  };
  const sendMessage = async () => {
    const checkExistens = await checkUserExist();
    const checkUlternateIdExistens = await checkUltarnateUserIdExist();
    const chatRoomId = `${currentUserId}.${selectFriendId}`;
    const ulternateChatRoomId = `${selectFriendId}.${currentUserId}`;
    if (checkExistens || checkUlternateIdExistens) {
      // console.log("");
      createChatRoom
        .doc(checkExistens ? chatRoomId : ulternateChatRoomId)
        .update(existUserChatObject);
    } else {
      createChatRoom.doc(chatRoomId).set(chatRoomDatObject);
    }
    if (!chating.length) {
      createChatRoom.doc(chatRoomId).set(chatRoomDatObject);
    }

    setMsgInput("");
  };

  return (
    <div className="input_section">
      <div className="msg_input">
        <input
          type="text"
          placeholder="type message"
          value={msgInput}
          onChange={handleMessage}
          ref={inputRef}
        />
        {/* <img
          className="sent_img"
          src="https://www.searchpng.com/wp-content/uploads/2019/02/Sent-Icon-PNG-715x657.png"
          alt="..."
          onClick={sendMessage}
        /> */}
        <SendIcon className='sentMsgIcon' onClick={sendMessage}/>
      </div>
    </div>
  );
};

export default TextField;

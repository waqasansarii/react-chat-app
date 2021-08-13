import React from "react";
import {openChatBox} from '../Store/CreateSlice'
import {useDispatch} from 'react-redux'
// assets
import user from "../Assets/userIcon.png";

const UsersList = ({ allUsersData,seeMsg }) => {
  const dispatch = useDispatch()
  const msg = "Lorem, ipsum dolor sit amet consectetur adipis";
  const handleChatId = (id) => {
    // console.log(id)
    dispatch(openChatBox(id))
  }
  return (
    <div className="userList_container">
      <div className="userList_md">
        <div className="userlist_content">
          <ul className="frndList_ul">
            {allUsersData && allUsersData.map((value) => (
              <li key={value.uid} onClick={()=>handleChatId(value.uid)}>
                <div className="msg_list">
                  <img className="c_usr_img" src={user} alt="user" />
                  <div>
                    <p className="msg_name">{value.name}</p>
                    {seeMsg?
                    <p className="short_msg">{msg.substring(0, 45)}...</p>
                  :null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsersList;

import React from "react";
import { openChatBox } from "../Store/CreateSlice";
import { useDispatch } from "react-redux";
// assets
import user from "../Assets/userIcon.png";

const UsersList = ({ allUsersData, seeMsg, currentId, selectChatId }) => {
  const dispatch = useDispatch();
  const handleChatId = (id) => {
    dispatch(openChatBox(id));
  };
  return (
    <div className="userList_container">
      <div className="userList_md">
        <div className="userlist_content">
          <ul className="frndList_ul">
            {allUsersData &&
              allUsersData.map((value, i) => {
                return (
                  <li
                    key={i}
                    onClick={() =>
                      handleChatId(
                        value.uid
                          ? value.uid
                          : value.friendId === currentId
                          ? value.userId
                          : value.friendId
                      )
                    }
                    className={
                      value.uid === selectChatId
                        ? "highlight"
                        : value.userId === selectChatId
                        ? "highlight"
                        : value.friendId === selectChatId
                        ? "highlight"
                        : ""
                    }
                  >
                    <div className="msg_list">
                      <img className="c_usr_img" src={user} alt="user" />
                      <div>
                        <p className="msg_name">
                          {value.uid
                            ? value.name
                            : value.userId === currentId
                            ? value.friendName
                            : value.name}
                        </p>
                        {seeMsg ? (
                          <p className="short_msg">
                            {value.messages[value.messages.length - 1].message}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsersList;

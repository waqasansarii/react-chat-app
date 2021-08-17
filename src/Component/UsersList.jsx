import React, { useState } from "react";
import { openChatBox } from "../Store/CreateSlice";
import { useDispatch } from "react-redux";
// assets
import user from "../Assets/userIcon.png";
import { Link, useHistory } from "react-router-dom";

const UsersList = ({ allUsersData, seeMsg, currentId, selectChatId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [width, setWidth] = useState(window.innerWidth);
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return () =>
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
  }, []);
  const handleChatId = (id) => {
    if (width <= 640) {
      history.push(`/dashboard/${id}`);
    }
    dispatch(openChatBox(id));
  };
  return (
    <div className="userList_container">
      <div className="userList_md">
        <div className="userlist_content">
          <ul className="frndList_ul">
            {allUsersData &&
              allUsersData.map((value, i) => {
                let getName = value.uid
                  ? value.name
                  : value.userId === currentId
                  ? value.friendName
                  : value.name;
                  
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
                      {/* <img className="c_usr_img" src={user} alt="user" /> */}
                      <span className="nameTitle">
                        {getName.slice(0, 1).toUpperCase()}
                      </span>
                      <div>
                        <p className="msg_name">
                          {/* {value.uid
                            ? value.name
                            : value.userId === currentId
                            ? value.friendName
                            : value.name} */}
                          {getName}
                        </p>
                        {seeMsg ? (
                          <p className="short_msg">
                            {value.messages[
                              value.messages.length - 1
                            ].message.substring(0, 45)}
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

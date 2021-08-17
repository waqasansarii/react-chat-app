import React, { useState } from "react";
import { openChatBox } from "../Store/CreateSlice";
import { useDispatch } from "react-redux";
// assets
// import user from "../Assets/userIcon.png";
import { useHistory } from "react-router-dom";

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

  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return (
    <div className="userList_container">
      <div className="userList_md">
        <div className="userlist_content">
          <ul className="frndList_ul">
            {allUsersData &&
              allUsersData.map((value, i) => {
                // console.log(value);
                let getName = value.uid
                  ? value.name
                  : value.userId === currentId
                  ? value.friendName
                  : value.name;
                const grnClr = alphabet
                  .slice(0, 5)
                  .some((val) => getName.slice(0, 1).toUpperCase() === val);
                const blueClr = alphabet
                  .slice(5, 10)
                  .some((val) => getName.slice(0, 1).toUpperCase() === val);
                const orangeClr = alphabet
                  .slice(10, 15)
                  .some((val) => getName.slice(0, 1).toUpperCase() === val);
                const cyanClr = alphabet
                  .slice(15, 20)
                  .some((val) => getName.slice(0, 1).toUpperCase() === val);

                  // filter unread number of messages 
                const unreadList = [];
                const unreadMsg =
                  // value.lastSenderId !== currentId
                  //   ?
                 value.messages? value.messages.map((val) => {
                    if (val.hasRead === false && val.senderId !== currentId) {
                      unreadList.push(val);
                    }
                    return val
                  })
                : null;
                // console.log(unreadMsg)
                // console.log(unreadList)

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
                      <span
                        className={
                          grnClr
                            ? "grnNumber"
                            : blueClr
                            ? "blueNumber"
                            : orangeClr
                            ? "orngNumber"
                            : cyanClr
                            ? "cyanNumber"
                            : "blackNumber"
                        }
                      >
                        {getName.slice(0, 1).toUpperCase()}
                      </span>
                      <div>
                        <p className="msg_name">{getName}</p>
                        {seeMsg ? (
                          <p className="short_msg">
                            {value.messages[
                              value.messages.length - 1
                            ].message.substring(0, 45)}
                          </p>
                        ) : null}
                      </div>
                      <p className={unreadList.length ? "unreadMsg" : ""}>
                        {unreadList.length || ""}
                      </p>
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

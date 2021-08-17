import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import UsersList from "./UsersList";
import firebase from "../Config/FirebaseConfig";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: "white",
  },
  mainBg: {
    backgroundColor: "white",
  },
}));

export default function ChatAndPeopleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  };

  const currentUserId = firebase.auth().currentUser.uid;
  // get global state
  const stateSelector = useSelector((state) => {
    return state.chatReducer;
  });

  const { chatList, friendChatUid, users } = stateSelector;
  // console.log(chatList);
  const filterFriendChatList = chatList.filter(
    (list) => list.userId === currentUserId || list.friendId === currentUserId
  );
  // console.log(filterFriendChatList)
  

  const filterUsersList = users.filter((userList) => {
    return !filterFriendChatList.find((chatList) => {
      return (
        chatList.userId === userList.uid || chatList.friendId === userList.uid
      );
    });
  });


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.mainBg}>
        <Tabs
          value={value}
          onChange={handleTabsChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label={'Chats'} {...a11yProps(0)} />
          <Tab label="People" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <UsersList
          seeMsg
          allUsersData={filterFriendChatList}
          currentId={currentUserId}
          selectChatId={friendChatUid}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UsersList allUsersData={filterUsersList}
          selectChatId={friendChatUid}

         />
      </TabPanel>
    </div>
  );
}

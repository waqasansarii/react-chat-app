import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./InitialState";



const chatSlice = createSlice({
  name: "chatApp",
  initialState: InitialState,
 reducers : {
    login: (state, action) => {
        state.userLogin = action.payload
    },
    currentUserDataSet:(state,action)=>{
       state.currentUserData = action.payload
    },
    getAllUsers : (state,action)=>{
      state.users=action.payload
      // console.log(action.payload)

    },
    openChatBox:(state,action)=>{
      const selectChatId = action.payload
      state.friendChatUid=selectChatId;
      const filterUserData = state.users.filter((val)=> val.uid ===selectChatId )
      state.currentChatBox = filterUserData
    },
    chatDataFromFirebase : (state,action)=>{
      //  console.log(action.payload)
       state.chatList= action.payload
    }
  },
});

export const  {login,currentUserDataSet,getAllUsers,openChatBox,chatDataFromFirebase} = chatSlice.actions 

export const chatReducer = chatSlice.reducer;

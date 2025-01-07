import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name:'userInfo', 
    initialState:{name:'D.H. Lee', age:44},
    reducers:{
        updateName(state){
            state.name = 'Jua Lee';
        }, 
        updateAge(state, action){
            state.age = state.age + action.payload;
        }  

    }
});

export let {updateName, updateAge} = user.actions
export default user;
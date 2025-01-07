import { createSlice } from "@reduxjs/toolkit";

let viewItem = createSlice({
    name:'viewItem', 
    initialState:[        
    ],
    reducers:{
        getViewFromLocalStorage(state){            
            if(localStorage.getItem("watched") != null && state.length==0){
                var items = JSON.parse(localStorage.getItem("watched"));
                
                state = state.push(...items);
            }
        },
        viewItemUpdate(state, action){            
            state.findIndex((a)=>a.id === action.payload.id);
            if(state.length >= 3){
                state.splice(0, state.length -2);
            }

            state.push(action.payload);
        } 
    }    
});

export let {viewItemUpdate, getViewFromLocalStorage} = viewItem.actions
export default viewItem;
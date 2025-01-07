import { createSlice } from "@reduxjs/toolkit";

let stock = createSlice({
    name:'stock', 
    initialState:[
        /*{id : 0, name : 'White and Black', count : 2, img:'https://codingapple1.github.io/shop/shoes1.jpg'},
        {id : 2, name : 'Grey Yordan', count : 1, img:'https://codingapple1.github.io/shop/shoes3.jpg'}*/
    ],
    reducers:{
        updateStock(state, action){     
            let i = state.findIndex((a)=>a.id === action.payload.id);
            console.log(action.payload);

            if(state[i].count >1){
                state[i].count += action.payload.count;            
            }else{
                state.splice(i,1);
            }
                

        }, 
        addCartStock(state, action){
            let i = state.findIndex((a)=>a.id === action.payload.id);

            console.log(i);

            if(i != undefined && i != null && i != -1){
                state[i].count+=1;
            }else{
                state.push(action.payload);
            }
        } 
    }    
});

export let {updateStock, addCartStock} = stock.actions
export default stock;
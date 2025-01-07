import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'
import stock from './store/stockSlice'
import viewItem from './store/viewItemSlice'

export default configureStore({
  reducer: { 
    user : user.reducer, 
    stock : stock.reducer, 
    viewItem : viewItem.reducer
  }
}) 


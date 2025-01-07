import axios from "axios";
import { useState } from "react";

export function useUserInfo(){
    let [userInfo, updateUserInfo] = useState([]);    

    function getUserInfo(state){
        axios.get('/userData.json').then(            
            (item)=>{updateUserInfo(item.data); console.log(item.data); console.log('aaaaa = '+item.data.userName)}
        )

    }

    return [userInfo, getUserInfo];
}
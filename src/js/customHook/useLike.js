import { useState } from "react";

export function useLike(){    
    let[likecnt, updateLikeCnt] = useState(0);

    function updateLike(){
        updateLikeCnt(likecnt+1);
    }

    return [likecnt, updateLike];

}
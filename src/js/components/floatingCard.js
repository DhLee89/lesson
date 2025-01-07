import { useEffect } from 'react';
import { Card, ListGroup} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

import {getViewFromLocalStorage} from "../store/viewItemSlice";

function FloatingCard(){
    const viewItem = useSelector((state)=>{ return state.viewItem});

    const dispatch = useDispatch();

    useEffect(()=>{          
      if(localStorage.getItem("watched") != null){        
        dispatch(getViewFromLocalStorage());
      }    
    },[]);

    console.log(viewItem);
    return(
      viewItem!=null&& viewItem.length >0?<Card className="floatingCard">        
        <Card.Body>
          <Card.Title>최근 본 상품</Card.Title>
          <ListGroup className="list-group-flush">
            {              
                viewItem.map(
                    (data, i)=>(
                      i<=2 &&
                      (  <ListGroup.Item>                        
                          <Card.Img variant="top" src={data.imgUrl} style={{width:150}}/>
                          <Card.Title>{data.content}</Card.Title>                                
                        </ListGroup.Item> 
                      )                        
                    )
                )
            }        
          </ListGroup>        
        </Card.Body>
      </Card>
    :<></>
    );

}

export default FloatingCard;


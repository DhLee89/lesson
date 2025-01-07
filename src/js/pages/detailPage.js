import { useContext, useEffect, useState } from 'react';
import '../../App.css';

import { Button } from "react-bootstrap";
import { Route, Routes, useParams } from "react-router-dom";
import { Nav} from 'react-bootstrap';
import {Context1} from '../../App.js'

import { useSelector, useDispatch} from 'react-redux';
import { addCartStock } from '../store/stockSlice';
import { viewItemUpdate } from '../store/viewItemSlice.js';
import {useLike} from '../customHook/useLike.js';

function DetailPage(props){
    let form;

    let {id} = useParams();    
    let item = props.data.find(item => String(item.id) === id);
    let [boolAleart, changeBool] = useState(true);
    let [constat, updateConStat] = useState(0);
    let[fade, updateFade] = useState('');
    
    let [likecnt, updateLike] = useLike();

    let {stock} = useContext(Context1);

    let cartStock = useSelector((state)=>state.stock);
    const dispatch = useDispatch();

   
    useEffect(()=>{        
            const timer = setTimeout(() => {            
                changeBool(false);
            }, 2*1000);
            updateFade('endAni');
        }
    );

    useEffect(()=>{        
        const tempSet = new Set(JSON.parse(localStorage.getItem("watched")));
        
        localStorage.setItem("watched" , JSON.stringify([...tempSet.add({id:item.id, content: item.title, count:1, imgUrl:item.imgUrl})]));               

        dispatch(viewItemUpdate(item));


        }, []
    );

    function onSubmitInput(event){        
        event.preventDefault();
        form = document.getElementById('checkNan');
       
        const input = form.querySelector('input');

        if(isNaN(input.value)){
            alert('숫자가 아닙니다. 다시 데이터를 넣어주세요 ');
            input.value = '';
            input.focus();
        }

    }
   
   

    return (    
        <div className={'startAni '+ fade}>
            {false?<div className="alert">2초이내에 구매를 하시면 할인을 해드립니다.!!</div>:null}            
            {item.imgUrl!== null?<img src={item.imgUrl} width="80%" style={{maxWidth: 500}} />:<img src="https://codingapple1.github.io/shop/shoes1.jpg" width="80%" style={{maxWidth: 500}}/>}
            <h4>{item.title}</h4>
            <p>{item.content}</p>
            <p>{item.price}</p>
            <div onClick={updateLike}>♥ ({likecnt})</div>
            <Button variant="primary" onClick={()=>{return dispatch(addCartStock({id:item.id, name: item.title, count:1, imgUrl:item.imgUrl}));}}> 주문하기</Button>
            <div style={{padding:50}}>
                <Nav variant="tabs" defaultActiveKey="contents1">
                <Nav.Item>
                    <Nav.Link eventKey="contents1" onClick={()=>{updateConStat(0)}}>내용1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="contents2"  onClick={()=>{updateConStat(1)}}>내용2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="contents3"  onClick={()=>{updateConStat(2)}}>내용3 </Nav.Link>
                </Nav.Item>
                </Nav>
            </div>
            <Content tap = {constat} stock={stock}/>
            
        </div>
                 
    );    
}

function Content(constat){
    const endFade ='endAni';
    let[fade, updateFade] = useState('');

    useEffect(()=>{
        const timer = setTimeout(()=>{updateFade('endAni')});
        

        return()=>{
            updateFade('');
            clearTimeout(timer);
            
        }
    },     
        [constat.tap]
    );

    return (
        <div className={'startAni '+ fade}>{[<div>내용0 : {constat.stock[0]}</div>, <div>내용1</div>, <div>내용2</div> ][constat.tap]}</div>        
    );
}

export default DetailPage;

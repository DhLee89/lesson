import logo from './logo.svg';
import './App.css';
import { createContext, useState } from 'react';
import { Button,Navbar, Nav,  NavDropdown, Card, ListGroup} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import bgImg from './assets/img/bg.png';
import dataList from './js/shoesData.js'
import StuffCard from './js/components/stuffCard.js'
import DetailPage from './js/pages/detailPage.js'
import ShoppingCart from './js/pages/shoppingCart.js'
import FloatingCard from './js/components/floatingCard.js'

import { Routes,Route, Link, useNavigate, Outlet } from 'react-router-dom';

import { useEffect } from 'react';
import axios from 'axios';
import React from 'react'
import { useQueries, useQuery } from 'react-query';
import { useUserInfo } from './js/customHook/useUserInfo.js';

export let Context1 = React.createContext();

function App() {
  let navigate = useNavigate();  
  let [items, updateItem] = useState(dataList);
  let [boolAleart, changeBool] = useState(false);
  let[alertMsg, changeAlertMsg] = useState("");
  let[ClickCnt, updateClickCnt] = useState(0);
  let [stock, updateStock] = useState([10,11,12]);

  let[userInfo, getUserInfo] = useUserInfo();

  console.log(userInfo.userName);
  console.log(userInfo.userName);

  const urls = ['https://codingapple1.github.io/shop/data2.json', 'https://codingapple1.github.io/shop/data3.json'];
  const urlUserData = "https://codingapple1.github.io/userdata.json";

  useEffect(()=>{    
    if(localStorage.getItem("watched") == null){
      localStorage.setItem("watched", JSON.stringify([]));
    }    
  },[]);

  //axios.get(urlUserData).then((a)=>{})
    /*let result = useQuery('userInfo', 
      ()=>{
        return axios.get().then((a)=>{
          return a;
        });
      }
    );*/
  
  function setalert(msg){
    changeBool(true);
    
    changeAlertMsg(msg);

    const timer = setTimeout(() => {            
      changeBool(false);
    }, 2*1000);
  }
  

  function loadMoreItem(){
    console.log('clickCnt =  '+ClickCnt);
    if(ClickCnt ===2){
      setalert('더는 상품이 없습니다.');
    }else{
      setalert('로딩중.');

      axios.get(urls[ClickCnt]).then(
        (items)=>{                   
          updateItem(dataList.push(...items.data));
          

          changeBool(false);
          updateClickCnt(++ClickCnt);           
        }
      ).catch(
        (e)=>{
          console.dir(e);
          changeBool(false);
        }
      );
    }
  }

  return (
    <div className="App">
      <Navbar  variant="light" bg="light" >
        <Container>
          <Navbar.Brand onClick={()=>{navigate('/')}}>Online Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/shoppingCart')}}>Cart</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <FloatingCard/>
    <div className="main-bg"></div>
    <div id="userInfo">{userInfo.userName !==undefined?<span>{userInfo.userName}님 안녕하세요</span>:<><span>로그인을 해주세요</span> <button onClick={getUserInfo}>로그인</button></>}</div>
     {boolAleart?<div className="alert" id='mainAlert'>{alertMsg}</div>:null}     
      <Routes>
        <Route path='/' element={
          <>
            <Container>            
                {                  
                  dataList.reduce((rows, item, i) => {
                  if (i % 3 === 0) {
                    rows.push([]);
                  }
                  rows[rows.length - 1].push(item);
                  return rows;
                }, []).map((group, rowIndex) => (
                  <Row key={`row-${rowIndex}`}>
                    {group.map((data, index) => (
                      <StuffCard data={data} key={`card-${rowIndex}-${index}`} />
                    ))}
                  </Row>
                ))}  
            </Container>
            <button onClick={loadMoreItem}>더보기</button>
          </>
        }/>
          <Route path='/detail/:id' element={
            <Context1.Provider value={{stock}}>
              <DetailPage data={dataList} />
            </Context1.Provider>   
          } />              
          <Route path='/shoppingCart' element={<div><ShoppingCart/></div>}></Route>
        <Route path='/About' element={<div>About<Outlet></Outlet> 저기다 표시</div>}>  
          <Route path='history' element={<div>history</div>} />
          <Route path='member' element={<div>member</div>} />
        </Route>

        <Route path='*' element={<div>404에러발생</div>} />
      </Routes>
      
    </div>    
  );
}

export default App;

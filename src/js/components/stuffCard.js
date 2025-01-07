import { Container,Row, Col } from 'react-bootstrap';
import { Routes,Route, Link } from 'react-router-dom';

function StuffCard(props){
    return(
     
        <Col key={props.data.id}>
          <Link to={"/detail/"+props.data.id}>      
            {props.data.imgUrl!== null?<img src={props.data.imgUrl} width="80%"/>:<img src="https://codingapple1.github.io/shop/shoes1.jpg" width="80%"/>}
            <h4>{props.data.title}</h4>
            <p>{props.data.content}</p>
            <p>{props.data.price}</p>
          </Link>
        </Col>
     
    );
 
  }

  export default StuffCard;

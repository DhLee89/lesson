import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch} from 'react-redux';
import { updateName, updateAge } from '../store/userSlice';
import { updateStock } from '../store/stockSlice';

function ShopptingCart(){
    
    const stock = useSelector((state)=>{ return state.stock});        
    const user = useSelector((state)=>{ return state.user});
    const dispatch = useDispatch();

    return (
        <div>
            <h6>{user.name}({user.age})의 장바구니</h6>
            <button onClick={()=>dispatch(updateName())}>이름 변경</button>
            <button onClick={()=>dispatch(updateAge(3))}>나이 변경</button>
            <Table striped bordered hover style={{padding:20}}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Count</th>
                        <th>Function</th>
                    </tr>
                </thead>
                {
                    stock.map((data, i)=>
                        (
                            <tbody key={i}>
                                <tr>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.count}</td>                                
                                    <td><button onClick={()=>{dispatch(updateStock({id:data.id, count:1}))}} style={{width:30}} >+</button><button onClick={()=>{dispatch(updateStock({id:data.id, count:-1}))}} style={{width:30,marginLeft:10}}>-</button></td>
                                </tr>                                       
                            </tbody>
                        )
                    )
                }            
            </Table>
        </div>
    );
}

export default ShopptingCart;
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import List from './features/shoe/List';
import {  useDispatch } from 'react-redux';
import { Route,Routes, useNavigate} from 'react-router-dom';
import Basket from './features/order/Basket';
import NavBar from './NavBar';
import { saveUser } from './features/user/userSlice';
import Shoe from './features/shoe/Shoe';
import Login from './features/user/Login';
import SignUp from './features/user/SignUp';
import OrderForm from './features/order/OrderForm';
import EditShoeForm from "./features/shoe/EditShoe";
import AllOrders from './features/order/AllOrders';
import AddShoe from "./features/shoe/AddShoe"
import { useEffect } from 'react';


function App() {
  let navigate=useNavigate();
  let dispatch=useDispatch();
   const user=JSON.parse(localStorage.getItem("currentUser"));
   if(user)
   dispatch(saveUser(user))

  //  useEffect(()=>{navigate("/shoes")},[])


  return (
   
    <div className="App">
 
      <NavBar/>  
       
     <Routes> 

      <Route path='shoes'  element={<List/>}> 
      <Route path="shoe/:_id"  element={<Shoe/>} />
      </Route>


      <Route path='allOrders'  element={<AllOrders/>}/>
      
      <Route path="basket"  element={<Basket/>} />
    
      <Route path="login"  element={<Login/>} />

      <Route path="signUp"  element={<SignUp/>} />

      <Route path="addShoe"  element={<AddShoe/>} />

      <Route path="orderForm"  element={<OrderForm/>} />
     
      <Route path="editShoe" element={<EditShoeForm />} />




    </Routes>

    </div>
  );
}

export default App;

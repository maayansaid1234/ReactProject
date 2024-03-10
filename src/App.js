import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { ToastContainer } from 'react-toastify';
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
import ProtectedRouteForManager from './protectedRoutes/ProtectedRouteForManager';
import ProtectedRouteForUser from './protectedRoutes/ProtectedRouteForUser';

function App() {
  let navigate=useNavigate();
  let dispatch=useDispatch();
   const user=JSON.parse(localStorage.getItem("currentUser"));
   if(user)
   dispatch(saveUser(user))

  //  useEffect(()=>{navigate("/shoes")},[])


  return (
   
    <div className="App">
   
     <ToastContainer />

       <NavBar/>  
       
      <Routes> 

      <Route path='shoes'  element={<List/>}> 
      <Route path="shoe/:_id"  element={<Shoe/>} />
       </Route>


     <Route path='allOrders'  element={
      <ProtectedRouteForManager>
      <AllOrders/>
      </ProtectedRouteForManager>}  />
    
      
    <Route path="basket"  element={<Basket/>} />
    
      <Route path="login"  element={<Login/>} />

     <Route path="signUp"  element={<SignUp/>} />

      <Route path="addShoe"  element={
        <ProtectedRouteForManager>
          <AddShoe/>
        </ProtectedRouteForManager>
      
      } />

      <Route path="orderForm"  element={
        <ProtectedRouteForUser>
        <OrderForm/>
        </ProtectedRouteForUser>
       } />

      
     
       <Route path="editShoe" element={
        <ProtectedRouteForManager>
           <EditShoeForm />
        </ProtectedRouteForManager>   } />

      <Route path="/" element={
        <List/>
      }/>
    




    </Routes>

     </div>
   
  );
}

export default App;

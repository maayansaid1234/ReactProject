// import { NavLink, useNavigate } from "react-router-dom";
// import "./NavBarCss.css"
// import ShoppingCartRounded from "@mui/icons-material/ShoppingCartRounded";
// import { useDispatch, useSelector } from "react-redux";
// import {resetPage} from "./features/shoe/shoeSlice"
// import { resetUser } from "./features/user/userSlice";
// import { resetBasket, resetOrderDetails } from "./features/order/orderSlice";


// const NavBar = () => {
//   let dispatch=useDispatch();
//   let navigate=useNavigate()
//   let user=useSelector(st=>st.user.currentUser);
//     return (
//    <ul id="ulNavBar" style={{width:"90%"}}>
//    {user==null&&<li className="lis">
//         <NavLink  style={{textDecoration: "none"}} className={(object) => object.isActive ?"active":"not-active"} to="/login" > להתחברות</NavLink>
//   </li>}
//   {user==null&&<li className="lis">
//         <NavLink  style={{textDecoration: "none"}} className={(object) => object.isActive ?"active":"not-active"} to="/signUp" > להרשמה</NavLink>
//   </li>}
//     <li className="lis">
//         <NavLink onClick={()=>{dispatch(resetPage())}} style={{textDecoration: "none"}} className={(object) => object.isActive ?"active":"not-active"} to="/shoes" >לכל המוצרים</NavLink>
//     </li>
   
//    {(user==null||user.role!="ADMIN")&&<li className="lis" >
//     <NavLink style={{textDecoration: "none"}} className={(object) => object.isActive ?"active":"not-active"}  to="/basket">   <ShoppingCartRounded/> </NavLink>
//     </li>}
//     {user!=null&&user.role=="ADMIN"&&<li className="lis" >
//     <NavLink style={{textDecoration: "none"}} className={(object) => object.isActive ?"active":"not-active"}  to="/allOrders"> לכל ההזמנות </NavLink>
//     </li>}
//     {user!=null&&user.role=="ADMIN"&&<li className="lis" >
//     <NavLink style={{textDecoration: "none"}} className={(object) => object.isActive ?"active":"not-active"}  to="/addShoe"> הוספת מוצר </NavLink>
//     </li>}
//     {user!=null&&<li className="lis" >
//     <button style={{ fontSize: "larger",
//        color:"beige", fontWeight: "bolder"
//        ,border:"none",backgroundColor:"salmon"}}  
//        onClick={()=>{dispatch(resetUser());dispatch(resetOrderDetails());dispatch(resetBasket());navigate("/login")}}  > יציאה </button>
//     </li>}
//   </ul> 
//     );
// }
 
// export default NavBar;




import { Menu, Container } from 'semantic-ui-react';
import { ShoppingCartRounded } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from './features/user/userSlice';
import { resetBasket, resetOrderDetails } from './features/order/orderSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((st) => st.user.currentUser);
  let userName=user?.userName;
  const handleItemClick = (path) => {
    navigate(path);
  };

  return (
   // inverted style
    <Container inverted stackable style={{width:"100%",textAlign:"center"
    ,justifyContent: 'center' ,position: "sticky",top:"0", zIndex: "1000"}}>

      
      
       <Menu inverted stackable style={{width:"100%",
         justifyContent: 'center'}}>
             {user !== null && (
           <Menu.Item inverted stackable style=
           {{width:"10%",justifyContent:"center"}}
            name="logout"
            onClick={() => {
              dispatch(resetUser());
              dispatch(resetOrderDetails());
              dispatch(resetBasket());
              handleItemClick('/login');
            }}
           
          >
            יציאה
          </Menu.Item>
        )}
          {user !== null && user.role === 'ADMIN' && (
           <Menu.Item inverted stackable style=
           {{width:"10%",justifyContent:"center"}}
            name="addShoe"
            as={NavLink}
            to="/addShoe"
            activeClassName="active"
            onClick={() => handleItemClick('/addShoe')}
          >
            הוספת מוצר
          </Menu.Item>
        )}
        
        {user !== null && user.role === 'ADMIN' && (
           <Menu.Item inverted stackable style=
           {{width:"10%",justifyContent:"center"}}
            name="allOrders"
            as={NavLink}
            to="/allOrders"
            activeClassName="active"
            onClick={() => handleItemClick('/allOrders')}
          >
            לכל ההזמנות
          </Menu.Item>
        )}
          {(user == null || user.role !== 'ADMIN') && (
          <Menu.Item inverted stackable style={{width:"10%",justifyContent:"center"}}
            name="basket"
            as={NavLink}
            to="/basket"
            activeClassName="active"
            onClick={() => handleItemClick('/basket')}
          >
            <ShoppingCartRounded/>
            
          </Menu.Item>
        )}
      
        <Menu.Item inverted stackable style=
        {{width:"10%",justifyContent:"center"}}
          name="shoes"
          as={NavLink}
          to="/shoes"
          activeClassName="active"
          onClick={() => handleItemClick('/shoes')}
        >
          לכל המוצרים
        </Menu.Item>

        


      

{user == null && (
          <Menu.Item inverted stackable style=
          {{width:"10%",textAlign:"center"
          ,justifyContent:"center"}}
            name="login"
            as={NavLink}
            to="/login"
            activeClassName="active"
            onClick={() => handleItemClick('/login')}
            // style={{ backgroundColor:"salmon" }}
          >
            להתחברות
          </Menu.Item>
        )}
        {user == null && (
          <Menu.Item inverted stackable 
          style={{width:"10%",justifyContent:"center"}}
            name="signUp"
            as={NavLink}
            to="/signUp"
            activeClassName="active"
            onClick={() => handleItemClick('/signUp')}
          >
            להרשמה
          </Menu.Item>
        )}

      {userName&&(
      <Menu.Item header inverted stackable  style=
      {{width:"10%",justifyContent:"center"}}
      
        name="hello">
          
        {userName} ,שלום לך
        </Menu.Item>)}

        {!userName&&(
       <Menu.Item header inverted stackable  style=
       {{width:"10%",justifyContent:"center"}}
        name="helloGuest">
        שלום לך ,  אורח
        </Menu.Item>)}


      </Menu>
    </Container>
  );
};

export default NavBar;


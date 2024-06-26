import { Menu, Container, Icon } from 'semantic-ui-react';
import { ShoppingCartRounded } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from './features/user/userSlice';
import { resetBasket, resetOrderDetails } from './features/order/orderSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


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

      
      
       <Menu    pointing  inverted stackable style={{width:"100%",
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

        
        {user&&(
      <Menu.Item  inverted stackable  style=
      {{width:"10%",justifyContent:"center"}}
      
        name="all orders"
          as={NavLink}
          to="/allOrders"
          activeClassName="active"
          onClick={() => handleItemClick('/myOrders')}>
   {user.role=="ADMIN" ?<span>
      לכל ההזמנות </span>
      :<span>
       ההזמנות שלי </span>}
        </Menu.Item>)}

      

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
         <PersonSharpIcon style={{marginLeft:"6px"}}/>
        </Menu.Item>)}

      

        {!userName&&(
       <Menu.Item header inverted stackable  style=
       {{width:"10%",justifyContent:"center"}}
        name="helloGuest">
          
         <PersonOutlineIcon style={{marginRight:"5px"
        }}/> 
          
          שלום לך ,  אורח
        </Menu.Item>)}


      </Menu>
    </Container>
  );
};

export default NavBar;


import { useSelector } from "react-redux";
import { deleteShoe } from "./shoeApi";
import { React} from "react";
import { useNavigate } from "react-router-dom";
import { Button} from "semantic-ui-react";
import AddToBasket from "../order/AddToBasket";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const ListItem = ({ one,fetchData }) => 
{
  

  let navigate=useNavigate();
  let userToken=useSelector(st=>st.user.currentUser)?.token
  let user=useSelector(st=>st.user.currentUser)
 
// let shoeInBasket=useSelector(st=>st.order.basket)



  const handleDelete = async () => {
    const userConfirmed = window.confirm('האם אתה בטוח שברצונך למחוק נעל זו?');

    if (userConfirmed) {
     
      try {
        let res = await deleteShoe(one._id,userToken)
  
         toast.success( '! הנעל נמחקה בהצלחה', {
          position: 'top-center',
          autoClose: 3000, // מספר המילישני שתוצג ההתראה
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }); 
        fetchData();
      
       
    
    } catch (err) {
       
         toast.error(' ! המחיקה נכשלה ', {
          position: 'top-center',
          autoClose: 2000, // מספר המילישני שתוצג ההתראה
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }); 
         console.log(err)
         toast.error(err.response?.data?.message, {
          position: 'top-center',
          autoClose: 5000, // מספר המילישני שתוצג ההתראה
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }); 
        
        console.log(err)
    }
    } 
   
  };

  
     return (<>
      

      <div style={{paddingTop:"3vh"}}>
      {/* <div className={shoeInBasket.length >= 1 ? "basket" : "notBasket"}> */}
        <img onClick={(e)=>
        {navigate("shoe/"+one._id , 
        { state: { item: one } })}} src={one.src} 
           style={{ 
            width: "30%", /* Set the fixed width */
            // height:"30%",
            objectFit: "cover", /* Maintain aspect ratio and cover the container */
           
          
          }}/>
      
        <h4>{one.description}</h4>
        <h4>{one.price} ₪ </h4>
       <AddToBasket one={one}/>
            { user&&user.role=="ADMIN" &&
            <>
  <Button  style={{backgroundColor:"paleturquoise",color:"black"}}  size="small" onClick={() => {navigate(`/editShoe`, { state: { item: one } });}}>לעריכה</Button> 
  <Button style={{backgroundColor:"#800080",color:"white"}} size="small" onClick={ handleDelete   }>מחק</Button>
  
  </> }   

    </div></>)
}

export default ListItem;









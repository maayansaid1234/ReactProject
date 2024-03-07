import { useSelector } from "react-redux";
import { deleteShoe } from "./shoeApi";
import { React} from "react";
import { useNavigate } from "react-router-dom";
import { Button} from "semantic-ui-react";
import AddToBasket from "./AddToBasket";





const ListItem = ({ one,fetchData }) => 
{
  

  let navigate=useNavigate();
  let userToken=useSelector(st=>st.user.currentUser)?.token
  let user=useSelector(st=>st.user.currentUser)
 




  const handleDelete = async () => {
    const userConfirmed = window.confirm('האם אתה בטוח שברצונך למחוק נעל זו?');

    if (userConfirmed) {
     
      try {
        let res = await deleteShoe(one._id,userToken)
        alert("מחיקה הצליחה")
        fetchData();
      
       
    
    } catch (err) {
         alert("שגיאה במחיקה")
       
        alert(err?.response?.data?.message)
        console.log(err)
    }
    } 
   
  };

  
     return (<>
      

      <div style={{backgroundColor:""}}>  
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
  <Button basic color="olive" onClick={() => {navigate(`/editShoe`, { state: { item: one } });}}>לעריכה</Button> 
  <Button basic color="brown" onClick={ handleDelete   }>מחק</Button>
  
  </> }   

    </div></>)
}

export default ListItem;









import { Button } from "@mui/material";
import { updateOrder } from "./orderApi";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListItem = ({item,fetchData}) => 
{
    
    let token=useSelector(st=>st.user.currentUser.token);
   const sendOrder=()=>
   {
    try{
         let res=updateOrder(item._id,{isDone:true},token);
         toast.success(' ! ההזמנה יצאה לדרך ', {
            position: 'top-center',
            autoClose: 3000, // מספר המילישני שתוצג ההתראה
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }); 
       
         fetchData()
    }
    catch(err){
        toast.error(' ! שליחת ההזמנה נכשלה ', {
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
    }
   

    }
    return (  <>
    <div style={{padding:"3px",background:"pink","border":"4px black"
    , boxShadow: "  0 0 13px 1px lightblue", height: '100%',color:"rgb(70, 171, 191)" }}>
        <h3> {item._id} : קוד הזמנה</h3>
        <h4>{item.userId} : קוד מזמין </h4>
        <h4>{item.address} : כתובת</h4>
        <h4>{new Date(item.orderDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })} : תאריך הזמנה</h4>
        <h4>{new Date(item.dueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })} : תאריך יעד </h4>
     
       
        {!(item.isDone)&&<Button variant="contained" color="info" onClick={sendOrder}>שלח הזמנה</Button>}
    

    </div>
    </>);
}
 
export default ListItem;
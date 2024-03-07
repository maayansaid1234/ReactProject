import { updateOrder } from "./orderApi";
import { useSelector } from "react-redux";

const ListItem = ({item,fetchData}) => 
{
    
    let token=useSelector(st=>st.user.currentUser.token);
   const sendOrder=()=>
   {
    try{
         let res=updateOrder(item._id,{isDone:true},token);
         alert("ההזמנה יצאה לדרך")
         fetchData()
    }
    catch(err){
        alert(err.message)
    }
   

    }
    return (  <>
    <div style={{background:"rgb(50, 50, 50)","border":"4px black",color:"white"
    , boxShadow: "0 0 18px 0px black", height: '100%' }}>
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
        {/* <h3>{String(item.isDone)}</h3> */}
       
        {!(item.isDone)&&<button onClick={sendOrder}>שלח הזמנה</button>}
    

    </div>
    </>);
}
 
export default ListItem;
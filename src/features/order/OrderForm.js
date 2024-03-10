import {saveOrderDetails} from "./orderSlice"
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { addOrder } from "./orderApi";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";
import { resetBasket } from "./orderSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderForm = () => {
let navigate=useNavigate()
let dispatch=useDispatch()
let existedOrder=useSelector(st=>st.order.orderDetails||null)
let userToken=useSelector(st=>st.user.currentUser.token)
let basket=useSelector(st=>st.order.basket)
let {register,handleSubmit,formState:{errors,isValid}}=useForm({mode:"onSubmit",defaultValues:existedOrder});


    const save=(data)=>{
    if(isValid)
    {
        dispatch(saveOrderDetails(data)) ;
        addOrder({...data,products:basket},userToken).then(res => {           
               dispatch(resetBasket());
               toast.success(' ! ההזמנה נשלחה בהצלחה ', {
                position: 'top-center',
                autoClose: 3000, // מספר המילישני שתוצג ההתראה
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }); 
              setTimeout(()=>{navigate("/shoes")},4000)
                 
              }).catch((err)=> {
                toast.error(' ארעה שגיאה ', {
                    position: 'top-center',
                    autoClose: 2000, // מספר המילישני שתוצג ההתראה
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }); 
                  toast.error( err.response?.data?.message, {
                    position: 'top-center',
                    autoClose: 3000, // מספר המילישני שתוצג ההתראה
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }); 
                 
    
                     console.log(JSON.stringify(err.response.data)) })
            
    }   
   }
   const saveOrderDetailsInState=(data)=>{   
    
    dispatch(saveOrderDetails({...data}))  
    navigate("/shoes")
}
   
    
    


   

    return ( 
        <>
        <h1>פרטי הזמנה</h1>
    <form onSubmit={handleSubmit(save)} >

        <TextField placeholder="כתובת" type="address"
           {...register("address" ,{required:{value:true,message:"כתובת היא שדה חובה!"}})}  />
        {errors.address&&<span className="error-message">{errors.address.message}</span>}
   
        <TextField placeholder="תאריך יעד" type="date"
           {...register("dueDate" ,{required:{value:true,message:"תאריך יעד הוא שדה חובה!"}})}  />
        {errors.dueDate&&<span className="error-message">{errors.dueDate.message}</span>}

       

    <Button Colored color="blue" type="submit">אישור</Button> 
   
   

 
< Button basic color="blue" onClick={handleSubmit(saveOrderDetailsInState)} >חזרה לחנות</Button> 
 </form>

   </> ) };

 
export default OrderForm;
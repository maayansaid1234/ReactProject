import {saveOrderDetails} from "./orderSlice"
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { addOrder } from "./orderApi";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";



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
        addOrder({...data,products:basket},userToken).then(res => {           
               dispatch(saveOrderDetails(res.data))  ; alert("הזמנה נוספה בהצלחה!");  navigate("/shoes")
              }).catch((err)=> {
                       alert(JSON.stringify(err.response.data))
                     console.log(JSON.stringify(err.response.data)) })
            
    }   
   }
   const saveOrderDetailsInState=(data)=>{   
    
    dispatch(saveOrderDetails({...data}))  
    navigate("/shoes")}
   
    
    


   

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
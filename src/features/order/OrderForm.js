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
        addOrder({address:data.address,products:basket},userToken).then(res => {           
               dispatch(resetBasket());
               navigate(`/orderConfirmation`, { state: { item: res.data } });
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
   
        

        <TextField placeholder="מספר כרטיס אשראי" type="number"
           {...register("creditCardNumber", { required: { value: true, message: "מספר כרטיס אשראי הוא שדה חובה!" } })} />
{errors.creditCardNumber && <span className="error-message">{errors.creditCardNumber.message}</span>}

<TextField placeholder="תוקף כרטיס (MM/YY)" type="text"
           {...register("expirationDate", { required: { value: true, message: "תוקף כרטיס הוא שדה חובה!" } })} />
{errors.expirationDate && <span className="error-message">{errors.expirationDate.message}</span>}

<TextField placeholder=" CVV קוד" type="number"
           {...register("cvv", { required: { value: true, message: "קוד CVV הוא שדה חובה!" }, minLength: { value: 3, message: "קוד CVV חייב להיות לפחות 3 תווים" }, maxLength: { value: 3, message: "קוד CVV חייב להיות לכל היותר 3 תווים" } })} />
{errors.cvv && <span className="error-message">{errors.cvv.message}</span>}

    <Button Colored color="blue" type="submit">אישור</Button> 
   
 
< Button basic color="blue" onClick={handleSubmit(saveOrderDetailsInState)} >חזרה לחנות</Button> 
 </form>

   </> ) };

 
export default OrderForm;
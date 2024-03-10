import { TextField } from "@mui/material";
import {useForm} from "react-hook-form";
import { login } from "./userApi";
import {saveUser} from "./userSlice"
import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./signUpCss.css"
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from "semantic-ui-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    let dispatch=useDispatch();
    let navigate=useNavigate();
    let [showLoading, setShowLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
    let {register,handleSubmit,formState:{errors,isValid}}=useForm({mode:"onSubmit"});
    const save=(data)=>{
    if(isValid)
    {
      setShowLoading(true);
        login(data).then(res => {           
                     dispatch(saveUser(res.data));navigate("/shoes")
              }).catch((err)=> {
                setShowLoading(false)
                toast.error('הפעולה נכשלה', {
                  position: 'top-center',
                  autoClose: 2000, // מספר המילישני שתוצג ההתראה
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }); 
                toast.error(err.response?.data?.message, {
                  position: 'top-center',
                  autoClose: 5000, // מספר המילישני שתוצג ההתראה
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }); 
                     console.log(JSON.stringify(err.message)) })
            
    }   
   }
 

    return ( <>
    {showLoading&&(<h1 style={{marginTop:"20px"  }}> ... אנא המתן</h1>)}
    {showLoading&&<Button  loading></Button>}
   {!showLoading&&<div>
 <h2 style={{marginTop:"20px"  }}> ! ברוכים השבים אלינו</h2>
    <form onSubmit={handleSubmit(save)} noValidate>
    <TextField
  placeholder="אימייל"
  {...register("email", {
    required: { value: true, message: "!אימייל הוא שדה חובה" },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "!כתובת אימייל אינה תקינה",
    },
  })}
/>
{errors.email && <span className="error-message">{errors.email.message}</span>}
   
        <TextField placeholder=" סיסמא"  type={showPassword ? 'text' : 'password'}  InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end" style={{marginRight:"1px"}}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
           {...register("password" ,{required:{value:true,message:"!סיסמא שדה חובה"},minLength:{value:4,message:"!סיסמא קצרה מידי "},maxLength:{value:8,message:"סיסמא ארוכה מידי !"}})}  />
        {errors.password&&<span className="error-message">{errors.password.message}</span>}

   <Button type="submit"  style={{marginBottom:"3vh"}} colored color="blue"> להתחברות</Button>
    </form>
    <b>
    <div>משתמש חדש? <Link style={{color:"blue",fontWeight:"bold"}}  to="/signUp" > לחץ כאן להרשמה</Link> </div>
    </b>
    </div>}
    </> );
}
 
export default Login;
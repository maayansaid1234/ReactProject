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



const Login = () => {
    let dispatch=useDispatch();
    let navigate=useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
    let {register,handleSubmit,formState:{errors,isValid}}=useForm({mode:"onSubmit"});
    const save=(data)=>{
    if(isValid)
    {
        login(data).then(res => {           
                     dispatch(saveUser(res.data));navigate("/shoes")
              }).catch((err)=> {
                       alert(JSON.stringify(err.message))
                     console.log(JSON.stringify(err.message)) })
            
    }   
   }
 

    return ( <><h2> ! ברוכים השבים אלינו</h2>
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
    </> );
}
 
export default Login;
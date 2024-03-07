import { TextField } from "@mui/material";
import "./signUpCss.css"
import {useForm} from "react-hook-form";
import { addUser } from "./userApi";
import { Button } from "semantic-ui-react";
import {saveUser} from "./userSlice"
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";


const SignUp = () => {
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
        addUser(data).then(res => {           
                     dispatch(saveUser(res.data));navigate("/shoes")
              }).catch((err)=> {
                       alert(JSON.stringify(err.response.data))
                     console.log(JSON.stringify(err.response.data)) })
            
    }   
   }

    return ( <><h2> ! ברוך הבא משתמש חדש </h2><form onSubmit={handleSubmit(save)} noValidate>
        <TextField
  placeholder="אימייל"
  {...register("email", {
    required: { value: true, message: "!אימייל הוא שדה חובה" },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "! כתובת אימייל אינה תקינה",
    },
  })}
/>
 <TextField placeholder=" שם משתמש" type="text"
           {...register("userName" ,{required:{value:true,message:"!שם משתמש הוא שדה חובה"},minLength:{value:2,message:"!שם קצר מידי "},maxLength:{value:8,message:"שם ארוך מידי !"}})}  />
        {errors.userName&&<span className="error-message">{errors.userName.message}</span>}


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

      
{errors.email && <span className="error-message">{errors.email.message}</span>}
       
       

<Button type="submit"  colored color="blue"> להרשמה</Button>
    </form>
   
    </> );
}
 
export default SignUp;
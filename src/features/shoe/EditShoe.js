import { useForm } from 'react-hook-form';
import {  updateShoeInServer } from './shoeApi';
import { useLocation, useNavigate } from 'react-router-dom';
import React   from 'react';
import { TextField,Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import   {Button} from  "semantic-ui-react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditShoeForm() {
  let navigate=useNavigate();
  const location = useLocation();
  const { item } = location.state;
  let userToken=useSelector(st=>st.user.currentUser).token
    const { register, handleSubmit,reset,formState:{errors,isValid} } = useForm({ defaultValues: item});

    const onSubmit = async (data) => 
    {
       if(isValid){
                try {                 
                        const newObj = {};                     
                        for (const key in data) {
                          if (key!="_id"&&data[key] !== null && data[key] !== undefined&&data[key]!="") {
                            newObj[key] = data[key];
                          }
                        }
      let res =  await updateShoeInServer(item._id,newObj,userToken);
 
      toast.success(' ! הנעל עודכנה בהצלחה ', {
         position: 'top-center',
         autoClose: 3000, // מספר המילישני שתוצג ההתראה
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
       }); 
      
        navigate("/shoes")               
                }
                catch (err) {
                  toast.error(' ! הפעולה נכשלה ', {
                     position: 'top-center',
                     autoClose: 2000, // מספר המילישני שתוצג ההתראה
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                   }); 
                    console.log(err)
                    toast.error(err?.response?.data?.message, {
                     position: 'top-center',
                     autoClose: 3000, // מספר המילישני שתוצג ההתראה
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                   }); 
                }
                
                
               
              }
}


    return (<>
      <Typography variant="h4"> עדכון מוצר</Typography>
      <div id='editShoe' /* style={{ overflowY: "auto", height: "90vh", padding: "16px"}}*/>
      <form onSubmit={handleSubmit(onSubmit)}>

       
   
          <TextField label=" תיאור" 
           {...register("description")}  />
        {errors.description&&<span className="error-message">{errors.description.message}</span>}
   
        <TextField label=" מחיר" type='number'
           {...register("price" ,{min:{value:50,message:"מחיר נמוך מידי!"},max:{value:1000,message:"מחיר גבוה מידי !"}})}  />
        {errors.price&&<span className="error-message">{errors.price.message}</span>}


        <TextField label=" קוד ספק"
           {...register("providerNum")}  />
        {errors.providerNum&&<span className="error-message">{errors.providerNum.message}</span>}
   
        <TextField label="קישור לתמונה" type="text"
           {...register("src" )}  />
        {errors.src&&<span className="error-message">{errors.src.message}</span>}


        <TextField label=" קטגוריה" 
           {...register("category" )}  />
        {errors.category&&<span className="error-message">{errors.category.message}</span>}
   
        <TextField label="מודל"
           {...register("model")}  />
        {errors.model&&<span className="error-message">{errors.model.message}</span>}

        <TextField label=" צבע"
           {...register("color")}  />
        {errors.color&&<span className="error-message">{errors.color.message}</span>}
   
        <TextField label=" חברה/מותג" type="text"
           {...register("brand" )}  />
        {errors.brand&&<span className="error-message">{errors.brand.message}</span>}



        <Button.Group>
     
      <Button basic color='black'
        onClick={() => {navigate("/shoes")}}
      
      >
        ביטול
      </Button>

      <Button.Or />
 <Button  type="submit" Colored color='gray' >
       שמירה
      </Button>
    
     
 
    </Button.Group>
              
           
                 {/* <button type="button" onClick={()=>{reset()}}>ביטול</button> */}
              </form>
              </div></>
    );

}
export default EditShoeForm;


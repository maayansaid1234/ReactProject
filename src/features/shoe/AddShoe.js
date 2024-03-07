import "./edit&addShoe.css"
import { useForm } from 'react-hook-form';
import { addShoe } from './shoeApi';
import React from 'react';
import { TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

function AddShoe() {
   const navigate=useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ mode: "onSubmit" });
  let token = useSelector(st => st.user.currentUser.token);

  const onSubmit = async (data) => {
    if (isValid) {
      try {
        const newObj = {};
        for (const key in data) {
          if (data[key] !== null && data[key] !== undefined && data[key] !== "") {
            newObj[key] = data[key];
          }
        }
        newObj.price = Number(newObj.price);
        let res = await addShoe(newObj, token);
        alert("נעל הוספה בהצלחה!");
        console.log(res);
      } catch (err) {
        alert("לא הצליח להוסיף");
        console.log(err);
        alert(err.response.data.message);
      } finally {
        reset();
      }
    }
  }

  return (
    <>
    
    <Typography variant="h4">הוספת מוצר לחנות</Typography>
    <div  id='addShoe'/*style={{ overflowY: "auto", height: "90vh", padding: "16px"}}*/>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

       

        <TextField label="תיאור"
          {...register("description", { required: { value: true, message: "תיאור הוא שדה חובה!" } })}
        />
        {errors.description && <span className="error-message">{errors.description.message}</span>}

        <TextField label="מחיר" type='number'
          {...register("price", { required: { value: true, message: "מחיר הוא שדה חובה!" }, min: { value: 50, message: "מחיר נמוך מידי!" }, max: { value: 1000, message: "מחיר גבוה מידי!" } })}
        />
        {errors.price && <span className="error-message">{errors.price.message}</span>}

        <TextField label="קוד ספק"
          {...register("providerNum", { required: { value: true, message: "קוד ספק הוא שדה חובה!" } })}
        />
        {errors.providerNum && <span className="error-message">{errors.providerNum.message}</span>}

        <TextField label="קישור לתמונה" type="text"
          {...register("src")}
        />
        {errors.src && <span className="error-message">{errors.src.message}</span>}

        <TextField label="קטגוריה"
          {...register("category", { required: { value: true, message: "קטגוריה היא שדה חובה!" } })}
        />
        {errors.category && <span className="error-message">{errors.category.message}</span>}

        <TextField label="מודל"
          {...register("model")}
        />
        {errors.model && <span className="error-message">{errors.model.message}</span>}

        <TextField label="צבע"
          {...register("color")}
        />
        {errors.color && <span className="error-message">{errors.color.message}</span>}

        <TextField label="חברה/מותג" type="text"
          {...register("brand", { required: { value: true, message: "חברה היא שדה חובה!" } })}
        />
        {errors.brand && <span className="error-message">{errors.brand.message}</span>}


        <Button.Group >
     
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

      </form>
    </div>
   
    </>
  );
}

export default AddShoe;




























































































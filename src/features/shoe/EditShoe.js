import { useForm } from 'react-hook-form';
import {  updateShoeInServer } from './shoeApi';
import { useLocation, useNavigate } from 'react-router-dom';
import React   from 'react';
import { TextField,Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import   {Button} from  "semantic-ui-react"


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
 

        alert("  נעל עודכנה בהצלחה")  
        navigate("/shoes")               
                }
                catch (err) {
                    alert("לא הצליח לעדכן")
                    console.log(err)
                    alert(err?.response?.data?.message)
                }
                finally{
                  reset();
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

// import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
// import { updateShoeInServer } from './shoeApi';
// import React from 'react';
// import { TextField } from '@mui/material';


// function EditShoeForm() {
// let stringShoe=useParams().shoe
// let shoe =JSON.parse(stringShoe)

//   // if (!shoe) {
//   //   // Handle the case where there's no shoe object in the state
//   //   return <div>No shoe data found.</div>;
//   // }

//   const { register, handleSubmit, reset, errors } = useForm({ defaultValues: shoe });

//   const onSubmit = async (data) => {
//     console.log(data);
//     try {
//       const newObj = {};
//       for (const key in data) {
//         if (data[key] !== null && data[key] !== undefined) {
//           newObj[key] = data[key];
//         }
//       }
//       let res = await updateShoeInServer(newObj);
//       alert('נעל עודכנה בהצלחה');
//       console.log(res);
//     } catch (err) {
//       alert('לא הצליח לעדכן');
//       console.log(err);
//       alert(err.response?.data?.message || 'שגיאה לא צפויה');
//     } finally {
//       reset();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <h1>hello</h1>
//       <TextField label=" תיאור" {...register('description')} />
//       {errors.description && <span className="error-message">{errors.description.message}</span>}

//       <TextField
//         label=" מחיר"
//         type="number"
//         {...register('price', {
//           min: { value: 50, message: 'מחיר נמוך מידי!' },
//           max: { value: 1000, message: 'מחיר גבוה מידי !' },
//         })}
//       />
//       {errors.price && <span className="error-message">{errors.price.message}</span>}

//       {/* ... other fields ... */}

//       <button type="submit">שמירה</button>
//       <button type="button" onClick={() => reset()}>
//         ביטול
//       </button>
//     </form>
//   );
// }

// export default EditShoeForm;




// import { useForm } from 'react-hook-form';
// import { updateShoeInServer } from './shoeApi';
// import { useDispatch } from 'react-redux';
// import { updateShoe } from "./shoeSlice";
// import { useSelector } from 'react-redux';
// import React from 'react';
// import { TextField } from '@mui/material';
// import { useParams } from 'react-router-dom';

// function EditShoeForm() {
//   let _id = useParams()._id;
//   let shoe=useSelector(st=>st.shoe.arr).filter(item=>item._id==_id)[0]

//   let dispatch = useDispatch();
//   const { register, handleSubmit, reset, errors, setValue } = useForm({ defaultValues: shoe || {} });



//   React.useEffect(() => {
//     if (shoe) {
//       setValue('description', shoe.description || '');
//       setValue('price', shoe.price || 0);
//       setValue('providerNum', shoe.providerNum || '');
//       setValue('src', shoe.src || '');
//       setValue('category', shoe.category || '');
//       setValue('model', shoe.model || '');
//       setValue('color', shoe.color || '');
//       setValue('_id', shoe._id || '');
//     }
//   }, [shoe, setValue]);

//   const onSubmit = async (data) => {
//     console.log(data);
//     try {
//       const newObj = {};
//       for (const key in data) {
//         if (data[key] !== null && data[key] !== undefined) {
//           newObj[key] = data[key];
//         }
//       }
//       let res = await updateShoeInServer(newObj);
//       dispatch(updateShoe(res.data));
//       alert("  נעל עודכנה בהצלחה");
//       console.log(res);
//     } catch (err) {
//       alert("לא הצליח לעדכן");
//       console.log(err);
//       alert(err.response?.data?.message || "שגיאה לא צפויה");
//     } finally {
//       reset();
//     }
//   };

//   if (!shoe) {
//     return <div>Loading...</div>; // or any other loading indicator
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
   
     
//                <TextField label=" תיאור" 
//                 {...register("description")}  />
//            {errors.description&&<span className="error-message">{errors.description.message}</span>}
        
//         <TextField label=" מחיר" type='number'
//       {...register("price" ,{min:{value:50,message:"מחיר נמוך מידי!"},max:{value:1000,message:"מחיר גבוה מידי !"}})}  />
//               {errors.price&&<span className="error-message">{errors.price.message}</span>}
     
     
//              <TextField label=" קוד ספק"
//                 {...register("providerNum")}  />
// \       {errors.providerNum&&<span className="error-message">{errors.providerNum.message}</span>}
        
//            <TextField label="קישור לתמונה" type="text"
//                  {...register("src" )}  />
//               {errors.src&&<span className="error-message">{errors.src.message}</span>}
     
     
//             <TextField label=" קטגוריה" 
//                {...register("category" )}  />
//          {errors.category&&<span className="error-message">{errors.category.message}</span>}
        
//          <TextField label="מודל"
//               {...register("model")}  />
//              {errors.model&&<span className="error-message">{errors.model.message}</span>}
     
//        <TextField label=" צבע"
//         {...register("color")}  />
//           {errors.color&&<span className="error-message">{errors.color.message}</span>}
        
//            <TextField label=" חברה/מותג" type="text"
//                  {...register("brand" )}  />
//        {errors.brand&&<span className="error-message">{errors.brand.message}</span>}
     
     
     
     
//                   <button type="submit">שמירה</button>
//                        <button type="button" onClick={()=>{reset()}}>ביטול</button>
              
     
//     </form>
//   );
// }

// export default EditShoeForm;






// import { getShoeById, updateShoeInServer } from './shoeApi';
// import { TextField } from '@mui/material';

// import "./editShoeCss.css"
// import { useSelector } from 'react-redux';
// import { useRef, useState } from 'react';
// import { useParams ,useLocation} from 'react-router-dom';

// function  EditShoeForm(){
//   const location = useLocation();
//   const { item } = location.state;

//   console.log(item)
// let userToken=useSelector(st=>st.user.currentUser).token
//   let _id= useParams()._id
 
     


//   let [shoe,setOne]=useState({})
//   const fetchData = async () => {
//       try {
//           const response = await getShoeById(_id);
//           setOne(response.data)
         
//       } catch (err) {
//           console.error(err);
//           alert("לא הצליח להביא נתונים");
//       }
//   };
 
// fetchData()
//   let description=useRef(null);
//   let model=useRef(null);
//   let color=useRef(null);
//   let price=useRef(null);
//   let src=useRef(null);
//   let category=useRef(null);
//   let brand=useRef(null);
//   let providerNum=useRef(null);
  


//     const onSubmit = async (e) => {
//       e.preventDefault();
//     let data={
//       description:description.current.value||shoe.description
//       ,color:color.current.value||shoe.color
//       ,brand:brand.current.value||shoe.brand,
//       providerNum:providerNum.current.value||shoe.providerNum
//       ,model:model.current.value||shoe.model
//       ,price:price.current.value||shoe.price
//       ,src:src.current.value||shoe.src
//       ,category:category.current.value||shoe.category
//     }
    
     
//       try {
//         let res;
//          res = await updateShoeInServer(shoe._id,data,userToken);
  
     
//       alert("  נעל עודכנה בהצלחה");
//       console.log(res);
//     } catch (err) {
     
//       alert("לא הצליח לעדכן");
//       console.log(err);
//       alert(err.response?.data?.message || "שגיאה לא צפויה");
//     } 
    
  
//   };

// return (<>
// <h1>עדכון נעל</h1>
//  <form onSubmit={onSubmit}>
   
//      <label for="description">תיאור</label>
//         <input  id="description" placeholder={shoe.description} defaultValue={shoe.description}  ref={description}  />

//               <label for="price">מחיר</label>     
//         <input  id="price" placeholder={shoe.price} defaultValue={shoe.price} type='number' ref={price} />
       
//         <label for="providerNum">קוד ספק</label>
//         <input id='providerNum' defaultValue={shoe.providerNum} placeholder={shoe.providerNum} ref={providerNum} label={shoe.providerNum}/>
                
     
//         <label for="src">קישור לתמונה</label>
//            <input  id="src" defaultValue={shoe.src} placeholder={shoe.src} type="text" ref={src} label={shoe.src}/>
                
//            <label for="category">קטגוריה</label>
//             <input id='category' placeholder={shoe.category} defaultValue={shoe.category} ref={category} label={shoe.category}/> 
           
//             <label for="model">מודל/דגם</label>
//          <input  id='model' placeholder={shoe.model} ref={model} defaultValue={shoe.model} label={shoe.model}/>
             
             
//          <label for="color">צבע</label>
//        <input  id="color " placeholder={shoe.color} defaultValue={shoe.color} ref={color} label={shoe.color}/>
      
          
//        <label for="brand">מותג/ חברה</label>
//       <input id='brand' placeholder={shoe.brand}  defaultValue={shoe.brand} type="text" ref={brand}/>
      
     
     
     
//      <div id="div_buttons">
//       <button type="submit">שמירה</button>
//       <button type="button" onClick={()=>{}}>ביטול</button>
//       </div>      
     
//     </form> </>)
 
 

// }
// export default EditShoeForm;









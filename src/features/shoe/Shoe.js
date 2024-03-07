import {getShoeById} from "./shoeApi"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import { useEffect, useRef, useState } from "react";
import "./shoeCss.css"
import AddToBasket from "./AddToBasket";


export const Shoe = () => {
   
   let [one,setOne]=useState(null)
  
   let location=useLocation();
   let item=location?.state?.item;
    let navigate=useNavigate();
    const _id=useParams()._id;
    let details=useRef(null)
   



    const fetchData = async () => {
        try {
           
            const response = await getShoeById(_id);
            setOne(response.data)
           
        } catch (err) {
            console.error(err);
            alert("לא הצליח להביא נתונים");
        }
    }
    useEffect(()=>{
        if(!item)
     fetchData();
      else
    setOne(item);
  
   },[])

   
    return (<>





{one&&
   <div id="shoe-details">

 




   <div ref={details} id="details"> 
      <div>
    <ArrowForwardTwoToneIcon onClick={()=>{navigate("/shoes")}}/>
     </div>
  
      <h2>{one.description}</h2>
      <h4>{one._id} : קוד נעל   </h4> 
        <h4>{one.brand} </h4>
        <h4>{one.model} </h4>
        <h4>{one.color} </h4>
        <h4>{one.category} </h4>
        <h4>{one.price} ₪ </h4>
        <h4>{one.providerNum}   : קוד ספק </h4>




     <AddToBasket one={one} />






       </div>
       <div id="divImg">
       
        <img src={one.src} style={{width:"40vw"}} 
        onMouseOver={(e)=>{e.target.style.width="58vw";
        if(details)
        details.current.style.display="none";
        }} 
        onMouseOut={(e)=>{e.target.style.width="40vw"
        details.current.style.display="block";
          }} 
         />
         </div>

        
        </div>}

  </>);
     }
   


export default Shoe;

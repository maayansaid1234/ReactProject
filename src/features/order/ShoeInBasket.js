import { useDispatch } from "react-redux";
import { removeFromBasket, updateShoeInBasket } from "./orderSlice";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import { useEffect, useRef } from "react";
import { Icon} from "semantic-ui-react";
import {Button} from "@mui/material"


const ShoeInBasket = ({ one }) => {
 let minus=useRef(null);
  let amount=one.amount;
 let amountInput=useRef(null);
 let choosingAmountDiv=useRef(null);
    let dispatch = useDispatch()
useEffect(()=>{
  if(amountInput.current.value==1)
  {minus.current.style.visibility="hidden"}
  else 
  {minus.current.style.visibility="visible"}
},[])
    return (<div style={{border:"solid beige 2px",height:"100%"}}>
        <img onClick={(e)=>{}} src={one.src}  width="20%" />
        <h2>{one.description}</h2>
        <h2>{one.price} ₪ </h2>
        <h2>כמות :{one.amount} </h2>
        <div > ₪ סך הכל :  {one.amount*one.price}</div>  



        <Icon name="trash alternate " color="black" size="big" onClick={()=>{dispatch(removeFromBasket(one._id))}}/>     
        <Button style={{backgroundColor:"palevioletred"}} variant="contained"  onClick={() => { 
           choosingAmountDiv.current.style.display="block";
             }}>לשינוי כמות</Button> 

             <div style={{display:"none" }}ref={choosingAmountDiv}>
                <Button style={{color:"palevioletred",backgroundColor:"beige"}}  variant="contained" onClick={()=>{ 
                  if(amountInput.current.value==0)
                  dispatch(removeFromBasket(one._id))
                else
                     dispatch(updateShoeInBasket
                      ({...one,amount:amountInput.current.value}))
             ; choosingAmountDiv.current.style.display="none";  }} >אישור</Button>
              
<RemoveCircleOutlineSharpIcon ref={minus} style={{color:"palevioletred"}} onClick={()=>{amountInput.current.value--;if(amountInput.current.value==1)
  {minus.current.style.visibility="hidden"}
  else 
  {minus.current.style.visibility="visible"}
  }}/>

<input  style={{fontSize:"larger",fontWeight:"bold",width:"25px",color:"palevioletred",textAlign:"center","border":"none"}} ref={amountInput} onChange={
  ()=>{ if(amountInput.current.value==1)
  {minus.current.style.visibility="hidden"}
  else 
  {minus.current.style.visibility="visible"}
  }} defaultValue={amount}/>
<AddCircleOutlineSharpIcon style={{color:"palevioletred"}} onClick={()=>{amountInput.current.value++; if(amountInput.current.value==1)
  {minus.current.style.visibility="hidden"}
  else 
  {minus.current.style.visibility="visible"}
  }}/>


              
               
  </div>
  
   </div>
             
 );
}

export default ShoeInBasket;
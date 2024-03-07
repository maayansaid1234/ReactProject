import { useDispatch } from "react-redux";
import { removeFromBasket, updateShoeInBasket } from "./orderSlice";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import { useRef } from "react";
import { Button ,Icon} from "semantic-ui-react";

const ShoeInBasket = ({ one }) => {
 
  let amount=one.amount;
 let amountInput=useRef(null);
 let choosingAmountDiv=useRef(null);
    let dispatch = useDispatch()

    return (<div style={{border:"solid beige 2px",height:"100%"}}>
        <img onClick={(e)=>{}} src={one.src}  width="20%" />
        <h2>{one.description}</h2>
        <h2>{one.price} ₪ </h2>
        <h2>כמות :{one.amount} </h2>
        <div>סך הכל :{one.amount*one.price}</div>  



        <Icon name="trash alternate outline"  onClick={()=>{dispatch(removeFromBasket(one._id))}}/>     
        <div style={{color:"palevioletred",textDecoration:"underline",fontWeight:"bold",fontSize:"17px"}} onClick={() => { 
           choosingAmountDiv.current.style.display="block";
             }}>לשינוי כמות</div> 

             <div style={{display:"none" }}ref={choosingAmountDiv}>
                <Button  basic color="pink" onClick={()=>{ 
                    
                    
                     dispatch(updateShoeInBasket
                      ({...one,amount:amountInput.current.value}))
             ; choosingAmountDiv.current.style.display="none";  }} >אישור</Button>
              
<RemoveCircleOutlineSharpIcon  style={{color:"palevioletred"}} onClick={()=>{amountInput.current.value--}}/>

<input  style={{fontSize:"larger",fontWeight:"bold",width:"25px",color:"palevioletred",textAlign:"center","border":"none"}} ref={amountInput} defaultValue={amount}/>
<AddCircleOutlineSharpIcon style={{color:"palevioletred"}} onClick={()=>{amountInput.current.value++}} />


              
               
  </div>
  
   </div>
             
 );
}

export default ShoeInBasket;
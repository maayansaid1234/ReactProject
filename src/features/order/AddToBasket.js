import { useState } from "react";
import MinimalBasket from "../order/MinimalBasket";
import { updateShoeInBasket,addToBasket,removeFromBasket} from "../order/orderSlice"
import {  useRef ,React, useEffect} from "react";
import AddCircleOutlinedIcon   from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon   from '@mui/icons-material/RemoveCircleOutlined';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import { Button, Icon } from "semantic-ui-react";
import { useDispatch,useSelector } from "react-redux";




const AddToBasket = ({one}) => 
{
    
 
  let dispatch = useDispatch()
  let user=useSelector(st=>st.user.currentUser)
  let shoeInBasket= useSelector(st=>st.order.basket).filter(item=>item._id==one?._id)
  let choosingAmountDiv=useRef(null);
  let amountInput=useRef(null);
  let minus=useRef(null)
  let [showBasket,setShowBasket]=useState(false)
  let [showChangeAmount,setChangeAmount]=useState(true)
  
  
  useEffect(()=>{
    
    
if(amountInput.current){
    amountInput.current.value=shoeInBasket.length==1?shoeInBasket[0].amount:1

 
    if(amountInput.current.value==1)
    minus.current.style.visibility="hidden"
  else
  minus.current.style.visibility="visible"}
  },[shoeInBasket])
       



       return (
        <>
        {(user==null||user.role=="USER")&& <div
        
        >
        
      {(shoeInBasket.length==1&&showChangeAmount)&&
     <Icon name="trash alternate outline" color="black" size="big" onMouseOver={(e)=>{e.target.size="big"}} onClick={(e)=>{dispatch(removeFromBasket(one._id));/*amountInput.current.value=(1)*/}}/>}
     {shoeInBasket.length==0&& 
     <AddShoppingCartRoundedIcon fontSize="large" onClick={() => { 
         choosingAmountDiv.current.style.display="block";}} />}
         {(shoeInBasket.length==1&&showChangeAmount)&&<Button color="black" size="tiny"
         onClick={() => { 
          choosingAmountDiv.current.style.display="block";}}
         >לשינוי כמות</Button>}
        
           <div style={{display:"none"}}ref={choosingAmountDiv}>
          {shoeInBasket.length==0&& <Button  colored color="black" size="tiny"
             onClick={()=>{ 
                  
                   dispatch(addToBasket({...one,amount:amountInput.current.value})) 
                 
                   choosingAmountDiv.current.style.display="none";
                  setShowBasket(true)
                  setChangeAmount(false)
                  setTimeout(()=>{ setShowBasket(false);setChangeAmount(true)},6000)
                }  }>הוסף לסל</Button> }

            {shoeInBasket.length==1&&
             <Button size="tiny" style={{backgroundColor:"beige",color:"black",fontWeight:"bold"}}
             onClick={()=>{ 
              if (amountInput.current.value==0)
              dispatch(removeFromBasket(one._id))
              else
                   dispatch(updateShoeInBasket({...one,amount:amountInput.current.value}))  ;
                   choosingAmountDiv.current.style.display="none";
                   setShowBasket(true)
                   setChangeAmount(false)
                   setTimeout(()=>{ setShowBasket(false);setChangeAmount(true)},6000)
                }  }>אישור</Button> }

              <div style={{backgroundColor:"",display:"inline-block",margin:"auto",width:"8vw"}}>
              <RemoveCircleOutlinedIcon ref={minus} style={{color:"black"}} onClick={()=>{amountInput.current.value--;if(amountInput.current.value==1)minus.current.style.visibility="hidden";else{minus.current.style.visibility="visible"} }}/>
              <input  style={{fontSize:"large",fontWeight:"bold",width:"25px",color:"black",textAlign:"center","border":"none",backgroundColor:""}} ref={amountInput} onChange={(e)=>{if(amountInput.current.value==1)minus.current.style.visibility="hidden";else{minus.current.style.visibility="visible"}}}/* defaultValue={amount}*//>
              <AddCircleOutlinedIcon style={{color:"black"}} onClick={()=>{amountInput.current.value++;if(amountInput.current.value==1)minus.current.visibility="hidden";else{minus.current.style.visibility="visible"}}} />
                 </div>
  
              </div>
              
             
              {showBasket&&<MinimalBasket/>}  
              </div>}

           
              
               </>
              );
}
 
export default AddToBasket;






// import { useState } from "react";
// import MinimalBasket from "../order/MinimalBasket";
// import { updateShoeInBasket,addToBasket,removeFromBasket} from "../order/orderSlice"
// import {  useRef ,React} from "react";
// import AddCircleOutlinedIcon   from '@mui/icons-material/AddCircleOutlined';
// import RemoveCircleOutlinedIcon   from '@mui/icons-material/RemoveCircleOutlined';
// import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
// import { Button, Icon } from "semantic-ui-react";
// import { useDispatch,useSelector } from "react-redux";



// const AddToBasket = ({one}) => 
// {
    
 
//   let dispatch = useDispatch()
//   let user=useSelector(st=>st.user.currentUser)
//   let shoeInBasket= useSelector(st=>st.order.basket).filter(item=>item._id==one?._id)
//   let choosingAmountDiv=useRef(null);
//   let minus=useRef(null)
//   let amountInput=useRef(null)
//   let [showChangeAmount,setChangeAmount]=useState(true)
//   let [showBasket,setShowBasket]=useState(false)
//  let amount= shoeInBasket.length==1?shoeInBasket[0].amount:1
  

       



//        return (
//         <>
//         {(user==null||user.role=="USER")&& <div
        
//         >
        
//       {shoeInBasket.length==1&&
//      <Icon name="trash alternate outline" color="black" size="big" onMouseOver={(e)=>{e.target.size="big"}} onClick={(e)=>{dispatch(removeFromBasket(one._id));/*amountInput.current.value=(1)*/}}/>}
//      {shoeInBasket.length==0&& 
//      <AddShoppingCartRoundedIcon fontSize="large" onClick={() => { 
//          choosingAmountDiv.current.style.display="block";}} />}
//          {(shoeInBasket.length==1&&showChangeAmount)&&<Button color="black" size="tiny"
//          onClick={() => { 
//           choosingAmountDiv.current.style.display="block";}}
//          >לשינוי כמות</Button>}
        
//            <div style={{display:"none"}}ref={choosingAmountDiv}>
//           {shoeInBasket.length==0&& <Button  colored color="black" size="tiny"
//              onClick={()=>{ 
                  
//                    dispatch(addToBasket({...one,amount:amountInput.current.value})) 
                 
//                    choosingAmountDiv.current.style.display="none";
//                   setShowBasket(true)
//                   setTimeout(()=>{ setShowBasket(false)},6000)
//                 }  }>הוסף לסל</Button> }

//             {shoeInBasket.length==1&&
//              <Button size="tiny" style={{backgroundColor:"beige",color:"black",fontWeight:"bold"}}
//              onClick={()=>{ 
//               if (amountInput.current.value==0)
//               dispatch(removeFromBasket(one._id))
//               else
//                    dispatch(updateShoeInBasket({...one,amount:amountInput.current.value}))  ;
//                    choosingAmountDiv.current.style.display="none";
//                   setShowBasket(true)
//                   setTimeout(()=>{ setShowBasket(false)},6000)
//                 }  }>אישור</Button> }

//               <div style={{backgroundColor:"",display:"inline-block",margin:"auto",width:"8vw"}}>
//               <RemoveCircleOutlinedIcon ref={minus} style={{color:"black"}} onClick={()=>{amountInput.current.value--;if(amountInput.current.value==1)minus.current.style.visibility="hidden";else{minus.current.style.visibility="visible"} }}/>
//               <input ref={amountInput} style={{fontSize:"large",fontWeight:"bold",width:"25px",color:"black",textAlign:"center","border":"none",backgroundColor:""}}  value={amount}/>
//               <AddCircleOutlinedIcon style={{color:"black"}} onClick={()=>{amountInput.current.value++;if(amountInput.current.value==1)minus.current.visibility="hidden";else{minus.current.style.visibility="visible"}}} />
//                  </div>
 
//               </div>
              
             
//               {showBasket&&<MinimalBasket/>}  
//               </div>}

           
              
//                </>
//               );
// }
 
// export default AddToBasket;









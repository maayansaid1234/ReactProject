import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const OrderConfirmation = () => {
    const sum = () => {
        let sum = 0;
        arr.forEach((one) => {
          sum += one.price * one.amount;
        });
        return sum;
      };
    
      const sumQty = () => {
        let sum = 0;
        arr.forEach((element) => {
          sum += +element.amount;
        });
        return sum;
      };
    const location = useLocation();
    const { item } = location.state;
   let arr=item.products
   let navigate=useNavigate();
   
    return ( <><h1>אישור הזמנה</h1> 
    <h2> !הזמנתך התקבלה בהצלחה</h2>
    <h2> :קוד ההזמנה הינו  </h2>
    <h2> {item._id}</h2>
    <h2>  : אל הכתובת </h2>
    <h2> {item.address}</h2>
    <h2>  סך הכל מוצרים : {sumQty()}</h2>
    <h2>סך הכל לתשלום :  {sum()}</h2>
    <h2> המוצרים ישלחו אליך בהקדם האפשרי וכל היותר עד שבועיים מהיום</h2>
    <h1 > ! תודה שקנית אצלינו</h1>
    <Button  color="success" variant ="text" onClick={() => navigate("/shoes")}>חזרה לחנות</Button>

    </>
    );
}
 
export default OrderConfirmation;
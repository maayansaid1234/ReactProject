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
   
    return ( <>
    {/* <h1>אישור הזמנה</h1>  */}
    <h1>  👍🏻 !הזמנתך התקבלה בהצלחה</h1>
    <h3> :קוד ההזמנה הינו  </h3>
    <h3> {item._id}</h3>
    <h3>  : תשלח אל הכתובת </h3>
    <h3> {item.address}</h3>
    <h3>  סך הכל מוצרים : {sumQty()}</h3>
    <h3 > ₪ סך הכל לתשלום :  {sum()} </h3>
    <Button  color="success" variant ="text" size="large" onClick={() => navigate("/shoes")}>בחזרה לחנות</Button>
    <h3> המוצרים ישלחו אליך בהקדם האפשרי ולכל היותר עד שבועיים מיום הקניה</h3>
    <h1 >  😊 ! תודה שקנית אצלינו</h1>


    </>
    );
}
 
export default OrderConfirmation;

const ListItemByMyOrders = ({item}) => 
{
    let arr = item.products;
  

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
   
    
    return (  <>
   <div style={{padding:"3px",background:"pink","border":"4px black",color:"rgb(70, 171, 191)"
    , boxShadow: "  0 0 13px 1px lightblue", height: '100%' }}>
        <h3> {item._id} : קוד הזמנה</h3>
        <h4>{item.address} : כתובת</h4>
        <h4>{new Date(item.orderDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })} : תאריך הזמנה</h4>
        <h4>{new Date(item.dueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })} : תאריך יעד </h4>
     
     <div style={{ fontWeight: "bold",fontSize:"large" ,marginBottom:"2vh",marginTop:"2vh"  }}>₪ סך הכל לתשלום: {sum()} </div>
          <div style={{ fontWeight: "bold",fontSize:"large" ,marginBottom:"2vh"}}>סך הכל מוצרים: {sumQty()}</div>   
     
    

    </div>
    </>);
}
 
export default ListItemByMyOrders;
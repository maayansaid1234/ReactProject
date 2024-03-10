import { useSelector } from "react-redux";
import ShoeInBasket from "./ShoeInBasket";
import { useNavigate } from "react-router-dom";
import { Grid ,Paper,Button} from "@mui/material";
import "./basketCss.css";

const Basket = () => {
  let arr = useSelector((st) => st.order.basket);
  let navigate = useNavigate();

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

  let name = useSelector((st) => st.user.currentUser?.userName);

  return (
    <>
      {arr.length > 0 && (
        <div>
          <h1 style={{marginTop:"10px"  }}>סל הקניות שלי</h1>
          <div  id="divBasket" /* style={{ overflowX: 'auto',  maxHeight: "40vh",}}*/>
                <Grid container spacing={2} sx={{ width: '100%', minHeight: '100%' }}>
                    {arr && arr.length > 0 && arr.map(item => (
                        <Grid item key={item._id} xs={12} sm={6}
                        //  md={4} 
                        //  lg={4} 
                         md={6} // Change this to 6 for two items per row
                         lg={6} // Change this to 6 for two items per row
                         style={{ minWidth: '200px' }}>
                            <Paper elevation={3} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flex: 1 }}>
                                <ShoeInBasket one={item} />
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
         
          <div style={{ fontWeight: "bold",fontSize:"large" ,marginBottom:"2vh",marginTop:"2vh"  }}>₪ סך הכל לתשלום: {sum()} </div>
          <div style={{ fontWeight: "bold",fontSize:"large" ,marginBottom:"2vh"}}>סך הכל מוצרים: {sumQty()}</div>

          <div className="basket-buttons">
            <Button  color="success" variant="contained" 
              onClick={() => {
                if (name == undefined) navigate("/login");
                else navigate("/orderForm");
              }}
            >
              סיום
            </Button>
            <Button  color="success" variant ="text" onClick={() => navigate("/shoes")}>חזרה לחנות</Button>
          </div>
        </div>
      )}

      {arr.length === 0 && <h1> !סל הקניות שלך עדיין ריק</h1>}
    </>
  );
};

export default Basket;


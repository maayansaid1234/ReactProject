import { useEffect, useState } from "react";
import { getAllOrders } from "./orderApi";
import { useSelector } from "react-redux";
import { Grid, Paper } from "@mui/material";
import "./allOrders.css"
import { Button } from "semantic-ui-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListItemByMyOrders from "./ListItemByMyOrders";
const MyOrders = () => {

  const [arr, setArr] = useState([]);
  const token = useSelector((st) => st.user.currentUser.token);

 

  const fetchData = async () => {
    try {
      let res = await getAllOrders(token);
      setArr(res.data);
    } catch (err) {
      toast.error(' ארעה שגיאה ', {
        position: 'top-center',
        autoClose: 2000, // מספר המילישני שתוצג ההתראה
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }); 
      toast.error(err.response?.data?.message
        , {
        position: 'top-center',
        autoClose: 3000, // מספר המילישני שתוצג ההתראה
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }); 
      
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // <-- Correct syntax for the dependency array

  return (
    <>
      <h1> ההזמנות שלי</h1>
      <div id="allOrders"
     
      >
        <Grid container spacing={2} sx={{ width: "100%", minHeight: "100%" }}>
          {arr &&
            arr.length > 0 &&
            arr.map((item, index) => (
              <Grid
                item
                key={item._id}
                xs={12}
                sm={6}
                md={6} // Change this to 6 for two items per row
                lg={6} // Change this to 6 for two items per row
                style={{ minWidth: "200px" }}
              >
                <Paper
                  elevation={3}
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <ListItemByMyOrders item={item}  />
                  </div>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </div>
      {arr.length==0&&<Button color="black" loading></Button>}
    
      
    </>
  );
};
export default MyOrders;













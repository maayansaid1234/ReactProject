import { useEffect, useState } from "react";
import { getAllOrders } from "./orderApi";
import { useSelector } from "react-redux";
import ListItem from "./ListItem";
import ListItemByMyOrders from "./ListItemByMyOrders"
import { Grid, Paper } from "@mui/material";
import "./allOrders.css"
import { Button } from "semantic-ui-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllOrders = () => {
  const [arr, setArr] = useState(null);
  const user=useSelector((st) => st.user.currentUser);
  const token = user.token;

 

  const fetchData = async () => {
    try {
      let res = await getAllOrders(token);
      setArr(res.data);
    } catch (err) {
    setArr([])
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
  },[]); 

  return (
    <>
    { user.role=="ADMIN" &&<h1> כל ההזמנות</h1>}
    {user.role=="USER"   &&<h1> ההזמנות שלי</h1>}
      <div id="allOrders" >
     
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

                   {user.role=="ADMIN"&& <ListItem item={item} fetchData={fetchData} />}
                   {user.role=="USER"&& <ListItemByMyOrders item={item}  />}
                  </div>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </div>
      {!arr&&<Button color="black" loading></Button>}
    
      
    </>
  );
};

export default AllOrders;











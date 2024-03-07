import { useEffect, useState } from "react";
import { getAllOrders } from "./orderApi";
import { useSelector } from "react-redux";
import ListItem from "./ListItem";
import { Grid, Paper } from "@mui/material";
import "./allOrders.css"
import { Button } from "semantic-ui-react";

const AllOrders = () => {
  const [arr, setArr] = useState([]);
  const token = useSelector((st) => st.user.currentUser.token);

 

  const fetchData = async () => {
    try {
      let res = await getAllOrders(token);
      setArr(res.data);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // <-- Correct syntax for the dependency array

  return (
    <>
      <h1> כל ההזמנות</h1>
      <div id="allOrders"
       /*
        style={{
          overflowX: "auto",
          maxHeight: "48.5vh",
          width: "100vw",
          margin: "auto",
          backgroundColor: "beige",
          "@media (max-width: 600px)": {
            maxHeight: "10vh", // Adjust for smaller screens
          },
        }}  */
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
                    <ListItem item={item} fetchData={fetchData} />
                  </div>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </div>
      {arr.length==0&&<Button primary loading></Button>}
    </>
  );
};

export default AllOrders;











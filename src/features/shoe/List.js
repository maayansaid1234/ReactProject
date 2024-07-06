import React, { useEffect, useState } from "react";
import { getAllShoes, getAmountOfShoes } from "./shoeApi";
import Grid from '@mui/material/Grid';
import { Outlet } from "react-router-dom";
import Paper from '@mui/material/Paper';
import "./listCss.css"
import ListItem from "./ListItem";
import { Select, MenuItem, InputLabel, FormControl, Pagination ,Box} from '@mui/material';
import { Button } from "semantic-ui-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = () => {
    

    let [arr, setArr] = useState(null);
    let [page, setPage] = useState(1);
    let [finalPage, setFinalPage] = useState(0);
    let [selectedCategory, setSelectedCategory] = useState("All");

    const fetchData = async () => {
        try {
            const response = await getAllShoes(page, selectedCategory === "All" ? "" : selectedCategory);
            if(response.data.length==0)
            setPage(p=>p-1);
           else
            setArr(response.data);
           
            let res = await getAmountOfShoes(selectedCategory === "All" ? "" : selectedCategory,"");
            const amountOfPages = (res.data.amount % 30) === 0 ? (res.data.amount) / 30 : Math.floor((res.data.amount) / 30) + 1;
            setFinalPage(amountOfPages);
        } catch (err) {
            console.error(err);
            setArr([]);
            toast.error(' ! הפעולה נכשלה ', {
                position: 'top-center',
                autoClose: 2000, // מספר המילישני שתוצג ההתראה
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }); 
               console.log(err)
               toast.error(err.response?.data?.message, {
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
    }, [page, selectedCategory]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setPage(1); // Reset page to 1 when category changes
    };

    return (
       
        <div>
             <Outlet />
            <h1 style={{marginTop:"1vh"}}>הנעליים שלנו</h1>

            <FormControl style={{width:"15%",marginBottom:"1vh"}} >
                <InputLabel style={{fontSize:"17px",width:"120%",color:"blue"
                ,fontWeight:"bold"}} id="category-label">בחר קטגוריה</InputLabel>
                <Select 
                    labelId="category-label"
                    id="category-select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="All">הכל</MenuItem>
                    <MenuItem value="WOMEN">נשים</MenuItem>
                    <MenuItem value="MEN">גברים</MenuItem>
                    <MenuItem value="KIDS">ילדים</MenuItem>
                </Select>
            </FormControl>

            <div  id="divAllShoes" style={{padding:"1vh "}}
             >
                <Grid container spacing={2} sx={{ width: '100%', minHeight: '100%' }}>
                    {arr && arr.length > 0 && arr.map(item => (
                        <Grid item key={item._id} xs={12} sm={6} md={4} lg={4} style={{ minWidth: '200px' }}>
                            <Paper elevation={3} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flex: 1}}>
                                    <ListItem one={item}   fetchData={fetchData} />
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>

           
           {(arr&&arr.length!=0)&& <Box   display="flex" justifyContent="center">
                <Pagination color="primary" variant="text" count={finalPage}
                page={page}
                onChange={(event,page)=>{setPage(page)}}
               />
                </Box>}
           

        
            {!arr&&<Button primary loading></Button>}
        </div>

    );
};

export default List;






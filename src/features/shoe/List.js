import React, { useEffect, useState } from "react";
import { getAllShoes, getAmountOfShoes } from "./shoeApi";
import Grid from '@mui/material/Grid';
import { Outlet } from "react-router-dom";
import Paper from '@mui/material/Paper';
import "./listCss.css"
import ListItem from "./ListItem";
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Button } from "semantic-ui-react";


const List = () => {
    

    let [arr, setArr] = useState([]);
    let [page, setPage] = useState(1);
    let [finalPage, setFinalPage] = useState(2);
    let [selectedCategory, setSelectedCategory] = useState("All");

    const fetchData = async () => {
        try {
            const response = await getAllShoes(page, selectedCategory === "All" ? "" : selectedCategory);
            setArr(response.data);
            console.log("hello");
            let res = await getAmountOfShoes(selectedCategory === "All" ? "" : selectedCategory,"");
            const amountOfPages = (res.data.amount % 30) === 0 ? (res.data.amount) / 30 : Math.floor((res.data.amount) / 30) + 1;
            setFinalPage(amountOfPages);
        } catch (err) {
            console.error(err);
            alert("לא הצליח להביא נתונים");
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
            <h1>רשימת המוצרים</h1>

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

            <div  id="divAllShoes" 
             >
                <Grid container spacing={2} sx={{ width: 'fit-content', minHeight: '100%' }}>
                    {arr && arr.length > 0 && arr.map(item => (
                        <Grid item key={item._id} xs={12} sm={6} md={4} lg={4} style={{ minWidth: '200px' }}>
                            <Paper elevation={3} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flex: 1 }}>
                                    <ListItem one={item}   fetchData={fetchData} />
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>

            <div id="divNextPreviousPage">
                <div>
                    {page > 1 && <ArrowBackIosTwoToneIcon onClick={() => setPage(p => p - 1)} />}
                </div>
                <div>
                    {(arr.length > 1 && page < finalPage) && <ArrowForwardIosTwoToneIcon onClick={() => setPage(p => p + 1)} />}
                </div>
            </div>

        {arr.length==0&&<Button primary loading></Button>}
     
        </div>

    );
};

export default List;






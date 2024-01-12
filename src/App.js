
import './App.css';
import CourseList from './features/course/CourseList';
import { useEffect, useState } from 'react';
import { getAllCourses } from './features/course/courseApi';

 
function App() {
  let [arr,setArr]=useState([]);
  useEffect(()=>{
      getAllCourses().then(res => {
           setArr(res.data);
           }).catch(err => {
           alert("לא יכול להביא את כל הקורסים")})
          } ,[])
  const removeFromArr=(_id) =>{
  
 setArr(arr.filter((item =>item._id !=  _id)))
}  
  return (
    <>
 <CourseList  course={{arr,removeFromArr}}/>

    </>
  );
}

export default App;

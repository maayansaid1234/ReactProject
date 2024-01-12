import { useEffect, useState } from 'react';
import OneCourse from './OneCourse';
// import { useSelector } from 'react-redux';
import { getAllCourses } from './courseApi';

const CourseList = (props) => {
   let arr=props.course.arr;
   let removeFromArr=props.course.removeFromArr;

    
    return (<ul>
        {arr.map(item => { return <li key={item._id}><OneCourse
course={{one:item,removeFromArr}}/> </li>; })}
   </ul>);
}
export default CourseList;
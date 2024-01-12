import { deleteCourseFromServer } from "./courseApi";

const OneCourse = (props) => {
    let one=props.course.one;
   let removeFromArr=props.course.removeFromArr;
        return (<div>
          <h1>{one.name}</h1>
          <h1>{one.price}</h1>
      <h1>{one.numLessons}</h1>
<input type="button" onClick={()=>{deleteCourseFromServer(one._id).then(removeFromArr(one._id))} }value={"delete Me"}/>
        </div>);
    }
    export default OneCourse;
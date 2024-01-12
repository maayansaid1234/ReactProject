
import axios from "axios";
//get -מקבלת את כל הקורסים
//get/id_ מקבלת קורס ספציפי
//post -מוסיפה קורס לשרת ומקבלת אותו בחזרה אחרי שהתווסף לשרת
//put-
//delete_ מוחקת מהשרת
export const getAllCourses = () => {
    return axios.get("http://localhost:4000/api/course")
}
export const getCourseById = (_id) => {
    return axios.get("http://localhost:4000/api/course/" + _id)
}
export const deleteCourseFromServer = (_id) => {
    return axios.delete("http://localhost:4000/api/course/" + _id)

}
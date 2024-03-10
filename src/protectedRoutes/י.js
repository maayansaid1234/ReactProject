import { useSelector } from "react-redux";

const App = () => {

    const user=useSelector(st=st.user.currentUser)
    return ( <>
    {!user&&<NavBarGuest/>}
{(user&&user.role=="USER")&&<NavBarUser/>}
{(user&&user.role=="ADMIN")&&<NavBarAdmin/>}
     </>);
}
 
export default ;
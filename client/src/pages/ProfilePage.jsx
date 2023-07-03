import {useContext, useState} from "react";
import {UserContext} from "../UserContext.jsx";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import PlacePage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";

export default function ProfilePage(){
    const [redirect,setRedirect] = useState(null);
 const {ready,user,setUser} = useContext(UserContext);
 let {subpage} = useParams();

 if(subpage === undefined){
    subpage = 'profile';
}

async function logout(){
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
}

 if(!ready){
    return "Loading...";
    }

 if(ready && !user && !redirect){
    return <Navigate to ={'./login'}/>
 }


    if(redirect){
        return <Navigate to = {redirect} />
    }

    return(
        <div>
        <AccountNav/>
        {subpage == 'profile'&&(
            <div className="text-center max-w-lg mx-auto">
                Logged in as {user.name}({user.email})<br/>
                <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
            </div>
        )}
        {subpage == 'places' && (
            <PlacePage/>
        )}
        </div>
    );
}
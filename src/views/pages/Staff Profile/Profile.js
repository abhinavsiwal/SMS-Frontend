import React from 'react'
import { isAuthenticated } from "api/auth";
import StaffProfile from './StaffProfile';
import StudentProfile from './StudentProfile';
import { FaAmericanSignLanguageInterpreting } from 'react-icons/fa';
const Profile = () => {
    const { user} = isAuthenticated();
    console.log(user);

if(user.user==="schoolAdmin"){
    return <h4>Not Found</h4>
}else if(user.user==="teacher"){
    return <StaffProfile />
}else if(user.user==="student"){
    return <StudentProfile />
}


}

export default Profile;
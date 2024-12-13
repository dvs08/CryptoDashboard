import React , {useState, useEffect} from 'react';
import '../style/profile.css';
import profilePic from '../Images/images.jpeg'
import {Button} from "@innovaccer/design-system";
import { useNavigate } from 'react-router-dom';
import '@innovaccer/design-system/css';

const userProfile = () => {

    const navigate = useNavigate();
    let user = {};

        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if(isAuthenticated){
             user = JSON.parse(localStorage.getItem('currentUser'));
        } else{
            console.log("User not authenticated");;
        }
    if(!user){
        navigate('/login');
    }
    
    console.log("User:", user);


    const handleReturnClick = () => {
    
        navigate(-1);
      };
    

    return(
        <div>
            <div className="backbtn">
            <Button onClick={handleReturnClick}>Back</Button>
        </div>

        <div className="outerProfile">
            
            <div className="profileMain">
                <div className="editBut">
                    <img className="profilePic" src={profilePic}/>
                </div>

                <div className="profileContent">

                        <ul className="userInfo">
                            <li><span style={{fontWeight:"bold"}}>Name:</span> {user.name}</li>
                            <li> <span style={{fontWeight:"bold"}}>Gender:</span> {user.gender}</li>
                            <li><span style={{fontWeight:"bold"}}>Username:</span> {user.username}</li>
                            <li><span style={{fontWeight:"bold"}}>D.O.B:</span> {user.DOB.slice(0, 10)}</li>
                            <li><span style={{fontWeight:"bold"}}>Email:</span> {user.email}</li>
                            <li> <span style={{fontWeight:"bold"}}>Designation:</span> {user.designation}</li>
                            
                        </ul>
                </div>
            </div>
            
        </div>
        
        </div>
    );
}

export default userProfile;
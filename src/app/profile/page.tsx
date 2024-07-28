"use client";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Profile() {

    const [username, setUsername] = useState('');
    
    const getUser = () => {
        axios({
            method: 'get',
            url: 'http://localhost:3001/getUser',
            withCredentials: true,

        }).then((res)=>{
            setUsername(res.data.username)

        }).catch((err) => { 
            throw err;
        })
    }

    useEffect(() => {        
        getUser();
    }, []);

    return (
        <div>
            <h2 style={{margin:'20px'}}>User Profile</h2>
            <p style={{margin:'25px'}}>Username: {username}</p>
        </div>
        
    );
}
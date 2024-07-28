"use client";
import { useState } from "react";
import axios from "axios";

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cnfrmPassword, setCnfrmPassword] = useState("");

    const register = (event: any) => {
        event.preventDefault();
        console.log("Event handler called");

        if(username==="" || password==="" || cnfrmPassword===""){
            alert("All fields are required");
            return;
        }
        axios({
            method: "post",
            url: "http://localhost:3001/register",
            data: {
                username: username,
                password: password,
            },
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then(() => console.log("Registered"))
        .catch(err => console.log(err));
    }
    
    return (
        <main>
            <h1>REGISTER</h1>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" onChange={e=>{
                        setUsername(e.target.value)
                    }} placeholder="xyz"/>
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" onChange={e=>{
                        setPassword(e.target.value)
                    }} placeholder="xyz123_.Iampotatoes"/>
                </label>
                <br />
                <label>
                    Confirm Password:
                    <input type="password" name="cnfrm-password" onChange={e=>{
                        setCnfrmPassword(e.target.value)
                    }} placeholder="xyz123_.Iampotatoes"/>
                </label>
                <br />
                <button type="submit" onClick={register}>Submit</button>
                <p>Already have an account <a href="/login">Login</a> instead</p>
            </form>            
        </main>
    );
}
"use client";

import axios from "axios";
import { useState } from "react";
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = (event: any) => {
        event.preventDefault();
        axios({
          method: 'post',
          data: {
            username: username,
            password: password
          },
          withCredentials: true,
          url: 'http://localhost:3001/login'
        }).then(res => {console.log(res)}).catch(err => {console.log(err)})
    }

    return (
        <main>
            <h1>LOGIN</h1>
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
                <button type="submit" onClick={login}>Submit</button>
                <p>Don't have an account? <a href="/register">Register</a> instead</p>
            </form>
        </main>
    );
}
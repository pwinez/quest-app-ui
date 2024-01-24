import { Button, FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth(){
    let navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsername = (value) => {
        setUsername(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }

    const sendRequest = (path) =>{
        fetch("/auth/" +path,{
            method : "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                userName : username,
                password : password,
            })
        })
        .then((res) => res.json())
        .then((result) => {localStorage.setItem("tokenKey", result.message);
                          localStorage.setItem("currentUser", result.userId);
                          localStorage.setItem("userName", result.username)})
        .catch((err) => console.log(err))
    }

    const handleButton = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
        navigate(0);
    }



    



    return(
        <FormControl>
            <InputLabel style={{top:15}}>Username</InputLabel>
            <Input style={{top:20}} onChange={(i) => handleUsername(i.target.value)}/>
            <InputLabel style={{top:80}}>Password</InputLabel>
            <Input style={{top:40}} onChange={(i) => handlePassword(i.target.value)} />
            <Button variant="contained"
            style={{marginTop:60,
            background : "blue",
            color : "white"}}
            onClick={(()=>handleButton("register"))}>Register</Button>
            <FormHelperText style={{margin:20}}>Are you already registered?</FormHelperText>
            <Button variant="contained"
            style={{
            background : "blue",
            color : "white"}}
            onClick={(()=>handleButton("login"))}>Login</Button>
        </FormControl>
    )
}

export default Auth;
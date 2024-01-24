import { Button, CardContent, InputAdornment, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import {Link} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    comment:{
        display : "flex",
        flexWrap : "wrap",
        justifyContent : "flex-start",
        alignItems : "center",
    },
    small : {
        width : theme.spacing(4),
        height : theme.spacing(4),
    },
    link : {
        textDecoration : "none",
        boxShadow: "none",
        color : "white",
    }
    }));

    function CommentForm(props) {
        const {userId, userName, postId} = props;
        const classes = useStyles();
        const[text, setText] = useState("");

        const saveComment = () => {
            fetch("/comments",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : localStorage.getItem("tokenKey"),
                },
                body : JSON.stringify({
                    postId : postId,
                    userId : localStorage.getItem("currentUser"),
                    text : text,
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log(err))
        }

        
        const handleSubmit = () => {
            saveComment();
            setText("");
        }
        const handleChange = (value) => {
            setText(value);
            
        }

        return(
                <CardContent className={classes.comment}>

                <OutlinedInput
                
                id="outlined-adorment-amount"
                multiline
                inputProps={{maxLength : 25}}
                fullWidth
                onChange={(i) => handleChange(i.target.value)}
                startAdornment = {
                    <InputAdornment position="start">
                    <Link className={classes.link} to={{pathname: '/users/' + userId}}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {userName.charAt(0).toUpperCase()}
                    </Avatar>
                    </Link>
                    </InputAdornment>
                }
                endAdornment = {
                    <InputAdornment
                    position="end">
                        <Button
                variant="contained"
                style={{backgroundColor : "#0c229d", color : "white"}}
                onClick={(()=>handleSubmit())}
                >Post</Button>
                    </InputAdornment>
                }
                value={text}
                ></OutlinedInput>
                </CardContent>

        )

    }

    export default CommentForm;
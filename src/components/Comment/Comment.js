import { CardContent, InputAdornment, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
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

    function Comment(props) {
        const {text, userId, userName} = props;
        const classes = useStyles();


        return(
                <CardContent className={classes.comment}>

                <OutlinedInput
                disabled
                id="outlined-adorment-amount"
                multiline
                inputProps={{maxLength : 250}}
                fullWidth
                value={text}
                startAdornment = {
                    <InputAdornment position="start">
                    <Link className={classes.link} to={{pathname: '/users/' + userId}}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {userName.charAt(0).toUpperCase()}
                    </Avatar>
                    </Link>
                    </InputAdornment>
                }
                
                ></OutlinedInput>
                </CardContent>

        )

    }

    export default Comment;
import React, {useState} from "react";
// import  ReactDOM  from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {Link} from "react-router-dom";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { InputAdornment } from "@material-ui/core";
import {Button}  from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
const useStyles = makeStyles((theme) => ({
    root: {
      width: 900,
      textAlign : "left",
      margin: 20
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    avatar: {
      backgroundColor: red[500],
    },
    link:{
        textDecoration : "none",
        boxShadow : "none",
        color : "white"
    }
  }));

function PostForm(props) {
    const {userId, userName, refreshPost} = props;
    const classes = useStyles();
    const [text, SetText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        fetch("/posts",{
            method : "POST",
            headers: {
                "Content-Type" : "application/json", 
                "Authorization" : localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                title : title,
                userId : localStorage.getItem("currentUser"),
                text : text,
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log("error: ", err));
    }

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        SetText("");
        refreshPost();
    }
    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    }
    const handleText = (value) => {
        SetText(value);
        setIsSent(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsSent(false);
      };
    
    return(
        <div>
            <Snackbar open={isSent} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Your post is sent!
        </Alert>
      </Snackbar>
      <Card className={classes.root}>
      <CardHeader
        avatar= {
            <Link className={classes.link} to={{pathname: '/users/' + userId}}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          </Link>
        }
        
        title={ <OutlinedInput
        id="outlined-adorment-amount"
        multiline
        placeholder="Title"
        inputProps={{maxLength : 25}}
        fullWidth
        value={title}
        onChange={(i) => handleTitle(i.target.value)}
        >

        </OutlinedInput> }
        
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        { <OutlinedInput
        id="outlined-adorment-amount"
        multiline
        placeholder="Text"
        inputProps={{maxLength : 250}}
        fullWidth
        value={text}
        onChange={(i) => handleText(i.target.value)}
        endAdornment = {
            <InputAdornment position="end">
            <Button
            variant="contained"
            style={{backgroundColor : "#0c229d", color : "white"}}
            onClick={(()=>handleSubmit())}
            >Post</Button>
            </InputAdornment>
        }>
        </OutlinedInput> }
        </Typography>
      </CardContent>
    </Card>
        </div>
       
    )
}

export default PostForm;
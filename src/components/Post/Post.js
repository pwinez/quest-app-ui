import React, {useState, useEffect, useRef} from "react";
// import  ReactDOM  from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import {Link} from "react-router-dom";
import { Container } from "@material-ui/core";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

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

function Post(props) {
    const {title, text, userId, userName, postId, likes} = props;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const[isLiked, setIsLiked] = useState(false);
    const isInitialMount = useRef(true);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [likeId, setLikeId] = useState(null);
    let disabled = localStorage.getItem("currentUser") == null ? true : false;

    const handleExpandClick = () => {
      setExpanded(!expanded);
      refreshComments();
      console.log(commentList);
    };
    const handleLike = () => {
        setIsLiked(!isLiked);
        if(!isLiked){
            setLikeCount(likeCount + 1)
            saveLike();
        }
        else{      
            setLikeCount(likeCount - 1)
            deleteLike();
}    }

    const checkLikes = () => {
       var likeControl = likes.find((like => ""+like.userId === localStorage.getItem("currentUser")));
        if(likeControl != null)
       { setLikeId(likeControl.id)
        setIsLiked(true);}
    }

    const refreshComments = () =>{
        fetch("/comments?postId="+postId)
        .then(res => res.json())
        .then(
            (result) =>{
                setIsLoaded(true)
                setCommentList(result)
            },

            (error) => {
                console.log(error)
                setIsLoaded(true)
                setError(error)
            }
        )
    }

    const saveLike = () => {
        fetch("/likes",
        {
            method : "POST",
            headers: {
                "Content-Type" : "application/json", 
                "Authorization" : localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                postId : postId,
                userId : localStorage.getItem("currentUser"),
               
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log("error: ", err));
    }

    const deleteLike = () => {
        fetch("/likes/" + likeId,
        {
            method : "DELETE",
            headers: {
              "Authorization" : localStorage.getItem("tokenKey"),
          },
        })
        .catch((err) => console.log("error: ", err));
    }

    useEffect(() => {

        if(isInitialMount.current)
        isInitialMount.current = false
    else
        refreshComments();
     },[] ); //

    useEffect(() => {checkLikes()},[]);

    return(
        <div className="postContainer">
             <Card className={classes.root}>
      <CardHeader
        avatar= {
            <Link className={classes.link} to={{pathname: '/users/' + userId}}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          </Link>
        }
        
        title={title}
        
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      {disabled ?
        <IconButton
        onClick={(()=>handleLike())}
         aria-label="add to favorites">
          <FavoriteIcon style={isLiked? {color : "red"} : null} />
        </IconButton> :
       <IconButton
       onClick={(()=>handleLike())}
        aria-label="add to favorites">
         <FavoriteIcon style={isLiked? {color : "red"} : null} />
       </IconButton>
      }
        {likeCount}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed className={classes.container}>
          {error? "error" :
          isLoaded? commentList.map(comment => (
            <Comment userId = {1} userName = {"USER"} text = {comment.text}></Comment>
          )) : "Loading"}
          {disabled? "" : 
          <CommentForm userId = {1} userName = {"USER"} postId = {postId}></CommentForm>}
          
        </Container>
      </Collapse>
    </Card>
        </div>
    )
}

export default Post;
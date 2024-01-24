import { makeStyles } from "@material-ui/core";
import Post from "../Post/Post";
import React, { useEffect, useState } from "react"; 
import PostForm from "../Post/PostForm.js";


const useStyles = makeStyles((theme)=>({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f0f5ff',
        
    }
}));

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);
    const classes = useStyles();

    const refreshPost = () =>{
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) =>{
                setIsLoaded(true)
                setPostList(result)
            },

            (error) => {
                setIsLoaded(true)
                setError(error)
            }
        )
    }
    
    useEffect(() => {
       refreshPost()
    },
    
   [] )//
        if(error){
            return <div>Error !!!</div>;
        }else if(!isLoaded){
            return <div>Loading...</div>;
        }else{
            return(

<div className= {classes.container}>
            {localStorage.getItem("currentUser") == null? "":  
            <PostForm userId = {localStorage.getItem("currentUser")} userName = {localStorage.getItem("userName")} refreshPost = {refreshPost}> </PostForm>}
       
                    {postList.map(post =>(
                        
                        <Post likes = {post.postLikes} postId = {post.id} userId = {post.userId} userName = {post.userName} title = {post.title} text={post.text} ></Post>
                            
                    ))}
                </div>
            );
        }
}
export default Home;

import React, {useState, useEffect, useContext } from 'react';
import "../styles/ForumPostPage.css";
import { Card, Paper, Container, Avatar, IconButton } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { getCommentList, likeComment, unlikeComment, saveComment, unsaveComment } from "../utils/CommentControls";
import { 
    getForumPost, 
    getAllForumPosts, 
    likeForumPost, 
    unlikeForumPost, 
    saveForumPost, 
    unsaveForumPost } from "../utils/ForumPostControls";
import { UserContext } from "../contexts/UserContextProvider";

function ForumPostPage() {
    const {user, setUser} = useContext(UserContext);
    const [post, setPost] = useState(null);
    const [postID, setPostID] = useState("");
    const [comments, setComments] = useState([]);

    const [updated, setUpdated] = useState(false);

    const [clickedLike, setClickedLike] = useState(false);
    const [clickedSave, setClickedSave] = useState(false);

    const [clickedLikeComment, setClickedLikeComment] = useState(false);
    const [clickedSaveComment, setClickedSaveComment] = useState(false);

    //gets and displays main post and first level comments
    useEffect(() => {
        //fetchForumPosts();
        getForumPost('KmNr1DLl03PeoypJQesQ', user).then((res) => {
            setPostID('KmNr1DLl03PeoypJQesQ');
            //console.log(res);
            getCommentList(res.comments, user).then((res) => {
                //console.log(res);
                setComments(res);
            });
            setPost(res);
        });
    }, [user, updated, clickedLike, clickedSave])

    //functionality to buttons on post
    const handleLike = () => {
        likeForumPost(postID, user).then((res) => {
            console.log(res);
            if (updated === false) {
                setUpdated(true);
            }
            else {
                setUpdated(false);
            }
        });
        setClickedLike(true);
    }

    const handleSave = () => {
        saveForumPost(postID, user).then((res) => {
            console.log(res);
            if (updated === false) {
                setUpdated(true);
            }
            else {
                setUpdated(false);
            }
        });
        setClickedSave(true);
    }

    const handleUnlike = () => {
        unlikeForumPost(postID, user).then((res) => {
            console.log(res);
            if (updated === false) {
                setUpdated(true);
            }
            else {
                setUpdated(false);
            }
        });
        setClickedLike(false);
    }

    const handleUnsave= () => {
        unsaveForumPost(postID, user).then((res) => {
            console.log(res);
            if (updated === false) {
                setUpdated(true);
            }
            else {
                setUpdated(false);
            }
        });
        setClickedSave(false);
    }

    //functionality to buttons on comments
    const handleLikeComment = (id) => {
        likeComment(id, user).then((res) => {
            console.log(res);
            if (updated === false) {
                setUpdated(true);
            }
            else {
                setUpdated(false);
            }
        });
        setClickedLikeComment(true);
    }

    const handleSaveComment = (id) => {
        saveComment(id, user).then((res) => {
            console.log(res);
            if (updated === false) {
                setUpdated(true);
            }
            else {
                setUpdated(false);
            }
        });
        setClickedSaveComment(true);
    }

    const handleUnlikeComment = (id) => {
        unlikeComment(id, user).then((res) => {
            console.log(res);
            if (updated === false) {
                setUpdated(true);
            }
            else {
                setUpdated(false);
            }
        });
        setClickedLikeComment(false);
    }

    const handleUnsaveComment = (id) => {
        unsaveComment(id, user).then((res) => {
            console.log(res);
            if (updated === false) {
                setUpdated(true);
            }
            else {
                setUpdated(false);
            }
        });
        setClickedSaveComment(false);
    }

    return (
        <div>
            <div>
                { post !== null && post.date !== undefined &&
                    <Paper className='post'>
                        <Avatar src=''></Avatar>
                        <h3>{new Date(post.date._seconds * 1000).toDateString()}</h3>
                        <p>{post.content}</p>
                        <p>
                        {!clickedLike ? <IconButton onClick={()=>handleLike()}><FavoriteBorderIcon/></IconButton> : <IconButton onClick={()=>handleUnlike()}><FavoriteIcon/></IconButton>}{post.likes}
                        {!clickedSave ? <IconButton onClick={()=>handleSave()}><BookmarkBorderIcon/></IconButton> : <IconButton onClick={()=>handleUnsave()}><BookmarkIcon/></IconButton>}{post.saves} 
                            <IconButton>
                                <ChatBubbleOutlineIcon/>
                            </IconButton>{post.comments.length}
                        </p>
                    </Paper>
                }    
            </div>   
            <div>
                {comments && 
                    comments.map((comment) => (
                        <Paper className='comment-1'>
                            <Avatar src=''></Avatar>
                            <h3>{comment.user} | {new Date(comment.date._seconds * 1000).toDateString()}</h3>
                            <p>{comment.content}</p>
                            <p>
                                {!clickedLikeComment ? <IconButton onClick={()=>handleLikeComment(comment.doc)}><FavoriteBorderIcon/></IconButton> : <IconButton onClick={()=>handleUnlikeComment(comment.doc)}><FavoriteIcon/></IconButton>}{comment.likes}
                                {!clickedSaveComment ? <IconButton onClick={()=>handleSaveComment(comment.doc)}><BookmarkBorderIcon/></IconButton> : <IconButton onClick={()=>handleUnsaveComment(comment.doc)}><BookmarkIcon/></IconButton>}{comment.saves} 
                                {!clickedShow ? <IconButton onClick={()=>handleShow(comment.comments, 2)}><ChatBubbleOutlineIcon/></IconButton> : <IconButton onClick={()=>handleHide(comment.comments)}><ChatBubbleIcon/></IconButton>}{comment.comments.length}
                                {comment.comments > 0 && subComments.length !== 0 && 
                                    subComments
                                }
                            </p>
                        </Paper>
                    ))
                }
            </div>
        </div>
    )
}

export default ForumPostPage
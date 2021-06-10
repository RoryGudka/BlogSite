import React, {useState, useEffect, useContext } from 'react';
import "../styles/ForumPostPage.css";
import { Card, Paper, Container, Avatar, IconButton } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ReplyIcon from '@material-ui/icons/Reply';
import { getCommentList, likeComment, unlikeComment, saveComment, unsaveComment } from "../utils/CommentControls";
import { 
    getComment} from "../utils/CommentControls";
import { UserContext } from "../contexts/UserContextProvider";
import {useLocation, useHistory} from 'react-router-dom';

function CommentPage() {
    const history = useHistory();
    const location = window.location.pathname.split('/')[2];
    
    const {user, setUser} = useContext(UserContext);
    const [post, setPost] = useState(null);
    const [postID, setPostID] = useState("");
    const [comments, setComments] = useState([]);

    const [updated, setUpdated] = useState(false);

    const [clickedLike, setClickedLike] = useState(false);
    const [clickedSave, setClickedSave] = useState(false);

    const [clickedLikeComment, setClickedLikeComment] = useState(false);
    const [clickedSaveComment, setClickedSaveComment] = useState(false);

    const [reply, setReply] = useState(false);

    //gets and displays main post and first level comments
    useEffect(() => {
        //fetchComments();
        getComment(location, user).then((res) => {
            setPostID(location);
            //console.log(res);
            getCommentList(res.comments, user).then((res) => {
                //console.log(res);
                setComments(res);
            });
            setPost(res);
        });
    }, [location, user, updated, clickedLike, clickedSave])


    //functionality to buttons on post
    const handleLike = () => {
        likeComment(postID, user).then((res) => {
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
        saveComment(postID, user).then((res) => {
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
        unlikeComment(postID, user).then((res) => {
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
        unsaveComment(postID, user).then((res) => {
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

    const handleShow = (comments, number) => {

        console.log('alskdfj')
    }

    const handleHide = (comments, number) => {
        console.log('alsdkfja')
    }

    const item = post;
    return (
        <div>
            <div>
                { post !== null && post.date !== undefined &&
                    <Paper className='post'>
                        <div style={{display:'inline-block'}}>
                            <Avatar src=''></Avatar>
                        </div>
                        {item.topic === undefined && item.user !== undefined && <p className="usernamePMain">@{item.user} | {(new Date(item.date._seconds * 1000)).toDateString()}</p>} 
                        {item.topic !== undefined && <p className="topicPMain">@{item.user} | {item.topic} | {(new Date(item.date._seconds * 1000)).toDateString()}</p>}
                        {item.title !== undefined && item.topic === undefined && <p className="topicPMain">{(new Date(item.date._seconds * 1000)).toDateString()}</p>} 
                        {item.title !== undefined && <p className="titlePMain"><b>{item.title}</b></p>} 
                        <p>{post.content}</p>
                        <p>
                        {!clickedLike ? <IconButton onClick={()=>handleLike()}><FavoriteBorderIcon/></IconButton> : <IconButton onClick={()=>handleUnlike()}><FavoriteIcon/></IconButton>}{post.likes}
                        {!clickedSave ? <IconButton onClick={()=>handleSave()}><BookmarkBorderIcon/></IconButton> : <IconButton onClick={()=>handleUnsave()}><BookmarkIcon/></IconButton>}{post.saves} 
                            <IconButton>
                                <ChatBubbleOutlineIcon/>
                            </IconButton>{post.comments.length}
                            <IconButton><ReplyIcon/></IconButton>
                        </p>
                    </Paper>
                }    
            </div>   
            <div>
                {comments && 
                    comments.map((comment) => (
                        <Paper className='comment-1'>
                            <div style={{display:'inline-block'}}>
                                <Avatar src=''></Avatar>
                            </div>
                            {comment.topic === undefined && comment.user !== undefined && <p className="usernamePMain">@{comment.user} | {(new Date(comment.date._seconds * 1000)).toDateString()}</p>} 
                            {comment.topic !== undefined && <p className="topicPMain">@{comment.user} | {comment.topic} | {(new Date(comment.date._seconds * 1000)).toDateString()}</p>}
                            {comment.title !== undefined && comment.topic === undefined && <p className="topicPMain">{(new Date(comment.date._seconds * 1000)).toDateString()}</p>} 
                            {comment.title !== undefined && <p className="titlePMain"><b>{comment.title}</b></p>} 
                            <p>{comment.content}</p>
                            <p>
                                {!clickedLikeComment ? <IconButton onClick={()=>handleLikeComment(comment.doc)}><FavoriteBorderIcon/></IconButton> : <IconButton onClick={()=>handleUnlikeComment(comment.doc)}><FavoriteIcon/></IconButton>}{comment.likes}
                                {!clickedSaveComment ? <IconButton onClick={()=>handleSaveComment(comment.doc)}><BookmarkBorderIcon/></IconButton> : <IconButton onClick={()=>handleUnsaveComment(comment.doc)}><BookmarkIcon/></IconButton>}{comment.saves} 
                                {/* {!clickedShow ? <IconButton onClick={()=>handleShow(comment.comments, 2)}><ChatBubbleOutlineIcon/></IconButton> : <IconButton onClick={()=>handleHide(comment.comments)}><ChatBubbleIcon/></IconButton>}{comment.comments.length} */}
                                <IconButton onClick={() => history.push('/comments/' + comment.doc)}><ChatBubbleOutlineIcon/></IconButton>{comment.comments.length}
                                <IconButton><ReplyIcon/></IconButton>
                                {}
                                {/* {comment.comments > 0 && subComments.length !== 0 && 
                                    subComments
                                } */}
                            </p>
                        </Paper>
                    ))
                }
            </div>
        </div>
    )
}

export default CommentPage
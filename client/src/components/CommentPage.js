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
    getComment} from "../utils/CommentControls";
import { UserContext } from "../contexts/UserContextProvider";
import {useLocation, useHistory} from 'react-router-dom';
import CBFItem from './CBFItem';
import Comment from './Comment';

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

    const getPost = () => {
        getComment(location, user).then((res) => {
            setPostID(location);
            //console.log(res);
            getCommentList(res.comments, user).then((res) => {
                //console.log(res);
                let newComments = res.sort((a, b) => {
                    return a.date._seconds - b.date._seconds
                })
                setComments(newComments);
            });
            setPost(res);
        });
    }

    //gets and displays main post and first level comments
    useEffect(() => {
        getPost();
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

    const item = post;
    return (
        <div>
            <div>
                { post !== null && post.date !== undefined &&
                    <div style={{width:"70%", left:"15%"}}>
                        {user !== null ? (
                            <CBFItem disabled={false} item={{...post, doc:location}} likes={user.comments_liked} saves={user.comments_saved} />
                        ) : (
                            <CBFItem disabled={true} item={{...post, doc:location}} />
                        )}
                    </div>
                }    
            </div>   
            <div>
                {comments && (
                <Paper className="commentWrapper">
                    <p className="commentsSectionP">Replies</p>
                    {comments.map((comment) => (
                        user !== null ? (
                            <CBFItem disabled={false} item={comment} likes={user.comments_liked} saves={user.comments_saved} />
                        ) : (
                            <CBFItem disabled={true} item={comment} />
                        )
                    ))}
                </Paper>
                )}
            </div>
            <div>
                {user !== null && <Comment propsInfo={['comments', postID, getPost]}/>}
            </div>
        </div>
    )
}

export default CommentPage
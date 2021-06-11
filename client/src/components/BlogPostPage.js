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
    getBlogPost, 
    getAllB, 
    likeBlogPost, 
    unlikeBlogPost, 
    saveBlogPost, 
    unsaveBlogPost } from "../utils/BlogPostControls";
import { UserContext } from "../contexts/UserContextProvider";
import {useLocation, useHistory} from 'react-router-dom';
import CBFItem from './CBFItem';

function BlogPostPage() {
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
        //fetchBlogPosts();
        getBlogPost(location, user).then((res) => {
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
        likeBlogPost(postID, user).then((res) => {
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
        saveBlogPost(postID, user).then((res) => {
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
        unlikeBlogPost(postID, user).then((res) => {
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
        unsaveBlogPost(postID, user).then((res) => {
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
                    <div style={{width:"70%", left:"15%"}}>
                        {user !== null ? (
                            <CBFItem disabled={false} item={{...post, doc:location}} likes={user.blog_posts_liked} saves={user.blog_posts_saved} />
                        ) : (
                            <CBFItem disabled={true} item={{...post, doc:location}} />
                        )}
                    </div>
                }    
            </div>   
            <div>
                {comments && <Paper className="commentWrapper" elevation={3}>
                    <p className="commentsSectionP">Comments</p>
                    {comments && 
                        comments.map((comment) => (
                            user !== null ? (
                                <CBFItem disabled={false} item={comment} likes={user.comments_liked} saves={user.comments_saved} />
                            ) : (
                                <CBFItem disabled={true} item={comment} />
                            )
                        ))}
                    </Paper>
                }
            </div>
        </div>
    )
}

export default BlogPostPage
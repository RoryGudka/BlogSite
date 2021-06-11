import { useContext, useEffect, useState } from 'react';
import {UserContext} from '../contexts/UserContextProvider';
import {Redirect} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import {Grid, makeStyles, Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ChatBubbleBorderIcon from '@material-ui/icons/ChatBubbleOutline';
import {getCommentList} from '../utils/CommentControls';
import {getBlogPostList} from '../utils/BlogPostControls';
import {getForumPostList} from '../utils/ForumPostControls';
import PostPreview from './PostComponents/ForumPreview';
import UserPageItem from './UserPageItem';
import {useButtonStyles} from './../styles/Buttons';
import '../styles/UserPage.css';



const UserPage = props => {
    const [likes, setLikes] = useState([]);
    const [saves, setSaves] = useState([]);
    const [comments, setComments] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);
    const [forumPosts, setForumPosts] = useState([]);
    const [selected, setSelected] = useState(0);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user !== null) {
            let newLikes = [];
            getCommentList(user.comments_liked, user).then(res => {
                if(res) {
                    newLikes = [...newLikes, ...res];
                    setComments([...comments, ...res]);
                }
                getBlogPostList(user.blog_posts_liked, user).then(res => {
                    if(res) {
                        newLikes = [...newLikes, ...res];
                        setBlogPosts([...blogPosts, ...res]);
                    }
                    getForumPostList(user.forum_posts_liked, user).then(res => {
                        if(res) {
                            newLikes = [...newLikes, ...res];
                            setForumPosts([...forumPosts, ...res]);
                        }
                        setLikes(newLikes)
                    });
                })
            });
            let newSaves = [];
            getCommentList(user.comments_saved, user).then(res => {
                if(res) {
                    newSaves = [...newSaves, ...res];
                    setComments([...comments, ...res]);
                }
                getBlogPostList(user.blog_posts_saved, user).then(res => {
                    if(res) {
                        newSaves = [...newSaves, ...res];
                        setBlogPosts([...blogPosts, ...res]);
                    }
                    getForumPostList(user.forum_posts_saved, user).then(res => {
                        if(res) {
                            newSaves = [...newSaves, ...res];
                            setForumPosts([...forumPosts, ...res]);
                        }
                        setSaves(newSaves)
                    });
                })
            });
        }
    }, []);

    if(user === null) return <Redirect to="/" />

    const likesHTML = likes.map(item => {
        return (
            <UserPageItem item={item} likes={likes} saves={saves} />
        )
    })

    const savesHTML = saves.map(item => {
        return (
            <UserPageItem item={item} likes={likes} saves={saves} />
        )
    })
    console.log(user);

    return (
        <Grid container direction="row" justify="space-around">
            <Paper style={{width: "30%", margin:"20px 0"}} elevation={3}>
                <Grid container direction="column">
                    <Grid item style={{textAlign: "center"}}>
                        <div style={{fontSize: 32, marginTop: "15px", fontWeight: "bold"}}>User Info</div>
                    </Grid>
                    <div style={{fontSize: 24, marginLeft: "25px", marginTop: "5px"}}>Name: {user.name}</div>
                    <div style={{fontSize: 24, marginLeft: "25px", marginTop: "5px"}}>User name: {user.username}</div>
                    <div style={{fontSize: 24, marginLeft: "25px", marginTop: "5px"}}>Email: {user.email}</div>
                    <div>
                        <Button variant="contained">Reset password</Button>
                        <Button variant="contained">Sign Out</Button>
                    </div>
                </Grid>
            </Paper>
            <Paper style={{width:"40%", padding:"10px", margin:"20px 0"}} elevation={3}>
                <Paper style={{ width:"100%",textAlign:'center', marginBottom:'20px'}} elevation={3}>
                    <IconButton onClick={() => setSelected(0)}>
                        {selected === 0 ? <FavoriteIcon style={{color:'var(--Secondary)'}} /> : <FavoriteBorderIcon style={{color:'var(--Secondary)'}} />}
                    </IconButton>
                    <IconButton onClick={() => setSelected(1)}>
                        {selected === 1 ? <BookmarkIcon style={{color:'var(--Secondary)'}} /> : <BookmarkBorderIcon style={{color:'var(--Secondary)'}} />}
                    </IconButton>
                    <IconButton onClick={() => setSelected(2)}>
                        {selected === 2 ? <ChatBubbleIcon style={{color:'var(--Secondary)'}} /> : <ChatBubbleBorderIcon style={{color:'var(--Secondary)'}} />}
                    </IconButton>
                </Paper>
                {selected === 0 && likesHTML}
                {selected === 1 && savesHTML}
            </Paper>
        </Grid>
    )
}

export default UserPage;
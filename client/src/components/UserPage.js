import { useContext, useEffect, useState } from 'react';
import {UserContext} from '../contexts/UserContextProvider';
import {Redirect} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
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



const UserPage = props => {
    const [likes, setLikes] = useState([]);
    const [saves, setSaves] = useState([]);
    const [comments, setComments] = useState([]);
    const [selected, setSelected] = useState(0);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user !== null) {
            let newLikes = [];
            getCommentList(user.comments_liked, user).then(res => {
                if(res) newLikes = [...newLikes, ...res];
                getBlogPostList(user.blog_posts_liked, user).then(res => {
                    if(res) newLikes = [...newLikes, ...res];
                    getForumPostList(user.forum_posts_liked, user).then(res => {
                        if(res) newLikes = [...newLikes, ...res];
                        setLikes(newLikes)
                    });
                })
            });
            let newSaves = [];
            getCommentList(user.comments_saved, user).then(res => {
                if(res) newSaves = [...newSaves, ...res];
                getBlogPostList(user.blog_posts_saved, user).then(res => {
                    if(res) newSaves = [...newSaves, ...res];
                    getForumPostList(user.forum_posts_saved, user).then(res => {
                        if(res) newSaves = [...newSaves, ...res];
                        setSaves(newSaves)
                    });
                })
            });
        }
    }, []);

    if(user === null) return <Redirect to="/" />

    const likesHTML = likes.map(item => {
        return (
            <Paper>
                <p>{item.content}</p>
            </Paper>
        )
    })

    const savesHTML = saves.map(item => {
        return (
            <Paper>
                <p>{item.content}</p>
            </Paper>
        )
    })

    return (
        <Paper style={{width:"40%", left:"50%", padding:"10px", margin:"20px 0"}} elevation={3}>
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
    )
}

export default UserPage;
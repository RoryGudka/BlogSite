import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ChatBubbleBorderIcon from '@material-ui/icons/ChatBubbleOutline';
import IconButton from '@material-ui/core/IconButton';
import {useState, useContext} from 'react';
import { likeComment, saveComment, unlikeComment, unsaveComment } from '../utils/CommentControls';
import {UserContext} from '../contexts/UserContextProvider';
import { likeBlogPost, saveBlogPost, unlikeBlogPost, unsaveBlogPost } from '../utils/BlogPostControls';
import { likeForumPost, saveForumPost, unlikeForumPost, unsaveForumPost } from '../utils/ForumPostControls';
import {useHistory} from 'react-router-dom';

const LSCBar = ({item, likes, saves, comments, liked, saved}) => {
    const history = useHistory();
    const {user} = useContext(UserContext);
    const [likedStat, setLiked] = useState(liked);
    const [savedStat, setSaved] = useState(saved);
    const [curLikes, setLikes] = useState(likes);
    const [curSaves, setSaves] = useState(saves);

    const handleLikeClick = () => {
        if(likedStat) {
            if(item.type === "comment") unlikeComment(item.doc, user);
            else if(item.type === "blog_post") unlikeBlogPost(item.doc, user);
            else if(item.type === "forum_post") unlikeForumPost(item.doc, user);
            setLikes(curLikes - 1);
            setLiked(!likedStat);
        }
        else {
            if(item.type === "comment") likeComment(item.doc, user);
            else if(item.type === "blog_post") likeBlogPost(item.doc, user);
            else if(item.type === "forum_post") likeForumPost(item.doc, user);
            setLikes(curLikes + 1);
            setLiked(!likedStat);
        }
        
    }

    const handleSaveClick = () => {
        if(savedStat) {
            if(item.type === "comment") unsaveComment(item.doc, user);
            else if(item.type === "blog_post") unsaveBlogPost(item.doc, user);
            else if(item.type === "forum_post") unsaveForumPost(item.doc, user);
            setSaves(curSaves - 1);
            setSaved(!savedStat);
        }
        else {
            if(item.type === "comment") saveComment(item.doc, user);
            else if(item.type === "blog_post") saveBlogPost(item.doc, user);
            else if(item.type === "forum_post") saveForumPost(item.doc, user);
            setSaves(curSaves + 1);
            setSaved(!savedStat);
        }
    }

    const handleChatClick = () => {
        history.push('/' + item.type + 's/' + item.doc);
    }

    return (
        <div>
            <IconButton onClick={handleLikeClick}>
                {likedStat ? <FavoriteIcon style={{color:"var(--Secondary)"}} /> : <FavoriteBorderIcon style={{color:"var(--Secondary)"}} />}
            </IconButton>
            {curLikes}
            <IconButton onClick={handleSaveClick}>
                {savedStat ? <BookmarkIcon style={{color:"var(--Secondary)"}} /> : <BookmarkBorderIcon style={{color:"var(--Secondary)"}} />}
            </IconButton>
            {curSaves}
            <IconButton onClick={handleChatClick}>
                <ChatBubbleBorderIcon style={{color:"var(--Secondary)"}} />
            </IconButton>
            {comments}
        </div>
    )
}

export default LSCBar;
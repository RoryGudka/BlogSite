import Paper from '@material-ui/core/Paper';
import LSCBar from './LSCBar';
import {useHistory} from 'react-router-dom';
import {Grid, makeStyles} from '@material-ui/core';
import {InteractableIcon} from './PostComponents/PostMisc';

const useStyles = makeStyles(({
    footerNumber: {
        color: 'gray',
        marginRight: 20,
    },
    footerLink: {
        fontWeight: 'bold',
        color: 'gray',
    },
}));

const BlogPost = ({post, liked, saved, loggedIn, handleLike, handleSave}) => {

    const history = useHistory();

    const handleComment = () => {
        history.push('/' + post.type + 's/' + post.doc);
    }

    return (
        (post !== undefined && post !== null) && (
            <Paper style={{padding:"20px", margin:"20px 0", top:"5vh", left:'5vw'}} elevation={3}>
                <div>
                    {post.topic === undefined && post.user !== undefined && <p className="usernameP">@{post.user} | {(new Date(post.date._seconds * 1000)).toDateString()}</p>} 
                    {post.topic !== undefined && <p className="topicP">@{post.user} | {post.topic} | {(new Date(post.date._seconds * 1000)).toDateString()}</p>}
                    {post.title !== undefined && post.topic === undefined && <p className="topicP">{(new Date(post.date._seconds * 1000)).toDateString()}</p>} 
                    {post.title !== undefined && <p className="titleP"><b>{post.title}</b></p>} 
                    <div className="innerHTML" dangerouslySetInnerHTML={{__html:post.content}}></div>
                </div>
                <BlogIcons likes={post.likes} saves={post.saves} loggedIn={loggedIn} comments={post.comments.length}
                    liked={liked} saved={saved} handleLike={()=>handleLike(post.doc, !liked)} 
                    handleSave={()=>handleSave(post.doc, !saved)} handleComment={handleComment}/>
            </Paper>
        )
    )
}

function BlogIcons ({likes, saves, loggedIn, liked, saved, comments, handleLike, handleSave, handleComment}) {
    const classes = useStyles();
    return (
        <Grid item>
            <InteractableIcon interacted={liked} disabled={!loggedIn} type="favorite" 
                className={classes.footerIcon} handleInteract={handleLike}/>
            <span className={classes.footerNumber}>{likes}</span>
            <InteractableIcon interacted={saved} disabled={!loggedIn} type="bookmark" 
                className={classes.footerIcon} handleInteract={handleSave}/>
            <span className={classes.footerNumber}>{saves}</span>
            <InteractableIcon interacted={false} disabled={false} type="comment" 
                className={classes.footerIcon} handleInteract={handleComment}/>
            <span className={classes.footerNumber}>{comments}</span>
        </Grid>
    )
}

export default BlogPost;
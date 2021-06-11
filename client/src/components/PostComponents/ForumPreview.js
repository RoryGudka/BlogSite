import {Card, CardContent, makeStyles, Grid } from '@material-ui/core';
import {InteractableIcon, PostContent} from './PostMisc';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(({
    footerIcon: {
        marginRight: 5,
    },
    footerNumber: {
        color: 'gray',
        marginRight: 20,
    },
    forumRoot: {
        width: '50%',
        marginLeft: '25%'
    },
    header: {
        marginBottom: 0,
    },
}));

function ForumPreview ({ForumPost, liked, saved, handleLike, handleSave}) {

    const classes = useStyles();
    return (
        <Card variant="outlined" className={classes.forumRoot} style={{margin:"20px"}}>
            <CardContent>
                <Grid container direction="column">
                    <ForumHeader date={ForumPost.date} topic={"None"}/>
                    <PostContent title={ForumPost.title} content={ForumPost.content}/>
                    <ForumFooter likes={ForumPost.likes} saves={ForumPost.saves} comments={ForumPost.comments} 
                                liked={liked} saved={saved} handleLike={handleLike} handleSave={handleSave} item={ForumPost} />
                </Grid>
            </CardContent>
        </Card>
    );
}

function ForumHeader ({date, topic}) {
    return (
        <Grid item>
            {new Date(date._seconds * 1000).toDateString()} | {topic}
        </Grid>
    );
}

function ForumFooter ({likes, saves, comments, liked, saved, handleLike, handleSave, item}) {
    const history = useHistory();
    const classes = useStyles();
    return (
        <Grid item>
            <InteractableIcon interacted={liked} type="favorite" 
                className={classes.footerIcon} handleInteract={handleLike}/>
            <span className={classes.footerNumber}>{likes}</span>
            <InteractableIcon interacted={saved} type="bookmark" className={classes.footerIcon}
                handleInteract={handleSave}/>
            <span className={classes.footerNumber}>{saves}</span>
            <InteractableIcon interacted={false} type="chatbubble" className={classes.footerIcon}
                handleInteract={()=>history.push('/forum_posts/' + item.doc)}/>
            <span className={classes.footerNumber}>{comments.length} </span>
        </Grid>
    );
}

export default ForumPreview;
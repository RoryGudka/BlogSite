import {Card, CardContent, makeStyles, Grid, IconButton } from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const useStyles = makeStyles(({
    blogRoot: {
        width: '60%',
    },
    blogIcon: {
        marginRight: 10,
    },
    blogBody: {
        width: '80%',
    },
    footerIcon: {
        marginRight: 5,
    },
    footerLink: {
        fontWeight: 'bold',
        color: 'gray',
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
    title: {
        fontSize: 45,
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: 0,
    },
}));

function BlogPreview ({BlogPost}) {
    const classes = useStyles();
    return (
        <Card variant="outlined" className={classes.blogRoot}>
            <CardContent >
                <Grid container justify="space-between">
                    <Grid item className={classes.blogBody}>
                        <Grid container direction="column">
                            <BlogHeader date={BlogPost.date} topic={"None"}/>
                            <PostContent title={BlogPost.title} content={BlogPost.content}/>
                            <BlogFooter/>
                        </Grid>
                    </Grid>
                    <BlogIcons/>
                </Grid>
            </CardContent>
        </Card>
    );
}

function BlogIcons () {
    const classes = useStyles();
    return (
        <Grid item>
            <InteractableIcon interacted={true} type="favorite" className={classes.footerIcon}/>
            <InteractableIcon interacted={true} type="bookmark" className={classes.footerIcon}/>
        </Grid>
    )
}

function BlogHeader ({date, topic}) {
    return (
        <Grid item>
            <Grid container justify="space-around">
                <Grid item>
                    {new Date(date._seconds * 1000).toDateString()} | {topic}
                </Grid>
            </Grid>
        </Grid>
    );
}

function BlogFooter () {
    const classes = useStyles();
    return (
        <Grid item>
            <span className={classes.footerLink}>View comments / more</span>
        </Grid>
    )
}

function ForumPreview ({ForumPost}) {
    const classes = useStyles();
    return (
        <Card variant="outlined" className={classes.forumRoot}>
            <CardContent>
                <Grid container direction="column">
                    <ForumHeader date={"ex"} topic={"None"}/>
                    <PostContent title={ForumPost.title} content={ForumPost.content}/>
                    <ForumFooter likes={ForumPost.likes} saves={ForumPost.saves} comments={ForumPost.comments}/>
                </Grid>
            </CardContent>
        </Card>
    );
}

function ForumHeader ({date, topic}) {
    return (
        <Grid item>
            {date} | {topic}
        </Grid>
    );
}

function ForumFooter ({likes, saves, comments}) {
    const classes = useStyles();
    return (
        <Grid item>
            <InteractableIcon interacted={false} type="favorite" className={classes.footerIcon}/>
            <span className={classes.footerNumber}>{likes}</span>
            <InteractableIcon interacted={false} type="bookmark" className={classes.footerIcon}/>
            <span className={classes.footerNumber}>{saves}</span>
            <InteractableIcon interacted={false} type="chatbubble" className={classes.footerIcon}/>
            <span className={classes.footerNumber}>{comments.length} </span>
        </Grid>
    );
}

function PostContent ({title, content}) {
    const classes = useStyles();
    return (
        <Grid item>
            <Grid container direction="column">
                <Grid item>
                    <h1 className={classes.title}>{title}</h1>
                </Grid>
                <Grid item>
                    <p className={classes.body}>{content}</p>
                </Grid>
            </Grid>
        </Grid>
    );
}

// controlled interactable icon component
function InteractableIcon ({interacted, handlePut, type}) {
    return (
        <IconButton>
            {type==="favorite" ? 
                (interacted ? <FavoriteIcon color="primary"/> : <FavoriteBorderIcon color="primary"/>) :
            type==="bookmark" ? 
                (interacted ? <BookmarkIcon color="primary"/> : <BookmarkBorderIcon color="primary"/>) :
                <ChatBubbleOutlineIcon color="primary"/>
            }
        </IconButton>
    )
}

export {BlogPreview, ForumPreview};
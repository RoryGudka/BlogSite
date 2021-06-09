import {Card, CardContent, makeStyles, Grid } from '@material-ui/core';
import {InteractableIcon, PostContent} from './PostMisc';
import {Link} from 'react-router-dom';

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
    footerNumber: {
        color: 'gray',
        marginRight: 20,
    },
    footerLink: {
        fontWeight: 'bold',
        color: 'gray',
    },
    header: {
        marginBottom: 0,
    },
}));

function BlogPreview ({BlogPost, loggedIn, liked, saved, handleLike, handleSave}) {
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
                    <BlogIcons likes={BlogPost.likes} saves={BlogPost.saves} loggedIn={loggedIn} 
                        liked={liked} saved={saved} handleLike={handleLike} handleSave={handleSave}/>
                </Grid>
            </CardContent>
        </Card>
    );
}

function BlogIcons ({likes, saves, loggedIn, liked, saved, handleLike, handleSave}) {
    const classes = useStyles();
    return (
        <Grid item>
            <InteractableIcon interacted={liked} disabled={!loggedIn} type="favorite" 
                className={classes.footerIcon} handleInteract={handleLike}/>
            <span className={classes.footerNumber}>{likes}</span>
            <InteractableIcon interacted={saved} disabled={!loggedIn} type="bookmark" 
                className={classes.footerIcon} handleInteract={handleSave}/>
            <span className={classes.footerNumber}>{saves}</span>
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
            <Link to="/" className={classes.footerLink}>View comments / more</Link>
        </Grid>
    )
}



export default BlogPreview;
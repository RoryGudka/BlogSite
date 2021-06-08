import {Card, CardContent, makeStyles, Grid } from '@material-ui/core';
import {InteractableIcon, PostContent} from './PostMisc';

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

export default ForumPreview;
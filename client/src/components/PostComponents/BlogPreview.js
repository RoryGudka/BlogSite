import {Card, CardContent, makeStyles, Grid } from '@material-ui/core';
import {InteractableIcon, PostContent} from './PostMisc';

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
                    <BlogIcons likes={BlogPost.likes} saves={BlogPost.saves}/>
                </Grid>
            </CardContent>
        </Card>
    );
}

function BlogIcons ({likes, saves}) {
    const classes = useStyles();
    return (
        <Grid item>
            <InteractableIcon interacted={true} type="favorite" className={classes.footerIcon}/>
            <span className={classes.footerNumber}>{likes}</span>
            <InteractableIcon interacted={true} type="bookmark" className={classes.footerIcon}/>
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
            <span className={classes.footerLink}>View comments / more</span>
        </Grid>
    )
}



export default BlogPreview;
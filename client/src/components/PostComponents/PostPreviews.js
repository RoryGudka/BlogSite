import {Card, CardContent, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(({
    blogRoot: {
        width: '60%',
    },
    blogIcon: {
        marginRight: 10,
    },
    body: {
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
        <Card className={classes.root}>
            <CardContent >
                <Grid container justify="space-between">
                    <Grid item>
                        <Grid container direction="column">
                            <BlogHeader date={BlogPost.date} topic={BlogPost.topic}/>
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
            <span className={classes.blogIcon}>{"<3"}</span>
            <span className={classes.blogIcon}>{"||"}</span>
        </Grid>
    )
}

function BlogHeader ({date, topic}) {
    return (
        <Grid item>
            <Grid container justify="space-around">
                <Grid item>
                    {date} | {topic}
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
        <Card className={classes.forumRoot}>
            <CardContent>
                <Grid container direction="column">
                    <ForumHeader date={ForumPost.date} topic={ForumPost.topic}/>
                    <PostContent title={ForumPost.title} content={ForumPost.content}/>
                    <ForumFooter likes={ForumPost.likes} shares={ForumPost.shares} comments={ForumPost.comments}/>
                </Grid>
            </CardContent>
        </Card>
    );
}

function ForumHeader ({date, topic}) {
    const classes = useStyles();
    return (
        <Grid item>
            {date} | {topic}
        </Grid>
    );
}

function ForumFooter ({likes, shares, comments}) {
    const classes = useStyles();
    return (
        <Grid item>
            <span className={classes.footerIcon}>{"<3"}</span>
            <span className={classes.footerNumber}>{likes}</span>
            <span className={classes.footerIcon}>{"||"}</span>
            <span className={classes.footerNumber}>{shares}</span>
            <span className={classes.footerIcon}>{"<>"}</span>
            <span className={classes.footerNumber}>{comments} </span>
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

export {BlogPreview, ForumPreview};
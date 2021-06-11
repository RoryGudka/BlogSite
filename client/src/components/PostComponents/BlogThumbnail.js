import {useState} from 'react';
import {Card, CardContent, makeStyles, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {InteractableIcon} from './PostMisc';

const useStyles = makeStyles(({
    root: {
        marginBottom: 5,
        width: '100%',
        cursor: 'pointer',
    },
    rootSelected: {
        marginBottom: 5,
        width: '100%',
        cursor: 'pointer',
        background: '#ebfff1',
        borderStyle: 'solid',
        borderColor: '#358f6c',
        borderWidth: 2,
    },
    date: {
        color: 'gray',
        fontSize: 16,
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        marginBottom: 5,
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
    },
    imageContainer: {
        background: 'gray',
        display: 'inline-block',
        width: '100%',
        minHeight: 215,
        alignItems: 'center',
    },
    imagePadding: {
        marginTop: '75%',
    },
    footer: {
        textAlign: 'center',
    },
    footerIcon: {
        marginRight: 5,
        color: 'var(--Secondary)',
    },
    footerText: {
        marginRight: 15,
        color: 'gray',
        display: 'inline-block',
    },
}));

function BlogThumbnail ({BlogPost, liked, saved, selected, handleSelect, loggedIn, handleLike, handleSave}) {
    const [elevated, setElevated] = useState(0);
    const classes = useStyles();
    const history = useHistory();
    return (
        <Card elevation={selected ? 15 : elevated} onMouseEnter={()=>setElevated(10)} onMouseLeave={()=>setElevated(0)} 
            onClick={() => handleSelect()} className={selected ? classes.rootSelected : classes.root}>
            <CardContent >
                <BlogDate date={BlogPost.date} />
                <BlogTitle title={BlogPost.title} />
                {BlogPost.img && <BlogImage image={BlogPost.img}/>}
                <BlogFooter likes={BlogPost.likes} liked={liked} saves={BlogPost.saves} saved={saved} loggedIn={loggedIn}
                    handleLike={handleLike} handleSave={handleSave}/>
            </CardContent>
        </Card>
    );
}

function BlogDate ({date}) {
    const classes = useStyles();
    return (
        <div className={classes.date}>
            {new Date(date._seconds * 1000).toDateString()}
        </div>    
    );
}

function BlogTitle ({title}) {
    const classes = useStyles();
    return (
        <div className={classes.title}>
            {title}
        </div>
    )
}

function BlogImage ({image}) {
    const classes = useStyles();
    return (
        <div className={classes.imageContainer}>
            <div className={classes.imagePadding}/>
            <img className={classes.image} src={image}/>
        </div>
    );
}

function BlogFooter ({likes, liked, saves, saved, loggedIn, handleLike, handleSave}) {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <InteractableIcon type="favorite" interacted={liked} disabled={!loggedIn} handleInteract={(event)=>{
                event.stopPropagation();
                handleLike();
            }}/>
            <div className={classes.footerText}>{likes}</div>
            <InteractableIcon type="bookmark" interacted={saved} disabled={!loggedIn} handleInteract={(event)=>{
                event.stopPropagation();
                handleSave();
            }}/>
            <div className={classes.footerText}>{saves}</div>
        </div>
    );
}



export default BlogThumbnail;
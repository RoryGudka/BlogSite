import {makeStyles, Grid, IconButton} from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const useStyles = makeStyles(({
    body: {
    },
    title: {
        fontSize: 45,
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: 0,
    },
}));

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

export {PostContent, InteractableIcon};
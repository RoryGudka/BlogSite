import {makeStyles, Grid, IconButton} from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {useButtonStyles} from './../../styles/Buttons';

const useStyles = makeStyles(({
    body: {
        maxHeight: 200,
        overflow: 'hidden'
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
                    <div className={classes.body}>
                        <p className={classes.body}>{content}</p>
                        <div style={{
                            position:"absolute",
                            bottom:0,
                            left:0,
                            width:"100%",
                            height:"30%",
                            backgroundImage:"linear-gradient(to top, rgb(255, 255, 255, 1), rgb(255, 255, 255, 0)",
                        }}/>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

// controlled interactable icon component
function InteractableIcon ({interacted, handleInteract, type, disabled=false, size="default"}) {
    const classes = useButtonStyles();
    return (
        <IconButton disabled={disabled} onClick={handleInteract} className={!disabled?classes.secondaryIcon : classes.disabledRoot}>
            {type==="favorite" ? 
                (interacted ? <FavoriteIcon fontSize={size}/> : 
                    <FavoriteBorderIcon fontSize={size} />)
                : type==="bookmark" ? 
                (interacted ? <BookmarkIcon fontSize={size}/> : 
                    <BookmarkBorderIcon fontSize={size}/>) 
                : type==="recent" ?
                (interacted ? <WatchLaterIcon fontSize={size}/> : 
                    <AccessTimeIcon fontSize={size}/>) 
                : <ChatBubbleOutlineIcon fontSize={size}/> 
            }
        </IconButton>
    )
}

export {PostContent, InteractableIcon};
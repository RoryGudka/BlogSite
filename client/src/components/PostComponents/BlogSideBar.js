import { useEffect, useState } from 'react';
import BlogThumbnail from './BlogThumbnail';
import {InteractableIcon} from './PostMisc';
import {useButtonStyles} from './../../styles/Buttons';
import {baseSort} from './../../utils/PostDashControls';
import {Grid, makeStyles, List, ListItem, Button} from '@material-ui/core';

const useStyles = makeStyles({
    sideBarRoot: {
        width: '100%',
    },
    sideBarList: {
        maxHeight: '100%',
        overflow: 'auto',
    },
    sideBarThumbnail: {
        marginBottom: 5,
    },
    sideBarMenu: {
    },
    sortingMenu: {
        paddingRight: 25,
        paddingLeft: 25,
    }
});

function BlogSideBar({posts, liked, saved, selected, setSelected, loggedIn, handleLike, handleSave}) {
    const [visiblePostsIndex, setVisiblePostsIndex] = useState(0);
    const [curSort, setCurSort] = useState("date");
    const [sortedPosts, setSortedPosts] = useState([]);
    const classes = useStyles();
    const VIEWSIZE = 2;

    // handles shifting the view (represented by visiblePostsIndex) in dir (1 === 'next', -1 === 'prev') by increment of VIEWSIZE
    const handleViewShift = (dir) => {
        const newIndex = visiblePostsIndex + dir * VIEWSIZE;
        setVisiblePostsIndex(newIndex);
    }

    const handleSort = (propName) => {
        setVisiblePostsIndex(0);
        setCurSort(propName);
        setSortedPosts(baseSort(posts, propName));
    }

    useEffect(() => {
        console.log('hellooooo');
        setSortedPosts(baseSort(posts, curSort));
    }, [posts]);

    return(
        <Grid container direction="column" className={classes.sideBarRoot}>
            <BlogNavBar curSort={curSort}  handleSort={(propName)=>handleSort(propName)}/>
            <List className={classes.sideBarList}>
                <NavButtons handleViewShift={handleViewShift} atMin={visiblePostsIndex===0} 
                    atMax={visiblePostsIndex+VIEWSIZE >= posts.length}/>
                {sortedPosts.slice(visiblePostsIndex, visiblePostsIndex + VIEWSIZE).map((post, index) => {
                    const ifLiked = liked.findIndex(p => p.doc===post.doc)>-1?true:false;
                    const ifSaved = saved.findIndex(p => p.doc===post.doc)>-1?true:false;
                    return (
                        <ListItem className={classes.sideBarThumbnail}>
                            <BlogThumbnail BlogPost={post} selected={selected===post.doc} 
                                liked={ifLiked} saved={ifSaved} loggedIn={loggedIn}
                                handleSelect={()=>setSelected(post.doc)}
                                handleLike={()=>handleLike(post.doc, !ifLiked)}
                                handleSave={()=>handleSave(post.doc, !ifSaved)}/>
                        </ListItem>
                    );
                })}
                <NavButtons handleViewShift={handleViewShift} atMin={visiblePostsIndex===0} 
                    atMax={visiblePostsIndex+VIEWSIZE >= posts.length}/>
            </List>
        </Grid>
    );
}

function BlogNavBar ({curSort, handleSort}) {
    const classes = useStyles();
    const buttonClasses = useButtonStyles();
    return(
        <Grid container direction="column" className={classes.sideBarMenu}>
            <Grid item>
                <Grid container justify="space-around" className={classes.sortingMenu}>
                    <Grid item>
                        <InteractableIcon size="large" interacted={curSort!=="date"} disabled={curSort==="date"} 
                            type="recent" handleInteract={()=>handleSort("date")}/>
                    </Grid>
                    <Grid item>
                        <InteractableIcon size="large" interacted={curSort!=="likes"} disabled={curSort==="likes"} 
                            type="favorite" handleInteract={()=>handleSort("likes")}/>
                    </Grid>
                    <Grid item>
                        <InteractableIcon size="large" interacted={curSort!=="saves"} disabled={curSort==="saves"} 
                            type="bookmark" handleInteract={()=>handleSort("saves")}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

function NavButtons ({handleViewShift, atMin, atMax}) {
    const buttonClasses = useButtonStyles();
    return (
        <Grid container justify="space-around">
            <Grid item>
                <Button variant="contained" disabled={atMin} className={buttonClasses.primaryRoot} 
                    onClick={()=>handleViewShift(-1)}>Previous</Button>
            </Grid>
            <Grid item>
                <Button variant="contained" disabled={atMax} className={buttonClasses.primaryRoot} 
                    onClick={()=>handleViewShift(1)}>Next</Button>
            </Grid>
        </Grid>
    );
}

export default BlogSideBar;
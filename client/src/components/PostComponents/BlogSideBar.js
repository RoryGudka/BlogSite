import { useEffect, useState } from 'react';
import BlogThumbnail from './BlogThumbnail';
import {InteractableIcon} from './PostMisc';
import {useButtonStyles} from './../../styles/Buttons';
import {baseSort} from './../../utils/PostDashControls';
import Chip from '@material-ui/core/Chip';
import {Grid, makeStyles, List, ListItem, Button} from '@material-ui/core';
import "../../styles/Landing.css";

const useStyles = makeStyles({
    sideBarRoot: {
        width: '100%',
    },
    sideBarThumbnail: {
        marginBottom: 5,
    },
    blogList: {
        height: '100%',
    },
    sideBarMenu: {
        marginBottom: 5,
    },
    unFilledChip: {
        color: "var(--Secondary)",
        borderColor: "var(--Secondary)",
    },
    sortingMenu: {
        paddingRight: 25,
        paddingLeft: 25,
        marginBottom: 10,
    }
});

function BlogSideBar({posts, liked, saved, selected, setSelected, loggedIn, handleLike, handleSave}) {
    const [visiblePostsIndex, setVisiblePostsIndex] = useState(0);
    const [curSort, setCurSort] = useState("date");
    const [sortedPosts, setSortedPosts] = useState([]);
    const classes = useStyles();
    const VIEWSIZE = 3;

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
        setSortedPosts(baseSort(posts, curSort));
    }, [posts]);

    return(
        <Grid container direction="column" className={classes.sideBarRoot}>
            <BlogNavBar curSort={curSort}  handleSort={(propName)=>handleSort(propName)} 
                handleViewShift={handleViewShift} atMin={visiblePostsIndex===0} 
                atMax={visiblePostsIndex+VIEWSIZE >= posts.length}/>
            <div className="blogList">
                <List className={classes.blogList}>
                    {sortedPosts.slice(visiblePostsIndex, visiblePostsIndex + VIEWSIZE).map((post, index) => {
                        const ifLiked = liked.findIndex(p => p===post.doc)>-1?true:false;
                        const ifSaved = saved.findIndex(p => p===post.doc)>-1?true:false;
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
                </List>
            </div>
        </Grid>
    );
}

function BlogNavBar ({curSort, handleSort, handleViewShift, atMin, atMax}) {
    const classes = useStyles();
    const buttonClasses = useButtonStyles();
    return(
        <Grid container direction="column" className={classes.sideBarMenu}>
            <Grid item>
                <Grid container justify="space-around" className={classes.sortingMenu}>
                    <Grid item>
                        <Grid container direction="column">
                            <InteractableIcon size="large" interacted={curSort!=="date"} disabled={curSort==="date"} 
                                type="recent" handleInteract={()=>handleSort("date")}/>
                            <Chip label="Recent" onClick={curSort==="date"?false:()=>handleSort("date")} 
                                variant={curSort==="date"?"outlined":"default"} 
                                className={curSort==="date"?classes.unFilledChip:buttonClasses.secondaryRoot}/>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column">
                            <InteractableIcon size="large" interacted={curSort!=="likes"} disabled={curSort==="likes"} 
                                type="favorite" handleInteract={()=>handleSort("likes")}/>
                            <Chip label="Likes" onClick={curSort==="likes"?false:()=>handleSort("likes")} 
                                variant={curSort==="likes"?"outlined":"default"} 
                                className={curSort==="likes"?classes.unFilledChip:buttonClasses.secondaryRoot}/>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column">
                            <InteractableIcon size="large" interacted={curSort!=="saves"} disabled={curSort==="saves"} 
                                type="bookmark" handleInteract={()=>handleSort("saves")}/>
                            <Chip label="Saves" onClick={curSort==="saves"?false:()=>handleSort("saves")} 
                                variant={curSort==="saves"?"outlined":"default"} 
                                className={curSort==="saves"?classes.unFilledChip:buttonClasses.secondaryRoot}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <NavButtons handleViewShift={handleViewShift} atMin={atMin} atMax={atMax}/>
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
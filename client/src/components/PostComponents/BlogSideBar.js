import { useEffect, useState } from 'react';
import {getPosts, baseSort} from './../../utils/PostDashControls';
import BlogThumbnail from './BlogThumbnail';
import {InteractableIcon} from './PostMisc';
import {useButtonStyles} from './../../styles/Buttons';
import {Grid, makeStyles, List, ListItem, Button} from '@material-ui/core';

const useStyles = makeStyles({
    sideBarRoot: {
        width: '20%',
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
function BlogSideBar() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [visiblePostsIndex, setVisiblePostsIndex] = useState(0);
    const [selected, setSelected] = useState("");
    const [curSort, setCurSort] = useState("date");
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
        setBlogPosts(baseSort(blogPosts, propName));
    }

    useEffect(() => {
        getPosts("blog")
            .then(posts => {
                const newPosts = baseSort(posts, curSort);
                setBlogPosts(newPosts);
                if(selected === "") {
                    setSelected(newPosts[0].doc);
                }
            });
    }, []);

    return(
        <Grid container direction="column" className={classes.sideBarRoot}>
            <BlogNavBar curSort={curSort}  handleSort={(propName)=>handleSort(propName)}/>
            <List className={classes.sideBarList}>
                <NavButtons handleViewShift={handleViewShift} atMin={visiblePostsIndex===0} 
                    atMax={visiblePostsIndex+VIEWSIZE >= blogPosts.length}/>
                {blogPosts.slice(visiblePostsIndex, visiblePostsIndex + VIEWSIZE).map((post, index) => {
                    return (
                        <ListItem className={classes.sideBarThumbnail}>
                            <BlogThumbnail BlogPost={post} selected={selected===post.doc} 
                                handleSelect={()=>setSelected(post.doc)}/>
                        </ListItem>
                    );
                })}
                <NavButtons handleViewShift={handleViewShift} atMin={visiblePostsIndex===0} 
                    atMax={visiblePostsIndex+VIEWSIZE >= blogPosts.length}/>
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
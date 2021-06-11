import { Fragment, useState, useEffect, useContext } from 'react';
import BlogPost from './BlogPost';
import BlogSideBar from './PostComponents/BlogSideBar';
import {UserContext} from './../contexts/UserContextProvider';
import {getPosts, baseSort, syncUserPostInteraction, asyncUserPostInteraction} from './../utils/PostDashControls';
import {likeBlogPost, unlikeBlogPost, saveBlogPost, unsaveBlogPost} from './../utils/BlogPostControls';

const BlogWrapper = props => {
    const [post, setPost] = useState("");
    const [posts, setPosts] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const [likedPosts, setLikedPosts] = useState(user===null?[]:user.blog_posts_liked);
    const [savedPosts, setSavedPosts] = useState(user===null?[]:user.blog_posts_saved);

    const handleLike = (doc, toAdd) => {
        console.log(likedPosts.length);
        syncUserPostInteraction(likedPosts, setLikedPosts, posts, setPosts, doc, toAdd, "likes");
        console.log(likedPosts.length);
        asyncUserPostInteraction(user, setUser, (toAdd ? likeBlogPost : unlikeBlogPost) , doc);
    }

    const handleSave = (doc, toAdd) => {
        syncUserPostInteraction(savedPosts, setSavedPosts, posts, setPosts, doc, toAdd, "saves");
        asyncUserPostInteraction(user, setUser, (toAdd ? saveBlogPost : unsaveBlogPost) , doc);
    }

    useEffect(() => {
        getPosts("blog")
            .then(posts => {
                setPosts(posts);
                if(post === "") {
                    setPost(posts[0].doc);
                }
            });
    }, [user]);

    return (
        <div>
            <div id="sideBar" style={{width:"20%", display:"inline-block", verticalAlign:"top"}}>
                <BlogSideBar posts={posts} liked={likedPosts} saved={savedPosts} 
                    selected={post} setSelected={setPost} loggedIn={user!==null}
                    handleLike={handleLike} handleSave={handleSave}/>
            </div>
            <div style={{width:"70%", display:"inline-block", verticalAlign:"top"}}>
                <BlogPost post={posts.find(p => p.doc === post)} loggedIn={user!==null}
                    liked={likedPosts.findIndex(p => p === post)>-1?true:false} 
                    saved={savedPosts.findIndex(p => p === post)>-1?true:false}
                    handleLike={handleLike} handleSave={handleSave}/>
            </div>
        </div>
    )
}
//post, liked, saved, loggedIn, handleLike, handleSave

export default BlogWrapper;
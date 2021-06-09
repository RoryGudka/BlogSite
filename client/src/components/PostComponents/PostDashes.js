import { useContext, useEffect, useState } from 'react';
import BlogPreview from './BlogPreview';
import ForumPreview from './ForumPreview';
import {getPosts, dateSort, syncUserPostInteraction, asyncUserPostInteraction} from './../../utils/PostDashControls';
import {likeBlogPost, unlikeBlogPost, saveBlogPost, unsaveBlogPost} from './../../utils/BlogPostControls';
import {likeForumPost, unlikeForumPost, saveForumPost, unsaveForumPost} from './../../utils/ForumPostControls';
import {UserContext} from './../../contexts/UserContextProvider';

function BlogDash() {
    const [blogPosts, setBlogPosts] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const [likedPosts, setLikedPosts] = useState(user===null?[]:user.blog_posts_liked);
    const [savedPosts, setSavedPosts] = useState(user===null?[]:user.blog_posts_bookmarked);
    useEffect(() => {
        getPosts("blog")
            .then(posts => {
                console.log(posts);
                const newPosts = dateSort(posts);
                setBlogPosts(newPosts);
            });
    }, []);

    const handleLike = (doc, toAdd) => {
        syncUserPostInteraction(likedPosts, setLikedPosts, blogPosts, setBlogPosts, doc, toAdd, "likes");
        asyncUserPostInteraction(user, setUser, (toAdd ? likeBlogPost : unlikeBlogPost) , doc);
    }

    const handleSave = (doc, toAdd) => {
        syncUserPostInteraction(savedPosts, setSavedPosts, blogPosts, setBlogPosts, doc, toAdd, "saves");
        asyncUserPostInteraction(user, setUser, (toAdd ? saveBlogPost : unsaveBlogPost) , doc);
    }

    return(
        <div>
            {blogPosts.map((post, index) => {
                const liked = likedPosts.findIndex(p => p === post.doc)>-1?true:false;
                const saved = savedPosts.findIndex(p => p === post.doc)>-1?true:false;
                return (
                    <BlogPreview BlogPost={post} loggedIn={user!==null} liked={liked} saved={saved} 
                        handleLike={()=>handleLike(post.doc, !liked)}
                        handleSave={()=>handleSave(post.doc, !saved)}/>
                );
            })}
        </div>
    );
}

function ForumDash() {
    const [forumPosts, setForumPosts] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const [likedPosts, setLikedPosts] = useState(user===null?[]:user.forum_posts_liked);
    const [savedPosts, setSavedPosts] = useState(user===null?[]:user.forum_posts_bookmarked);
    console.log(user);
    useEffect(() => {
        console.log('useEffecting');
        if(user !== null) {
            getPosts("forum", user.username, user.token)
                .then(posts => {
                    setForumPosts(posts);
                });
        }
    }, [user]);

    const handleLike = (doc, toAdd) => {
        syncUserPostInteraction(likedPosts, setLikedPosts, forumPosts, setForumPosts, doc, toAdd, "likes");
        asyncUserPostInteraction(user, setUser, (toAdd ? likeForumPost : unlikeForumPost) , doc);
    }

    const handleSave = (doc, toAdd) => {
        syncUserPostInteraction(savedPosts, setSavedPosts, forumPosts, setForumPosts, doc, toAdd, "saves");
        asyncUserPostInteraction(user, setUser, (toAdd ? saveForumPost : unsaveForumPost) , doc);
    }

    return(
        <div>
            {forumPosts.map((post, index) => {
                const liked = likedPosts.findIndex(p => p === post.doc)>-1?true:false;
                const saved = savedPosts.findIndex(p => p === post.doc)>-1?true:false;
                return (
                    <ForumPreview ForumPost={post} liked={liked} saved={saved}
                        handleLike={()=>handleLike(post.doc, !liked)} 
                        handleSave={()=>handleSave(post.doc, !saved)}/>
                );
            })}
        </div>
    );
}

export {BlogDash, ForumDash};
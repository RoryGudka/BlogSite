import { useContext, useEffect, useState } from 'react';
import BlogPreview from './BlogPreview';
import ForumPreview from './ForumPreview';
import {getPosts, dateSort} from './../../utils/PostDashControls';
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

    return(
        <div>
            {blogPosts.map((post, index) => {
                return (
                    <BlogPreview BlogPost={post} loggedIn={user!==null} 
                    liked={likedPosts.findIndex(p => p === post.doc)>-1?true:false} 
                    saved={savedPosts.findIndex(p => p === post.doc)>-1?true:false}/>
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

    return(
        <div>
            {forumPosts.map((post, index) => {
                return (
                    <ForumPreview ForumPost={post} liked={likedPosts.findIndex(p => p === post.doc)>-1?true:false} 
                    saved={savedPosts.findIndex(p => p === post.doc)>-1?true:false}/>
                );
            })}
        </div>
    );
}

export {BlogDash, ForumDash};
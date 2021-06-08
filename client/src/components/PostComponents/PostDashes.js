import { useContext, useEffect, useState } from 'react';
import {BlogPreview, ForumPreview} from './PostPreviews';
import {UserContext} from './../../contexts/UserContextProvider';

// asyncronously returns all posts of the type provided -- 'blog' or 'forum'
const getPosts = async (type, username = "NA", token = "NA") => {
    console.log("hello");
    const url = new URL("http://localhost:5000/"+type+"_posts/get_all");
    url.searchParams.append("username", username);
    url.searchParams.append("token", token);
    return fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp.status);
            console.log(resp.message);
            return resp.data;
        });
}

function BlogDash() {
    const [blogPosts, setBlogPosts] = useState([]);
    useEffect(() => {
        getPosts("blog")
            .then(posts => {
                setBlogPosts(posts);
            });
    }, []);

    return(
        <div>
            {blogPosts.map((post, index) => {
                return (
                    <BlogPreview BlogPost={post}/>
                );
            })}
        </div>
    );
}

function ForumDash() {
    const [forumPosts, setForumPosts] = useState([]);
    const {user} = useContext(UserContext);
    console.log(user);
    useEffect(() => {
        console.log('useeffecting');
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
                    <ForumPreview ForumPost={post}/>
                );
            })}
        </div>
    );
}

export {BlogDash, ForumDash};
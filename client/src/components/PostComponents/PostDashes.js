import { useContext, useEffect, useState } from 'react';
import BlogPreview from './BlogPreview';
import ForumPreview from './ForumPreview';
import {getPosts, dateSort} from './../../utils/PostDashControls';
import {UserContext} from './../../contexts/UserContextProvider';

function BlogDash() {
    const [blogPosts, setBlogPosts] = useState([]);
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
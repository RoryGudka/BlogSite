import "../styles/Landing.css";
import { useEffect, useState } from 'react';
import {getAllBlogPosts} from '../utils/ServerControl';
import {Link} from 'react-router-dom';

const Landing = props => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        getAllBlogPosts().then(res => {
            setBlogPosts(res);
        })
    }, []);

    let maxLikes = {val:-1, index:-1}
    let maxSaves = {val:-1, index:-1};
    let maxComments = {val:-1, index:-1};
    let mostRecent = {val:{_seconds:(new Date(0)).getTime() / 1000}, index:-1};
    for(let i = 0; i < blogPosts.length; i++) {
        if(blogPosts[i].likes > maxLikes.val) {
            maxLikes.val = blogPosts[i].likes;
            maxLikes.index = i;
        }
        if(blogPosts[i].saves > maxSaves.val) {
            maxSaves.val = blogPosts[i].saves;
            maxSaves.index = i;
        }
        if(blogPosts[i].comments?.length > maxComments.val) {
            maxComments.val = blogPosts[i].comments.length;
            maxComments.index = i;
        }
        if(blogPosts[i].date._seconds > mostRecent.val._seconds) {
            mostRecent.val = blogPosts[i].date;
            mostRecent.index = i;
        }
    }

    const mostRecentHTML = (
        <Link to={`blog_posts/${blogPosts[mostRecent.index]?.doc}`}>
            <div className="magazineItem" style={{width:"63vw", margin:"0.5vw 0.25vw 0.25vw 0"}}>
                <p className="magazineTop">Most recent:</p>
                <p className="magazineMiddle">{blogPosts[mostRecent.index]?.title}</p>
                <p className="magazineBottom">Posted {(new Date(mostRecent.val._seconds * 1000)).toDateString()}</p>
            </div>
        </Link>
    );

    const mostLikesHTML = (
        <Link to={`blog_posts/${blogPosts[maxLikes.index]?.doc}`}>
            <div className="magazineItem" style={{width:"34.5vw", margin:"0.5vw 0 0.25vw 0.25vw"}}>
                <p className="magazineTop">Most popular:</p>
                <p className="magazineMiddle">{blogPosts[maxLikes.index]?.title}</p>
                <p className="magazineBottom">{maxLikes.val} likes</p>
            </div>
        </Link>
    );

    const mostSavesHTML = (
        <Link to={`blog_posts/${blogPosts[maxSaves.index]?.doc}`}>
            <div className="magazineItem" style={{width:"38vw", margin:"0.25vw 0.25vw 0.5vw 0"}}>
                <p className="magazineTop">Most saves:</p>
                <p className="magazineMiddle">{blogPosts[maxSaves.index]?.title}</p>
                <p className="magazineBottom">{maxSaves.val} saves</p>
            </div>
        </Link>
    );

    const mostCommentsHTML = (
        <Link to={`blog_posts/${blogPosts[maxComments.index]?.doc}`}>
            <div className="magazineItem" style={{width:"34vw", margin:"0.25vw 0.25vw 0.5vw 0.25vw"}}>
                <p className="magazineTop">Most comments:</p>
                <p className="magazineMiddle">{blogPosts[maxComments.index]?.title}</p>
                <p className="magazineBottom">{maxComments.val} comments</p>
            </div>
        </Link>
    );

    const shopLink = (
        <Link to='/shop'>
            <div className="magazineItem" style={{width:"25vw", margin:"0.25vw 0 0.5vw 0.25vw"}}>
                <p className="magazineTop">New merch</p>
                <p className="magazineMiddle">Summer collection</p>
            </div>
        </Link>
    );
    return (
        <div style={{textAlign:"center"}}>
            {mostRecentHTML}
            {mostLikesHTML}
            {mostSavesHTML}
            {mostCommentsHTML}
            {shopLink}
        </div>
    )
}

export default Landing;
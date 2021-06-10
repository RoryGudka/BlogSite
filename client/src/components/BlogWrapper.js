import { Fragment, useState } from 'react';
import BlogPost from './BlogPost';
import BlogSideBar from './PostComponents/BlogSideBar';

const BlogWrapper = props => {
    const [post, setPost] = useState("");
    return (
        <Fragment>
            <div id="sideBar" style={{width:"20%", display:"inline-block", verticalAlign:"top"}}>
                <BlogSideBar setPost={setPost} />
            </div>
            <div style={{width:"70%", display:"inline-block", verticalAlign:"top"}}>
                <BlogPost post={post} />
            </div>
        </Fragment>
    )
}

export default BlogWrapper;
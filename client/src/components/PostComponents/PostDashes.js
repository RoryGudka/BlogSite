import {Button} from '@material-ui/core';
import {BlogPreview, ForumPreview} from './PostPreviews'
function BlogDash() {
    return(
        <div>
            <BlogPreview BlogPost={{title: "this is my title text", content: "lorem ipsum and all that",
                                    date: "06/06/21", topic: "example"}}/>
        </div>
    );
}

function ForumDash() {
    return(
        <div>
            <ForumPreview ForumPost={{title: "This is my Title Text", content: "Lorem ipsum and all that",
                                    date: "06/06/21", topic: "Example", likes: 0, shares: 0, comments: 0}}/>
        </div>
    );
}

export {BlogDash, ForumDash};
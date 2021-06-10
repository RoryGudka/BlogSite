import Paper from '@material-ui/core/Paper';
import LSCBar from './LSCBar';
import {useHistory} from 'react-router-dom';
import { useEffect, useState} from 'react';
import { getBlogPost } from '../utils/BlogPostControls';

const BlogPost = ({post}) => {
    const [item, setCurPost] = useState(null);

    useEffect(() => {
        if(post !== '') {
            getBlogPost(post).then(res => {
                setCurPost(res);
            });
        }
    }, [post])

    const history = useHistory();
    const liked = false;
    const saved = false;
    /*const liked = likes.find(p => p.doc === item.doc)
    const saved = saves.find(p => p.doc === item.doc);*/

    const handleClick = () => {
        history.push('/' + item.type + 's/' + item.doc);
    }

    return (
        item !== null && (
            <Paper style={{padding:"20px", margin:"20px 0", top:"5vh", left:'5vw'}} elevation={3}>
                <div>
                    {item.topic === undefined && item.user !== undefined && <p className="usernameP">@{item.user} | {(new Date(item.date._seconds * 1000)).toDateString()}</p>} 
                    {item.topic !== undefined && <p className="topicP">@{item.user} | {item.topic} | {(new Date(item.date._seconds * 1000)).toDateString()}</p>}
                    {item.title !== undefined && item.topic === undefined && <p className="topicP">{(new Date(item.date._seconds * 1000)).toDateString()}</p>} 
                    {item.title !== undefined && <p className="titleP"><b>{item.title}</b></p>} 
                    <div className="innerHTML" dangerouslySetInnerHTML={{__html:item.content}}></div>
                </div>
                <LSCBar item={item} likes={item.likes} saves={item.saves} comments={item.comments.length} liked={liked} saved={saved} />
            </Paper>
        )
    )
}

export default BlogPost;
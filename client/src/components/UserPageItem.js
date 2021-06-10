import Paper from '@material-ui/core/Paper';
import LSCBar from './LSCBar';
import {useHistory} from 'react-router-dom';

const UserPageItem = ({item, likes, saves}) => {
    const history = useHistory();
    const liked = likes.find(p => p.doc === item.doc);
    const saved = saves.find(p => p.doc === item.doc);

    const handleClick = () => {
        history.push('/post/' + item.doc);
    }

    return (
        <Paper style={{padding:"20px", margin:"20px 0"}} elevation={3}>
            <div className="contentWrapper">
                {item.topic === undefined && item.user !== undefined && <p className="usernameP">@{item.user} | {(new Date(item.date._seconds * 1000)).toDateString()}</p>} 
                {item.topic !== undefined && <p className="topicP">@{item.user} | {item.topic} | {(new Date(item.date._seconds * 1000)).toDateString()}</p>}
                {item.title !== undefined && item.topic === undefined && <p className="topicP">{(new Date(item.date._seconds * 1000)).toDateString()}</p>} 
                {item.title !== undefined && <p className="titleP"><b>{item.title}</b></p>} 
                <div className="innerHTML" dangerouslySetInnerHTML={{__html:item.content}}></div>
                <div className="contentCover"></div>
            </div>
            <p className="viewMore" onClick={handleClick}>View full post and comments</p>
            <LSCBar item={item} likes={item.likes} saves={item.saves} comments={item.comments.length} liked={liked} saved={saved} />
        </Paper>
    )
}

export default UserPageItem;
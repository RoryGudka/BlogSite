import Paper from '@material-ui/core/Paper';
import LSCBar from './LSCBar';
import {useHistory} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar'

const CBFItem = ({disabled, item, likes, saves}) => {
    const history = useHistory();
    let liked;
    let saved;
    if(!disabled) {
        liked = Boolean(likes.find(p => {
            console.log(p);
            console.log(item.doc);
            console.log(item);
            return p === item.doc
        }));
        saved = Boolean(saves.find(p => p === item.doc));
    }
    console.log(item);
    console.log(liked);
    console.log(saved);
    console.log(likes);

    const handleClick = () => {
        history.push('/' + item.type + 's/' + item.doc);
    }

    return (
        <Paper style={{padding:"20px", margin:"20px 0"}} elevation={3}>
            <div>
                {item.type !== "blog_post" && (
                    <div style={{display:'inline-block'}}>
                        <Avatar src=''></Avatar>
                    </div>
                )}
                {item.topic === undefined && item.user !== undefined && <p className="usernamePMain">@{item.user} | {(new Date(item.date._seconds * 1000)).toDateString()}</p>} 
                {item.topic !== undefined && <p className="topicPMain">@{item.user} | {item.topic} | {(new Date(item.date._seconds * 1000)).toDateString()}</p>}
                {item.title !== undefined && item.topic === undefined && <p className="datePMain">{(new Date(item.date._seconds * 1000)).toDateString()}</p>} 
                {item.title !== undefined && <p className="titlePMain"><b>{item.title}</b></p>} 
                <div className="innerHTML" dangerouslySetInnerHTML={{__html:item.content}}></div>
            </div>
            <LSCBar disabled={disabled} item={item} likes={item.likes} saves={item.saves} comments={item.comments.length} liked={liked} saved={saved} />
        </Paper>
    )
}

export default CBFItem;
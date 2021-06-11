import React, { useContext } from 'react';
import { TextField, Paper, Button } from '@material-ui/core';
import { addComment } from "../utils/CommentControls";
import { UserContext } from "../contexts/UserContextProvider";

function Comment(props) {
    const {user, setUser} = useContext(UserContext);

    
    const handleSubmit = () => {
        var input = document.getElementById('comment-box').value;

        addComment(props.propsInfo[0], props.propsInfo[1], input, user).then((res) => {
            console.log(res);
            props.propsInfo[2]();
        });
    }

    return (
        <div>
            <Paper style={{left: '4%', width: '80%', padding: '20px 20px 65px 20px', marginBottom: '20px'}}>
                <TextField
                    id="comment-box"
                    label="Add a comment"
                    multiline
                    rows={4}
                    placeholder="Your comment..."
                    variant="outlined"
                    style={{width: '100%'}}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    component="span" 
                    style={{ float: 'right', marginTop: '10px'}}
                    onClick={() => handleSubmit()}>
                    Comment
                </Button>
            </Paper>
        </div>
    )
}

export default Comment

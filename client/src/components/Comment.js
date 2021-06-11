import React, { useContext, useState } from 'react';
import { TextField, Paper, Button } from '@material-ui/core';
import { addComment } from "../utils/CommentControls";
import { UserContext } from "../contexts/UserContextProvider";
import {useStyles} from '../styles/Button';

function Comment(props) {
    const [val, setVal] = useState("");
    const classes = useStyles();
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
            <Paper style={{left: '15%', width: '70%', padding: '20px 20px 65px 20px', marginBottom: '20px'}}>
                <TextField
                    id="comment-box"
                    label="Add a comment"
                    multiline
                    placeholder="Your comment..."
                    variant="outlined"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    style={{width: '100%'}}
                />
                <Button 
                    classes={classes}
                    variant="contained" 
                    color="primary" 
                    component="span" 
                    style={{ float: 'right', marginTop: '10px'}}
                    onClick={() =>{ handleSubmit(); setVal("");}}>
                    Comment
                </Button>
            </Paper>
        </div>
    )
}

export default Comment

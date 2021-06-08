import axios from 'axios';

const getCommentList = (comments, user) => {
    if(comments && comments[0]) {
        return axios
            .get("http://localhost:5000/comments/get_list", {
            params: {
                comments,
                ...user
            },
            })
            .then((res) => {
            if (res.data.status === 200) return res.data.data;
            else {
                alert(res.data.message);
                return false;
            }
            })
            .catch((err) => {
            alert("An error has occurred");
            return false;
        });
    }
    else return new Promise((resolve, reject) => {
        resolve(false);
    });
};

export {getCommentList}
import axios from 'axios';

/**
 * Retrieves a list of comments based on the primary keys specified
 * @param {Array} comments 
 * @param {String} user 
 * @returns 
 */
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

const likeComment = (comment_id, user) => {
    return axios
        .put("http://localhost:5000/comments/like", {
            comment_id,
            ...user,
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

const unlikeComment = (comment_id, user) => {
    return axios
        .put("http://localhost:5000/comments/unlike", {
            comment_id,
            ...user,
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

const saveComment = (comment_id, user) => {
    return axios
        .put("http://localhost:5000/comments/save", {
            comment_id,
            ...user,
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

const unsaveComment = (comment_id, user) => {
    return axios
        .put("http://localhost:5000/comments/unsave", {
            comment_id,
            ...user,
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

/**
 * 
 * @param {String} table one of three values: "blog_posts", "forum_posts", or "comments"
 * @param {String} id id of the post or comment on to comment on
 * @param {String} comment Content to add as a comment
 * @param {*} user user variable
 * @returns 
 */
const addComment = (table, id, comment, user) => {
    return axios
        .post("http://localhost:5000/comments/add", {
            table,
            id,
            ...user,
            comment,
        })
        .then((res) => {
        if (res.data.status === 200) return true;
        else {
            alert(res.data.message);
            return false;
        }
        })
        .catch((err) => {
        alert("An error has occurred");
        return false;
    });
};

export {getCommentList, likeComment, unlikeComment, saveComment, unsaveComment, addComment}
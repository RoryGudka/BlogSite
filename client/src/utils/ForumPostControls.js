import axios from 'axios';

const getForumPost = (primary_key, user) => {
    return axios
        .get("http://localhost:5000/forum_posts/get", {
        params: {
            primary_key,
            ...user,
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
};

const getAllForumPosts = (user) => {
    return axios
        .get("http://localhost:5000/forum_posts/get_all", {
        params: {
            ...user,
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
};

const likeForumPost = (post_id, user) => {
    return axios
        .put("http://localhost:5000/forum_posts/like", {
            post_id,
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

const unlikeForumPost = (post_id, user) => {
    return axios
        .put("http://localhost:5000/forum_posts/unlike", {
            post_id,
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

const saveForumPost = (post_id, user) => {
    return axios
        .put("http://localhost:5000/forum_posts/save", {
            post_id,
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

const unsaveForumPost = (post_id, user) => {
    return axios
        .put("http://localhost:5000/forum_posts/unsave", {
            post_id,
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

export {getForumPost, getAllForumPosts, likeForumPost, unlikeForumPost, saveForumPost, unsaveForumPost};
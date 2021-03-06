import axios from "axios";

/**
 * Retrieves a list of blog posts based on the primary keys specified
 * @param {Array} posts 
 * @param {String} user 
 * @returns 
 */
const getBlogPostList = (posts, user) => {
    if(posts && posts[0]) {
        return axios
            .get("http://localhost:5000/blog_posts/get_list", {
            params: {
                posts,
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

/**
 * Returns all blog posts and alerts any errors that arise - returns false if failed
 * @returns All blog posts : array
 */
 const getAllBlogPosts = () => {
    return axios
        .get("http://localhost:5000/blog_posts/get_all")
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
  
/**
 * Returns a single blog post based on primary_key and alerts any errors that arise - returns false if failed
 * @returns All blog posts : array
 */
const getBlogPost = (primary_key) => {
    return axios
        .get("http://localhost:5000/blog_posts/get", {
        params: {
            primary_key
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

const likeBlogPost = (post_id, user) => {
    return axios
        .put("http://localhost:5000/blog_posts/like", {
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

const unlikeBlogPost = (post_id, user) => {
    return axios
        .put("http://localhost:5000/blog_posts/unlike", {
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

const saveBlogPost = (post_id, user) => {
    return axios
        .put("http://localhost:5000/blog_posts/save", {
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

const unsaveBlogPost = (post_id, user) => {
    return axios
        .put("http://localhost:5000/blog_posts/unsave", {
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

export {getBlogPostList, getAllBlogPosts, getBlogPost, likeBlogPost, unlikeBlogPost, saveBlogPost, unsaveBlogPost}
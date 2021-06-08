import axios from "axios";

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

export {getAllBlogPosts, getBlogPost}
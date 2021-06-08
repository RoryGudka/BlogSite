// asyncronously returns all posts of the type provided -- 'blog' or 'forum'
const getPosts = async (type, username = "NA", token = "NA") => {
    const url = new URL("http://localhost:5000/"+type+"_posts/get_all");
    url.searchParams.append("username", username);
    url.searchParams.append("token", token);
    return fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp.status);
            console.log(resp.message);
            return resp.data;
        });
}

// sorts the given posts (either BlogPost or ForumPost objects) according to their 'date' field -- latest first
const dateSort = (posts) => {
    const newPosts = posts.slice();
    newPosts.sort((post1, post2) => post1.date._seconds < post2.date._seconds ? 1 : -1);
    return newPosts;
}

export {dateSort, getPosts};
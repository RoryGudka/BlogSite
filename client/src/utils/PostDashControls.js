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

const syncUserPostInteraction = (userPostList, setUserPostList, allPostList, setAllPostList, doc, toAdd, interType) => {
    addToUserList(userPostList, setUserPostList, doc, toAdd);
    modifyAllPostList(allPostList, setAllPostList, doc, toAdd, interType);
}

const addToUserList = (userPostList, setUserPostList, doc, toAdd) => {
    if(toAdd) {
        setUserPostList(userPostList.concat([doc]));
    }
    else {
        const newUserPostList = userPostList.slice();
        newUserPostList.splice(newUserPostList.findIndex(post => post === doc), 1);
        setUserPostList(newUserPostList);
    }
}

const modifyAllPostList = (allPostList, setAllPostList, doc, toAdd, interType) => {
    const index = allPostList.findIndex(post => post.doc === doc);
    const newAllPostList = allPostList.slice();
    newAllPostList[index][interType] += (toAdd?1:-1);
    console.log(newAllPostList[index]);
    setAllPostList(newAllPostList);
}

const asyncUserPostInteraction = async (user, setUser, helperFunct, doc) => {
    return;
}

export {dateSort, getPosts, syncUserPostInteraction};
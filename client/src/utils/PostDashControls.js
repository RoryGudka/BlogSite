// asyncronously returns all posts of the type provided -- 'blog' or 'forum'
const getPosts = async (type, username = "NA", token = "NA") => {
    const url = new URL("http://localhost:5000/"+type+"_posts/get_all");
    url.searchParams.append("username", username);
    url.searchParams.append("token", token);
    return fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            return resp.data;
        });
}

// sorts the given posts (either BlogPost or ForumPost objects) according to their 'date' field -- latest first
const dateSort = (posts) => {
    const newPosts = posts.slice();
    newPosts.sort((post1, post2) => post1.date._seconds < post2.date._seconds ? 1 : -1);
    return newPosts;
}

/** performs the local, synchronous aspect of user-post interactions
 * 
 * @param {Array} userPostList - list of posts the user has interacted with ('liked' or 'saved' posts)  
 * @param {Function} setUserPostList - function for setting state for the list of posts user has interacted with 
 * @param {Array} allPostList - array of blog or forum posts
 * @param {Function} setAllPostList - function for setting state for the list of posts user has interacted with
 * @param {String} doc - String representing the docID of the post interacted with
 * @param {Boolean} toAdd - whether the post is to be added to the userPostList (else, to be removed)
 * @param {String} interType - String representing the type of interaction ("saved" or "liked")
 */
const syncUserPostInteraction = (userPostList, setUserPostList, allPostList, setAllPostList, doc, toAdd, interType) => {
    addToUserList(userPostList, setUserPostList, doc, toAdd);
    modifyAllPostList(allPostList, setAllPostList, doc, toAdd, interType);
}

// helper function for adding post to a user list (or removing)
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

// helper function for modifying the allPostList (blog or forum posts)
const modifyAllPostList = (allPostList, setAllPostList, doc, toAdd, interType) => {
    const index = allPostList.findIndex(post => post.doc === doc);
    const newAllPostList = allPostList.slice();
    newAllPostList[index][interType] += (toAdd?1:-1);
    console.log(newAllPostList[index]);
    setAllPostList(newAllPostList);
}

/**
 * 
 * @param {Object} user - the current user interacting with the post
 * @param {Function} setUser - function for setting state of the user object
 * @param {Function} helperFunct - the helper function for handling backend operations
 * @param {String} doc - String representing the docID of the post interacted with
 */
const asyncUserPostInteraction = async (user, setUser, helperFunct, doc) => {
    helperFunct(doc, user).then(newUserData => {
        if(newUserData === false) {
            return false;
        }
        console.log(user);
        console.log(newUserData);
        setUser(newUserData);
        return true;
    });
}

export {dateSort, getPosts, syncUserPostInteraction, asyncUserPostInteraction};
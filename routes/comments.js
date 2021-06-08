module.exports = ({app, db, verifyToken, getAll}) => {
    /**
     * Returns a list of comments based on the ids provided
     */
    app.get("/comments/get_list", (req, res) => {
        if (verifyToken(req.query.username, req.query.token)) {
            db.collection("comments")
            .get()
            .then((resp) => {
                results = getAll(resp);
                let total = [];
                for(let i = 0; i < results.length; i++) {
                    for(let j = 0; j < req.query.comments.length; j++) {
                        if(results[i].doc === req.query.comments[j]) total.push(results[i])
                    }
                }
                res.json({
                    status:200,
                    data:total
                });
            })
            .catch((err) => {
                res.sendStatus(400);
            });
        } else {
            //Catches the case where the token is invalid for the user
            res.json({
                status: 400,
                message: "Invalid token",
            });
        }
    });

    /**
     * Increments the likes on a given comment by one and add the comment to the users liked list
     */
    app.put("/comments/like", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("comments").doc(req.body.comment_id).get().then(resp => {
                db.collection("comments").doc(req.body.comment_id).update({
                    likes:resp.data().likes + 1,
                }).then(resp => {
                    db.collection("users").doc(req.body.user_id).get().then(resp => {
                        const data = resp.data();
                        let comments_liked = [];
                        if(Array.isArray(data.comments_liked)) comments_liked = [...data.comments_liked, req.body.comment_id];
                        else comments_liked = [req.body.comment_id];
                        db.collection("users").doc(req.body.user_id).update({
                            comments_liked
                        }).then(resp => {
                            res.json({
                                status: 200
                            });
                        })
                    })
                })
            })
            .catch((err) => {
                res.sendStatus(400);
            });
        } else {
            //Catches the case where the token is invalid for the user
            res.json({
            status: 400,
            message: "Invalid token",
            });
        }
    });

    /**
     * Decrements the likes on a comment by one and removes it from the users liked list
     */
    app.put("/comments/unlike", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("comments").doc(req.body.comment_id).get().then(resp => {
                db.collection("comments").doc(req.body.comment_id).update({
                    likes:resp.data().likes - 1,
                }).then(resp => {
                    db.collection("users").doc(req.body.user_id).get().then(resp => {
                        let comments_liked = resp.data().comments_liked;
                        const index = comments_liked.findIndex(comment => comment === req.body.comment_id);
                        comments_liked.splice(index, 1);
                        db.collection("users").doc(req.body.user_id).update({
                            comments_liked
                        }).then(resp => {
                            res.json({
                                status: 200
                            });
                        })
                    })
                })
            })
            .catch((err) => {
                res.sendStatus(400);
            });
        } else {
            //Catches the case where the token is invalid for the user
            res.json({
            status: 400,
            message: "Invalid token",
            });
        }
    });

    /**
     * Increments the saves on a given comment by one and add the comment to the users saved list
     */
     app.put("/comments/save", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("comments").doc(req.body.comment_id).get().then(resp => {
                db.collection("comments").doc(req.body.comment_id).update({
                    saves:resp.data().saves + 1,
                }).then(resp => {
                    db.collection("users").doc(req.body.user_id).get().then(resp => {
                        const data = resp.data();
                        let comments_saved = [];
                        if(Array.isArray(data.comments_saved)) comments_saved = [...data.comments_saved, req.body.comment_id];
                        else comments_saved = [req.body.comment_id];
                        db.collection("users").doc(req.body.user_id).update({
                            comments_saved
                        }).then(resp => {
                            res.json({
                                status: 200
                            });
                        })
                    })
                })
            })
            .catch((err) => {
                res.sendStatus(400);
            });
        } else {
            //Catches the case where the token is invalid for the user
            res.json({
            status: 400,
            message: "Invalid token",
            });
        }
    });

    /**
     * Decrements the saves on a comment by one and removes it from the users saved list
     */
    app.put("/comments/unsave", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("comments").doc(req.body.comment_id).get().then(resp => {
                db.collection("comments").doc(req.body.comment_id).update({
                    saves:resp.data().saves - 1,
                }).then(resp => {
                    db.collection("users").doc(req.body.user_id).get().then(resp => {
                        let comments_saved = resp.data().comments_saved;
                        const index = comments_saved.findIndex(comment => comment === req.body.comment_id);
                        comments_saved.splice(index, 1);
                        db.collection("users").doc(req.body.user_id).update({
                            comments_saved
                        }).then(resp => {
                            res.json({
                                status: 200
                            });
                        })
                    })
                })
            })
            .catch((err) => {
                res.sendStatus(400);
            });
        } else {
            //Catches the case where the token is invalid for the user
            res.json({
            status: 400,
            message: "Invalid token",
            });
        }
    });
}
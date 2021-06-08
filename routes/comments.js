module.exports = ({app, db, verifyToken, getAll}) => {
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
                console.log(err);
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
module.exports = ({app, db, verifyToken, getAll}) => {
    app.get("/forum_posts/get", (req, res) => {
        if (verifyToken(req.query.username, req.query.token)) {
            db.collection("forum_posts")
            .doc(req.query.primary_key)
            .get()
            .then((resp) => {
                res.json({
                status: 200,
                data: resp.data(),
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
     * Obtains every forum post if the user is authenticated
     * */ 
    app.get("/forum_posts/get_all", (req, res) => {
        if (verifyToken(req.query.username, req.query.token)) {
          db.collection("forum_posts")
            .get()
            .then((resp) => {
              results = getAll(resp);
              res.json({
                status: 200,
                data: results,
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
      
    
    app.post("/forum_posts/add", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("forum_posts")
            .doc(req.body.data.employee_id)
            .set({
                ...req.body.data,
            })
            .then((resp) => {
                res.json({
                status: 200,
                data: resp,
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
    
    app.put("/forum_posts/edit", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("forum_posts")
            .doc(req.body.primary_key)
            .set({
                ...req.body.data,
            })
            .then((resp) => {
                res.json({
                status: 200,
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
    
    app.delete("/forum_posts/remove", (req, res) => {
        if (verifyToken(req.query.username, req.query.token)) {
            db.collection("forum_posts")
            .doc(req.query.primary_key)
            .delete()
            .then((resp) => {
                res.json({
                status: 200,
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
     * Increments the likes on a given forum post by one and add the post to the users liked list
     */
     app.put("/forum_posts/like", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("forum_posts").doc(req.body.post_id).get().then(resp => {
                db.collection("forum_posts").doc(req.body.post_id).update({
                    likes:resp.data().likes + 1,
                }).then(resp => {
                    db.collection("users").doc(req.body.user_id).get().then(resp => {
                        const data = resp.data();
                        let forum_posts_liked = [];
                        if(Array.isArray(data.forum_posts_liked)) forum_posts_liked = [...data.forum_posts_liked, req.body.post_id];
                        else forum_posts_liked = [req.body.post_id];
                        db.collection("users").doc(req.body.user_id).update({
                            forum_posts_liked
                        }).then(resp => {
                            const {password, ...rest} = data;
                            res.json({
                                status: 200,
                                data:{
                                    ...rest, 
                                    forum_posts_liked, 
                                    token:req.body.token,
                                    user_id:req.body.user_id,
                                }
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
    app.put("/forum_posts/unlike", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("forum_posts").doc(req.body.post_id).get().then(resp => {
                db.collection("forum_posts").doc(req.body.post_id).update({
                    likes:resp.data().likes - 1,
                }).then(resp => {
                    db.collection("users").doc(req.body.user_id).get().then(resp => {
                        const data = resp.data();
                        let forum_posts_liked = data.forum_posts_liked;
                        const index = forum_posts_liked.findIndex(comment => comment === req.body.post_id);
                        forum_posts_liked.splice(index, 1);
                        db.collection("users").doc(req.body.user_id).update({
                            forum_posts_liked
                        }).then(resp => {
                            const {password, ...rest} = data;
                            res.json({
                                status: 200,
                                data:{
                                    ...rest, 
                                    forum_posts_liked, 
                                    token:req.body.token,
                                    user_id:req.body.user_id,
                                }
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
     * Increments the saves on a given forum post by one and add the post to the users saved list
     */
     app.put("/forum_posts/save", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("forum_posts").doc(req.body.post_id).get().then(resp => {
                db.collection("forum_posts").doc(req.body.post_id).update({
                    saves:resp.data().saves + 1,
                }).then(resp => {
                    db.collection("users").doc(req.body.user_id).get().then(resp => {
                        const data = resp.data();
                        let forum_posts_saved = [];
                        if(Array.isArray(data.forum_posts_saved)) forum_posts_saved = [...data.forum_posts_saved, req.body.post_id];
                        else forum_posts_saved = [req.body.post_id];
                        db.collection("users").doc(req.body.user_id).update({
                            forum_posts_saved
                        }).then(resp => {
                            const {password, ...rest} = data;
                            res.json({
                                status: 200,
                                data:{
                                    ...rest, 
                                    forum_posts_saved, 
                                    token:req.body.token,
                                    user_id:req.body.user_id,
                                }
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
    app.put("/forum_posts/unsave", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("forum_posts").doc(req.body.post_id).get().then(resp => {
                db.collection("forum_posts").doc(req.body.post_id).update({
                    saves:resp.data().saves - 1,
                }).then(resp => {
                    db.collection("users").doc(req.body.user_id).get().then(resp => {
                        const data = resp.data();
                        let forum_posts_saved = data.forum_posts_saved;
                        const index = forum_posts_saved.findIndex(comment => comment === req.body.post_id);
                        forum_posts_saved.splice(index, 1);
                        db.collection("users").doc(req.body.user_id).update({
                            forum_posts_saved
                        }).then(resp => {
                            const {password, ...rest} = data;
                            res.json({
                                status: 200,
                                data:{
                                    ...rest, 
                                    forum_posts_saved, 
                                    token:req.body.token,
                                    user_id:req.body.user_id,
                                }
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

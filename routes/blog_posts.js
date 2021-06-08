module.exports = ({app, db, verifyToken, getAll}) => {
    /**
     * Returns an individual blog post
     */
    app.get("/blog_posts/get", (req, res) => {
        db.collection("blog_posts")
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
    });
    
    /**
     * Returns all blog posts created
     */
    app.get("/blog_posts/get_all", (req, res) => {
        db.collection("blog_posts")
        .get()
        .then((resp) => {
            results = getAll(resp);
            res.json({
                status: 200,
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    });

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
     * Increments the likes on a given blog post by one and add the post to the users liked list
     */
     app.put("/blog_posts/like", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("blog_posts").doc(req.body.post_id).get().then(resp => {
                db.collection("blog_posts").doc(req.body.post_id).update({
                    likes:resp.data().likes + 1,
                }).then(resp => {
                    db.collection("users").doc(req.body.user_id).get().then(resp => {
                        const data = resp.data();
                        let blog_posts_liked = [];
                        if(Array.isArray(data.blog_posts_liked)) blog_posts_liked = [...data.blog_posts_liked, req.body.post_id];
                        else blog_posts_liked = [req.body.post_id];
                        db.collection("users").doc(req.body.user_id).update({
                            blog_posts_liked
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
     * Decrements the likes on a blog post by one and removes it from the users liked list
     */
    app.put("/blog_posts/unlike", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("blog_posts").doc(req.body.post_id).get().then(resp => {
                db.collection("blog_posts").doc(req.body.post_id).update({
                    likes:resp.data().likes - 1,
                }).then(resp => {
                    db.collection("users").doc(req.body.user_id).get().then(resp => {
                        let blog_posts_liked = resp.data().blog_posts_liked;
                        const index = blog_posts_liked.findIndex(comment => comment === req.body.post_id);
                        blog_posts_liked.splice(index, 1);
                        db.collection("users").doc(req.body.user_id).update({
                            blog_posts_liked
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
     * Increments the saves on a given blog post by one and add the post to the users saved list
     */
     app.put("/blog_posts/save", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("blog_posts").doc(req.body.post_id).get().then(resp => {
                db.collection("blog_posts").doc(req.body.post_id).update({
                    saves:resp.data().saves + 1,
                }).then(resp => {
                    db.collection("users").doc(req.body.user_id).get().then(resp => {
                        const data = resp.data();
                        let blog_posts_saved = [];
                        if(Array.isArray(data.blog_posts_saved)) blog_posts_saved = [...data.blog_posts_saved, req.body.post_id];
                        else blog_posts_saved = [req.body.post_id];
                        db.collection("users").doc(req.body.user_id).update({
                            blog_posts_saved
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
     * Decrements the saves on a blog post by one and removes it from the users saved list
     */
    app.put("/blog_posts/unsave", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("blog_posts").doc(req.body.post_id).get().then(resp => {
                db.collection("blog_posts").doc(req.body.post_id).update({
                    saves:resp.data().saves - 1,
                }).then(resp => {
                    db.collection("users").doc(req.body.user_id).get().then(resp => {
                        let blog_posts_saved = resp.data().blog_posts_saved;
                        const index = blog_posts_saved.findIndex(comment => comment === req.body.post_id);
                        blog_posts_saved.splice(index, 1);
                        db.collection("users").doc(req.body.user_id).update({
                            blog_posts_saved
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
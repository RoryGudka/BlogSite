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
}
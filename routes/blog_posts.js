module.exports = ({app, db, verifyToken, getAll}) => {
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
}
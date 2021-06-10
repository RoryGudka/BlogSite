module.exports = ({app, db, verifyToken, getAll, generateToken}) => {
    app.get("/merchandise/get", (req, res) => {
        db.collection("merchandise")
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
    
    app.get("/merchandise/get_all", (req, res) => {
        db.collection("merchandise")
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
    });
}
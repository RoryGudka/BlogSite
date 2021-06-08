module.exports = ({app, db, verifyToken, getAll, generateToken}) => {
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
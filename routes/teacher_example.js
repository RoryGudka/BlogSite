module.exports = ({app, db, verifyToken, getAll}) => {
    app.get("/teachers/get", (req, res) => {
        if (verifyToken(req.query.username, req.query.token)) {
            db.collection("teachers")
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
        
    app.get("/teachers/get_all", (req, res) => {
        if (verifyToken(req.query.username, req.query.token)) {
            db.collection("teachers")
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
    
    app.post("/teachers/add", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("teachers")
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
    
    app.put("/teachers/edit", (req, res) => {
        if (verifyToken(req.body.username, req.body.token)) {
            db.collection("teachers")
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
    
    app.delete("/teachers/remove", (req, res) => {
        if (verifyToken(req.query.username, req.query.token)) {
            db.collection("teachers")
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
}

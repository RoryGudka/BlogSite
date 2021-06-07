module.exports = ({app, db, verifyToken, getAll}) => {
    
app.get("/users/get", (req, res) => {
    if (verifyToken(req.query.username, req.query.token)) {
      db.collection("users")
        .get()
        .then((resp) => {
          let results = getAll(resp);
          let newResults = [];
          for (let i = 0; i < results.length; i++) {
            const { password, ...rest } = results[i];
            newResults.push(rest);
          }
          res.json({
            status: 200,
            data: newResults,
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
  
  app.post("/users/add", (req, res) => {
    if (verifyToken(req.body.username, req.body.token)) {
      let { password, ...rest } = req.body.data;
      password = hash(password);
      db.collection("users")
        .add({
          ...rest,
          password,
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
  
  app.put("/users/edit", (req, res) => {
    if (verifyToken(req.body.username, req.body.token)) {
      let { password, ...rest } = req.body.data;
      password = hash(password);
      db.collection("users")
        .doc(req.body.primary_key)
        .set({
          ...rest,
          password,
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
  
  app.delete("/users/remove", (req, res) => {
    if (verifyToken(req.query.username, req.query.token)) {
      db.collection("users")
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
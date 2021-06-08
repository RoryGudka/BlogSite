const hash = require("hash-it");

module.exports = ({app, db, verifyToken, getAll, generateToken}) => {
/**
 * Handles the signup process
 */
 app.post("/signup", (req, res) => {
    db.collection("users")
      .get()
      .then((resp) => {
        const results = getAll(resp);
        //Verifies the user doesn't exist
        if (results.find((user) => user.username === req.body.username)) {
          //Catches the case where the user does exist
          res.json({
            status: 400,
            message: "User already exists",
          });
        } else {
          const token = generateToken({ username: req.body.username });
          //Creates the new user in the database
          db.collection("users")
            .add({
              username: req.body.username,
              password: hash(req.body.password),
              email: req.body.email,
              name: req.body.name
            })
            .then((resp) => {
              //Responds to the client with the token
              res.json({
                status: 200,
                token,
              });
            })
            .catch((err) => {
              console.log(err);
              res.sendStatus(400);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  });
}
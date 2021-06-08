const hash = require("hash-it");

module.exports = ({app, db, verifyToken, getAll, generateToken}) => {
/**
 * Handles the login process
 */
 app.post("/login", (req, res) => {
    db.collection("users")
      .get()
      .then((resp) => {
        const results = getAll(resp);
        //Verifies that the user exists
        if (results.find((user) => user.username === req.body.username)) {
          const result =
            results[
              results.findIndex((user) => user.username === req.body.username)
            ];
          //Checks against the password hash
          if (hash(req.body.password) === result.password) {
            const token = generateToken({ username: req.body.username });
            //Responds to the client with the token
            res.json({
              status: 200,
              data:{
                token,
                name:result.name,
                email:result.email,
                user_id:result.doc
              },
            });
          } else {
            //Catches the case where the password is incorrect
            res.json({
              status: 400,
              message: "Incorrect information",
            });
          }
        } else {
          //Catches the case where the user doesn't exist
          res.json({
            status: 400,
            message: "User doesn't exist",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  });
}
module.exports = ({ app, db, verifyToken, getAll }) => {
  /**
   * Adds an tem to a previously existing cart
   */
  app.put("/cart/add", (req, res) => {
    if (verifyToken(req.body.username, req.body.token)) {
      db.collection("users")
        .doc(req.body.user_id)
        .get()
        .then((resp) => {
          const user = resp.data();
          let newCart;
          if (Array.isArray(user.cart))
            newCart = [...user.cart, req.body.primary_key];
          else newCart = [req.body.primary_key];
          db.collection("users")
            .doc(req.body.user_id)
            .update({
              cart: newCart,
            })
            .then((resp) => {
              const { password, ...rest } = user;
              res.json({
                status: 200,
                data: {
                  ...rest,
                  token: req.body.token,
                  user_id: req.body.user_id,
                  cart: newCart,
                },
              });
            });
        })
        .catch((err) => {
          console.log(err);
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
   * Removes an item from a previously existing cart
   */
  app.put("/cart/remove", (req, res) => {
    if (verifyToken(req.body.username, req.body.token)) {
      db.collection("users")
        .doc(req.body.user_id)
        .get()
        .then((resp) => {
          let user = resp.data();
          user.cart.splice(
            user.cart.findIndex((item) => item === req.body.primary_key),
            1
          );
          db.collection("users")
            .doc(req.body.user_id)
            .get().then(resp => {
                let user = resp.data();
                user.cart.splice(user.cart.findIndex(item => item === req.body.primary_key), 1);
                db.collection('users').doc(req.body.user_id).update({
                    cart:user.cart,
                }).then((resp) => {
                    const {password, ...rest} = user;
                    res.json({
                        status: 200,
                        data:{
                            ...rest, 
                            token:req.body.token,
                            user_id:req.body.user_id,
                            cart:user.cart
                        }
                    });
                })
            })
            .then((resp) => {
              console.log(user);
              const { password, ...rest } = user;
              res.json({
                status: 200,
                data: {
                  ...rest,
                  token: req.body.token,
                  user_id: req.body.user_id,
                  cart: user.cart,
                },
              });
            });
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });
    } else {
      //Catches the case where the token is invalid for the user
      console.log("test");
      res.json({
        status: 400,
        message: "Invalid token",
      });
    }
  });
};

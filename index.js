const express = require("express");
const cors = require("cors");
const app = express();
const hash = require("hash-it");
const jwt = require("jsonwebtoken");
const { db } = require("./firebase.js");
const secret = require("./secret.js");

//Makes sure the bodies of posts are legible
app.use(express.json());
app.use(cors());

//Local token list initiation
const tokens = {};

/**
 * Returns a new JWT for the user to authenticate itself with every request instead of a password
 * @param {Object} user
 * @returns token
 */
const generateToken = (user) => {
  //Expires in 1 hour
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: user.username,
    },
    secret
  );
  //Adds the token to the local list
  tokens[user.username] = token;
  return token;
};

app.get("/students/arr", async (req, res) => {
  const studentsRef = db.collection("students");
  const snapshot = await studentsRef.get();
  const a = [];
  snapshot.forEach((doc) => {
    //console.log(doc.data);
    a.push(doc.data());
  });
  //console.log(a);
  res.send(a);
});

app.post("/students/grade", async (req, res) => {});

/*
Need to make each student's firestore id = their student_id
*/ /*
app.delete("/student/remove", async (req, res) => {
	const c = req.body.class;
	r = await db.collection("students").doc(req.body.id).delete();
	res.sendStatus(200);
});
*/

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(hash(req.body));
});

app.get("/students", async (req, res) => {
  const snapshot = await db.collection("students").get();

  console.log(snapshot.docs);
  res.json(snapshot.docs);
});

app.get("/teachers", async (req, res) => {
  const snapshot = await db.collection("teachers").get();

  console.log(snapshot.docs);
  res.json(snapshot.docs);
});

/**
 * Verifies that the token is unaltered and matches the user
 * @param {String} uid
 * @param {String} token
 * @returns verified
 */
const verifyToken = (username, token) => {
  try {
    jwt.verify(token, secret);
    return tokens[username] === token;
  } catch (e) {
    return false;
  }
};

/**
 * Returns all results from a query snapshot of a collection
 * @param {Object} querySnapshot
 * @returns results
 */
const getAll = (querySnapshot) => {
  let all = [];
  querySnapshot.forEach((doc) => {
    all.push({ doc: doc.id, ...doc.data() });
  });
  return all;
};

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
          })
          .then((resp) => {
            //Responds to the client with the token
            res.json({
              status: 200,
              token,
            });
          })
          .catch((err) => {
            res.sendStatus(400);
          });
      }
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

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
            token,
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

app.get("/students/get", (req, res) => {
  if (verifyToken(req.query.username, req.query.token)) {
    db.collection("students")
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

app.get("/students/get_all", (req, res) => {
  if (verifyToken(req.query.username, req.query.token)) {
    db.collection("students")
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

app.post("/students/add", (req, res) => {
  if (verifyToken(req.body.username, req.body.token)) {
    db.collection("students")
      .doc(req.body.data.student_id)
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

app.put("/students/edit", (req, res) => {
  if (verifyToken(req.body.username, req.body.token)) {
    db.collection("students")
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

app.delete("/students/remove", (req, res) => {
  if (verifyToken(req.query.username, req.query.token)) {
    db.collection("students")
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

app.get("/classes/get", (req, res) => {
  if (verifyToken(req.query.username, req.query.token)) {
    db.collection("classes")
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

app.get("/classes/get_all", (req, res) => {
  if (verifyToken(req.query.username, req.query.token)) {
    db.collection("classes")
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
  } else {
    //Catches the case where the token is invalid for the user
    res.json({
      status: 400,
      message: "Invalid token",
    });
  }
});

app.post("/classes/add", (req, res) => {
  if (verifyToken(req.body.username, req.body.token)) {
    db.collection("classes")
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

app.put("/classes/edit", (req, res) => {
  if (verifyToken(req.body.username, req.body.token)) {
    db.collection("classes")
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

app.delete("/classes/remove", (req, res) => {
  if (verifyToken(req.query.username, req.query.token)) {
    db.collection("classes")
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

app.get("/events/get_all", (req, res) => {
  if (verifyToken(req.query.username, req.query.token)) {
    db.collection("events")
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

app.post("/events/add", (req, res) => {
  if (verifyToken(req.body.username, req.body.token)) {
    db.collection("events")
      .add({
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

app.put("/events/edit", (req, res) => {
  if (verifyToken(req.body.username, req.body.token)) {
    db.collection("events")
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

app.delete("/events/remove", (req, res) => {
  if (verifyToken(req.query.username, req.query.token)) {
    db.collection("events")
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

/**
 * Initiates the server
 */
app.listen(3001, () => {
  console.log("Server started on port 3001");
});

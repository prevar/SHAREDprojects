const express = require("express");
const app = express();
const admin = require("./admin");
var cors = require("cors");
var dal = require("./dal.js");

app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => res.send("navigate to URL/login.html!"));

/**
 * verifyIdToken - used to verify if the token in the header is valid
 * @param {Request} req
 * @param {Response} res
 */
function verifyIdToken(req, res) {
  const idToken = req.headers.authorization;
  console.log("header:", idToken);

  if (!idToken) {
    console.log("in no token in header");
    res.status(401).send("No valid token in header");
    throw new Error('Authorization failed');
  }
  //verify token
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function (decodedToken) {
      console.log("decodedToken:", decodedToken);
      res.status(200).send("Authentication success!");
    })
    .catch(function (error) {
      console.log("error", error);
      res.status(500).send("Authentication error");
    });
}

/**
 * create user account - First check if user email exists . If it does, give error else create.
 */
app.get(
  "/account/create/:name/:email/:uid/:roles/:userEmail",
  function (req, res) {
    let updatedUser = null;

    try {
      //verifyIdToken(req,res)
      //if (res.status == 200) {

      //check if account exists
      dal.find(req.params.email).then((user) => {
        // if user exists, return error message
        if (user.length > 0) {
          console.log("User already exists" + JSON.stringify(user));
          throw new Error("Useer already exists");
        } else {
          // else create user
          const createduser = dal.create(
            req.params.name,
            req.params.email,
            req.params.uid,
            req.params.roles
          );
          if (createduser) {
            const history = {
              operation: "New User created",
              operand: req.params.name,
            };
            updatedUser = dal.updateUserHistory(req.params.userEmail, history);
          }
          res.send(updatedUser);
        }
      });
      //}
    } catch (err) {
      console.log("ERROR - encountered in calling create");
      res.status(500).send("Internal server error: " + err);
    }
  }
);

/**
 * Find user by email
 */
app.get("/account/find/:email", function (req, res) {
  try {
    // check if account exists
    dal.find(req.params.email).then((user) => {
      // if user exists, return error message
      if (user.length <= 0) {
        console.log("in find - No User with this email exists");
        res.send({});
      } else {
        // else user exists
        console.log("in find - user exists");
        res.send(user);
      }
    });
  } catch (err) {
    console.log("ERROR encoutnered in calling find" + err);
    res.status(500).send("Internal server error: " + err);
  }
});

/**
 * Find All Users
 */
app.get("/account/findAll", function (req, res) {
  try {
    dal.findAll().then((users) => {
      if (users.length <= 0) {
        res.send({});
      } else {
        console.log("in findAll - Num of user" + users.length);
        res.send(users);
      }
    });
  } catch (err) {
    console.log("error encoutnered in calling find" + err);
    res.status(500).send("Internal server error: " + err);
  }
});

/**
 * Update the balance of the user with the specified email and then add transaction to history
 */
app.get("/account/updateBalance/:email/:changedAmt", async function (req, res) {
  try {
    const result = await dal.update(
      req.params.email,
      parseFloat(req.params.changedAmt)
    );
    let depositOrWith =
      parseFloat(req.params.changedAmt) > 0
        ? "Amount Deposited"
        : "Amount Withdrawn";

    const history = {
      operation: depositOrWith,
      operand: req.params.changedAmt,
    };
    const updatedUser = await dal.updateUserHistory(req.params.email, history);
    res.send(updatedUser);
  } catch (err) {
    console.log("error encoutnered in calling update");
    res.status(500).send("Internal server error" + err);
  }
});

/**
 * Transfer specified amount from specified fromUser to toUser . Also add history transactions to fromUser, toUser and the user who made the transfer.
 */
app.get(
  "/account/transfer/:adminUserEmail/:fromEmail/:toEmail/:changedAmt",
  async function (req, res) {
    const amt = parseFloat(req.params.changedAmt);
    try {
      //First debit the amount in the fromUsers account and then credit it to the toUser
      const withdrawResult = await dal.update(req.params.fromEmail, -amt);
      const depositResult = await dal.update(req.params.toEmail, amt);

      //Update transaction history of fromUser
      const fromHistory = {
        operation: "Amount Withdrawn",
        operand: -amt,
      };
      const updatedFromUser = await dal.updateUserHistory(
        req.params.fromEmail,
        fromHistory
      );

      //Update transaction history of toUser
      const toHistory = {
        operation: "Amount deposited",
        operand: amt,
      };
      const updatedToUser = await dal.updateUserHistory(
        req.params.toEmail,
        toHistory
      );

      //Update transaction history of ADMIN user doing the transaction
      const transferHistory = {
        operation: "Amount Transferred",
        operand: amt,
      };
      const updatedTransferUser = await dal.updateUserHistory(
        req.params.adminUserEmail,
        transferHistory
      );

      res.status(200).send(updatedTransferUser);
    } catch (err) {
      console.log("ERROR encoutnered in calling update" + err);
      res.status(500).send("Internal server error" + err);
    }
  }
);

app.listen(3001, () => {
  console.log("Running on port 3001");
});

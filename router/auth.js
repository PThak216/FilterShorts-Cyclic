const express = require("express");
const router = express.Router();
require("../DB/conn");
const authenticate = require("../Middleware/Authenticate");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const Pusher = require("pusher");
const mongoose = require("mongoose");
const videolist = require("../Model/uploadShema");

const pusher = new Pusher({
  appId: "1457455",
  key: "9a3da9bd7e04a4f72162",
  secret: "ab5ae3236200a450904d",
  cluster: "ap2",
  useTLS: true,
});
const db = mongoose.connection;
db.once("open", () => {
  const msgCollection = db.collection("posts");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("mainvideos", "inserted", {
        id: messageDetails.id,
      });
    } else if (change.operationType === "update") {
      const messageDetails = change.fullDocument;
      pusher.trigger("likeupdter", "updated", {
        Likes: messageDetails,
      });
    } else if (change.operationType === "delete") {
      const messageDetails = change.fullDocument;
      pusher.trigger("deletedata", "deleted", {
        _id: messageDetails,
      });
    } else {
      console.log("Error Pushing");
    }
  });
});

const dbn = mongoose.connection;
dbn.once("open", () => {
  const msgCollection = db.collection("registers");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "update") {
      const followingDetails = change.fullDocument;
      pusher.trigger("updatingFollow", "updated", {
        following: followingDetails,
      });
    } else {
      console.log("Error Pushing");
    }
  });
});

router.get("/home", authenticate, async (req, res) => {
  return res.json(req.rootUser);
});

module.exports = router;

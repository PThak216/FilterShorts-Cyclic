const express = require("express");
const router = express.Router();
require("../DB/conn");
const User = require("../Model/userShema");
const authenticate = require("../Middleware/Authenticate");
const videolist = require("../Model/uploadShema");

router.post("/upload_video_details", authenticate, async (req, res) => {
  const { t_id, caption, url, display, catogory } = req.body;
  try {
    const videos = new videolist({
      id: t_id,
      caption,
      email: req.rootUser.email,
      username: req.rootUser.username,
      video: url,
      name: req.rootUser.name,
      Likes: [],
      profilepicimage: req.rootUser.profilepicimage,
      display,
      catogory,
    });
    await videos.save();
    res.status(210).json({ message: "Registration Success" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/allposts", async (req, res) => {
  try {
    const listOne = await videolist.find();
    if (listOne) {
      return res.json(listOne);
    } else console.log(Error);
  } catch (err) {
    console.log(err);
  }
});

router.post("/likevalue", authenticate, async (req, res) => {
  const { item_id } = req.body;
  try {
    const userNew = await videolist.updateOne(
      { id: item_id },
      {
        $push: {
          Likes: req.rootUser.email,
        },
      }
    );
    res.status(210).json({ message: "Registration Success" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/unlikevalue", authenticate, async (req, res) => {
  const { item_id } = req.body;

  try {
    const userNew = await videolist.updateOne(
      { id: item_id },
      {
        $pull: {
          Likes: req.rootUser.email,
        },
      }
    );
    res.status(210).json({ message: "Registration Success" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/bookmarks", authenticate, async (req, res) => {
  const { item_id } = req.body;

  try {
    const userNew = await User.updateOne(
      { username: req.rootUser.username },
      {
        $push: {
          bookmark: item_id,
        },
      }
    );
    res.status(210).json({ message: "Success" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/removebookmarks", authenticate, async (req, res) => {
  const { item_id } = req.body;
  try {
    const userNew = await User.updateOne(
      { username: req.rootUser.username },
      {
        $pull: {
          bookmark: item_id,
        },
      }
    );
    res.status(210).json({ message: " Success" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/deletedata", authenticate, async (req, res) => {
  const { item_id } = req.body;

  try {
    const userNew = await videolist.findOneAndDelete({ id: item_id });
    res.status(210).json({ message: "DELETE Success" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

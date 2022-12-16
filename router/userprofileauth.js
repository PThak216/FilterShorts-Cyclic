const express = require("express");
const router = express.Router();
require("../DB/conn");
const User = require("../Model/userShema");
const authenticate = require("../Middleware/Authenticate");
const videolist = require("../Model/uploadShema");

router.get("/userProfile/:username", authenticate, async (req, res) => {
  const userpro = await User.findOne({ username: req.params.username });

  try {
    if (userpro) {
      return res.json({ user: userpro });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/follow", authenticate, async (req, res) => {
  const { fusername } = req.body;
  try {
    const userNew = await User.findOneAndUpdate(
      { username: fusername },
      {
        $push: {
          followers: req.rootUser.username,
        },
      }
    );

    const userNeww = await User.findOneAndUpdate(
      { username: req.rootUser.username },
      {
        $push: {
          following: fusername,
        },
      }
    );

    res.status(210).json({ message: "Followed" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/unfollow", authenticate, async (req, res) => {
  const { unfusername } = req.body;
  try {
    const userNew = await User.findOneAndUpdate(
      { username: unfusername },
      {
        $pull: {
          followers: req.rootUser.username,
        },
      }
    );
    const userNeww = await User.findOneAndUpdate(
      { username: req.rootUser.username },
      {
        $pull: {
          following: unfusername,
        },
      }
    );
    res.status(210).json({ message: "unFollowed" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/updateprofileDetails", authenticate, async (req, res) => {
  const { name, bio } = req.body;
  const listOne = await User.find({ username: req.rootUser.username });
  if (listOne) {
    try {
      const userNew = await User.findOneAndUpdate(
        { username: req.rootUser.username },
        {
          name: name,
          Bio: bio,
        }
      );

      const userNeww = await videolist.updateMany(
        { username: req.rootUser.username },
        {
          name: name,
        }
      );

      res.status(210).json({ message: "Registration Success" });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("notfound");
  }
});

router.post("/updateprofilepic", authenticate, async (req, res) => {
  const { name, bio, url } = req.body;
  const listOne = await User.find({ username: req.rootUser.username });
  if (listOne) {
    try {
      const userNew = await User.findOneAndUpdate(
        { username: req.rootUser.username },
        {
          profilepicimage: url,
          name: name,
          Bio: bio,
        }
      );

      const userNeww = await videolist.updateMany(
        { username: req.rootUser.username },
        {
          profilepicimage: url,
          name: name,
        }
      );

      res.status(210).json({ message: "Registration Success" });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("notfound");
  }
});

router.get("/connect", authenticate, async (req, res) => {
  try {
    const listOne = await User.find();

    if (listOne) {
      return res.json(listOne);
    } else console.log(Error);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;

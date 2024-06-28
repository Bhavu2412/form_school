const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const User = require("../models/users");
const Form = require("../models/form");
const Client = require("../models/client");
const bcrypt = require("bcrypt");
const multer = require("multer");
const isAuth = require("../utils/isAuth");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddej2sdnm",
  api_key: "922999157567341",
  api_secret: "cRKqrFP_cM92NdZCQ3Lwtt05tLI",
});
async function uploadToCloudinary(filePath, tags) {
  try {
    const result = await cloudinary.uploader.upload(filePath, { tags });
    return { url: result.secure_url, error: null };
  } catch (error) {
    return { url: null, error };
  }
}
const upload = multer({ dest: "uploads/" });
router.post("/signup", upload.single("image"), async (req, res) => {
  const { email, name, username, password } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    if (!image) {
      return res.status(400).json({ message: "Image not provided." });
    }

    const { url: imageUrl, error } = await uploadToCloudinary(
      image,
      "profile_users"
    );

    if (error) {
      return res
        .status(400)
        .json({ message: "Image upload failed. Please try again." });
    }

    let client = await Client.findOne({ email: email });
    if (client) {
      return res
        .status(300)
        .json({ message: "Found a client with same email!" });
    }
    let clt = await Client.findOne({ username: username });
    if (clt) {
      return res
        .status(300)
        .json({ message: "Found a client with same username!" });
    }
    const hashPass = await bcrypt.hash(password, 12);
    if (!hashPass) {
      return res.status(400).json({ message: "Hash not generated" });
    }

    client = new Client({
      name: name,
      email: email,
      username: username,
      password: hashPass,
      image: imageUrl,
    });
    await client.save();
    const token = jwt.sign(
      {
        userId: client._id,
      },
      "bhavu2412",
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Client Signup Successful!",
      token: token,
      imageUrl: imageUrl,
      userRole: "client",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Internal Server Error. Please try again later" });
  }
});

router.post("/login", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await Client.findOne({ email: username });

    if (!user) {
      return res.status(404).json({ message: "No User found!" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).json({ message: "Password does not match" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      "bhavu2412",
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Client login successful!",
      user: user.name,
      token: token,
      userRole: "client",
      ImageUrl: user.image,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again." });
  }
});
router.delete("/remove", isAuth, async (req, res) => {
  const { userId } = req.user;

  try {
    const client = await Client.findById(userId);
    if (!client) {
      return res.status(404).json({ message: "Client not found!" });
    }
    await Form.updateMany({}, { $pull: { client: userId } });
    await User.updateMany({}, { $pull: { client: userId } });
    const response = await Client.deleteOne({ _id: userId });
    res.status(200).json({
      message: "Client deleted successfully",
      response: response,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error. Please try again later",
      error: err,
    });
  }
});
router.post("/fetch", isAuth, async (req, res, next) => {
  const { code } = req.body;
  const { userId } = req.user;

  try {
    const form = await Form.findOne({ code: code });
    if (!userId) {
      return res.status(404).json({
        message: `No user found please come after login`,
      });
    }
    if (!form) {
      return res.status(404).json({
        message: `Form with code ${code} not found or deleted by Owner!`,
      });
    }
    res.status(200).json({ message: "Form found successfull", form: form });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});
router.post("/fill", isAuth, async (req, res, next) => {
  const { code, answers } = req.body;
  const { userId } = req.user;
  try {
    const form = await Form.findOne({ code: code });
    if (!form) {
      return res.status(404).json({
        message: `Form with code ${code} not found or deleted by Owner!`,
      });
    }
    const client = await Client.findById(userId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    let correctAnswers = 0;
    form.questions.forEach((que, index) => {
      if (que.answer === answers[index]) {
        correctAnswers++;
      }
    });
    const performance = (correctAnswers / form.questions.length) * 100;
    client.forms.push({
      form: form._id,
      answers: answers,
      performance: performance,
    });
    await client.save();
    await Form.updateOne({ _id: form._id }, { $push: { client: client._id } });
    await User.updateOne({ _id: form.user }, { $push: { client: client._id } });
    res
      .status(200)
      .json({ message: "Form filled successfully!", performance: performance });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});
router.post("/analyse", isAuth, async (req, res, next) => {
  const { userId } = req.user;
  try {
    const client = await Client.findById(userId);
    if (!client) {
      return res.status(404).json({ message: "No client found!" });
    }
    const formIds = client.forms.map((form) => form.form);

    const forms = await Form.find({ _id: { $in: formIds } });
    res.status(200).json({ message: "Forms found", forms: forms });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error occurred. Please try again later.",
    });
  }
});
module.exports = router;

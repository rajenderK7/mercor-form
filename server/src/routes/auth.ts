import express from "express";
import User from "../models/user";
import bcryptjs from "bcryptjs";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("invalid credentials");
    }
    const userDB = await User.findOne({ email: email });
    if (userDB) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = await bcryptjs.hash(
      password,
      parseInt(process.env.SALT!)
    );
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "success" });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("invalid credentials");
    }
    const userDB = await User.findOne({ email });
    if (!userDB) {
      throw new Error("user does not exist");
    }
    const correctPassword = await bcryptjs.compare(password, userDB.password);
    if (!correctPassword) {
      return res
        .status(400)
        .json({ message: "username or password are incorrect" });
    }
    const user = {
      name: userDB.name,
      email: userDB.email,
      userId: userDB._id,
    };
    res.status(200).json({ message: "success", user });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

export default router;

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

//encrypt & decrypt password
const algorithm = "aes-256-cbc";
const key = crypto.createHash("sha256").update(process.env.JWT_SECRET).digest();
const iv = Buffer.alloc(16, 0);

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(text) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

//connection to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const passwordSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  site: String,
  username: String,
  password: String,
  userId: mongoose.Schema.Types.ObjectId, // 👈 ADD THIS
});

const Password = mongoose.model("Password", passwordSchema);

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id: ... }

    next();
  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// signup user
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// login user
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET, // later move to .env
      { expiresIn: "1d" },
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all documents
app.get("/api/passwords", authMiddleware, async (req, res) => {
  const data = await Password.find({ userId: req.user.id });

  const decryptedData = data.map((item) => {
    const obj = item.toObject();

    return {
      ...obj,
      password: decrypt(obj.password), // 🔥 MUST decrypt here
    };
  });

  res.json(decryptedData);
});

// save a password
app.post("/api/passwords", authMiddleware, async (req, res) => {
  const encryptedPassword = encrypt(req.body.password);

  const newPassword = new Password({
    ...req.body,
    password: encryptedPassword, //  ENCRYPT HERE
    userId: req.user.id,
  });

  await newPassword.save();
  res.json(newPassword);
});

//update password
app.put("/api/passwords/:id", authMiddleware, async (req, res) => {
  const encryptedPassword = encrypt(req.body.password);

  const updated = await Password.findOneAndUpdate(
    { id: req.params.id, userId: req.user.id },
    { ...req.body, password: encryptedPassword }, //  ENCRYPT HERE
    { new: true },
  );

  res.json(updated);
});

//delete a password
app.delete("/api/passwords/:id", authMiddleware, async (req, res) => {
  await Password.findOneAndDelete({
    id: req.params.id,
    userId: req.user.id,
  });

  res.json({ message: "Deleted" });
});

app.listen(3000,"0.0.0.0", () => {
  console.log(`Example app listening on port 3000`);
});

// console.log(process.env.MONGO_URI);

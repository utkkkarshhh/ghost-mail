const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");

exports.registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validate request data
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res
      .status(200)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect username" });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect password" });
    }

    // Generate access token
    const accessToken = jwt.sign(
      {
        username: user.username,
        name: user.name,
        tokenVersion: user.tokenVersion,
      },
      "Johnny Johnny Yes Papa",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { username } = req.body;
  try {
    // Find and delete user by username
    const deletedUser = await User.findOneAndDelete({ username });
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, error: "User account not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User account deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.logoutUser = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getUserInformation = async (req, res) => {
  const { decodedData } = req.query;
  console.log(decodedData);
  try {
    const { username } = decodedData;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "User account not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.updateUserInformation = async (req, res) => {
  const { decodedData } = req.query;
  const { name, dob, gender, image } = req.body;

  console.log("user id: " + decodedData.username);
  console.log("user info: ", image);

  try {
    const user = await User.findOne({ username: decodedData.username });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (image && typeof image === "string" && image.startsWith("data:image")) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      user.image = buffer;
    } else if (image) {
      user.image = image;
    }

    // Update other fields
    if (name) user.name = name;
    if (dob) user.dob = dob;
    if (gender) user.gender = gender;

    await user.save();

    if (image && image.length > MAX_IMAGE_SIZE_IN_BYTES) {
      return res
        .status(413)
        .json({ message: "Image too large", error: "Image too large" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error updating user information:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

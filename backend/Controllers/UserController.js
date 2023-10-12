import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, number, password } = req.body.userData;

    if (!firstName || !lastName || !email || !number || !password)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const isEmailExists = await UserModel.find({ email });

    if (isEmailExists?.length)
      return res.status(404).json({
        success: false,
        message: "This email already exists, try different one!",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      number,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Registered Successfully!",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body.userData;

    if (!email || !password)
      return res
        .status(404)
        .json({ success: false, message: "Please fill all the fields!" });

    const user = await UserModel.findOne({ email });

    if (user?.email) {
      const isPasswordRight = await bcrypt.compare(password, user.password);
      if (isPasswordRight) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        const userObj = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          number: user.number,
        };

        return res.status(200).json({
          success: true,
          message: "Login Successfull!",
          token,
          user: userObj,
        });
      }

      return res
        .status(404)
        .json({ success: false, message: "Password is wrong!" });
    }

    return res
      .status(404)
      .json({ success: false, message: "Invalid credentials!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      const userObj = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        number: user.number,
      };

      return res.status(200).json({ success: true, user: userObj });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const newUserProfileDetails = async (req, res) => {
  try {
    const { bioData, coverImg, profileImg, token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { bioData, profileImg, coverImg },
      { new: true }
    );
    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "Saved yout profile!" });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfileDetails = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      return res.status(200).json({
        success: true,
        bioData: user.bioData,
        profileImg: user.profileImg,
        coverImg: user.coverImg,
      });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

export const sendFriendRequest = async (req, res) => {
  try {
    const { token, friendId } = req.body;

    if (!token || !friendId)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedData?.userId;
    const user = await UserModel.findById(userId);

    if (user) {
      const friendUser = await UserModel.findById(friendId);

      if (friendUser) {
        let flag = false;
        for (let i = 0; i < friendUser?.friendRequests?.length; i++) {
          if (friendUser.friendRequests[i].includes(user._id)) {
            flag = true;
          }
        }

        if (flag == false) {
          friendUser.friendRequests.push(user._id);
          user.sentRequests.push(friendId);
          await user.save();
          await friendUser.save();
          return res.status(200).json({
            success: true,
            message: `Request sent to ${friendUser?.firstName} ${friendUser?.lastName}`,
            isRequest: true,
          });
        }

        const removeFriendReq = friendUser.friendRequests.filter(
          (item) => item != user._id
        );
        friendUser.friendRequests = removeFriendReq;

        const removeSentReq = user.sentRequests.filter(
          (item) => item != friendId
        );
        user.sentRequests = removeSentReq;

        await friendUser.save();
        await user.save();
        return res.status(200).json({
          success: true,
          message: `Cancelled request to ${friendUser?.firstName} ${friendUser?.lastName}`,
          isRequest: false,
        });
      }

      return res
        .status(404)
        .json({ success: false, message: "Can't sent friend request!" });
    }

    return res.status(404).json({ success: false, message: "user not found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const allFriendRequests = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedData?.userId;
    const user = await UserModel.findById(userId);

    if (user) {
      let allUsers = [];
      for (let i = 0; i < user?.friendRequests?.length; i++) {
        const requestUser = await UserModel.findById(user?.friendRequests[i]);

        if (requestUser) {
          allUsers.push(requestUser);
        }
      }
      return res.status(200).json({
        success: true,
        TotalFriendRequests: allUsers?.length,
        users: allUsers,
      });
    }
    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { token, friendId } = req.body;

    if (!token || !friendId)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedData?.userId;
    const user = await UserModel.findById(userId);

    if (user) {
      const filterFriendReq = user?.friendRequests?.filter(
        (item) => item != friendId
      );

      user.friendRequests = filterFriendReq;
      user.yourFriends.push(friendId);
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Friend request accepted!" });
    }
    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const removeFriendRequest = async (req, res) => {
  try {
    const { token, friendId } = req.body;

    if (!token || !friendId)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);
    if (user) {
      const filterFriendReq = user?.friendRequests?.filter(
        (item) => item != friendId
      );

      user.friendRequests = filterFriendReq;
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Friend request removed!" });
    }
    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const {
  uploadToCloudinary,
  removeFromCloudinary,
} = require("../config/cloudinary");
const userModel = require("../models/user");

exports.uploadImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }
    const data = await uploadToCloudinary(req.file.path, "user-profiles");
    const userId = req.user.userId;
    await userModel.updateOne(
      { _id: userId },
      { $set: { profileImg: data.url } }
    );
    const updatedUser = await userModel.findById(userId, "profileImg"); 
    res.status(200).send({
      message: "Profile updated successfully",
      profileImg: updatedUser.profileImg, //todo : get rid of this later 
      user: updatedUser
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};


exports.getImage = async (req, res) => {
  try {
    const userId =  req.user.userId;
    const user = await userModel.findById(userId);
    if(!user || !user.profileImg) {
      return res.status(404).send({message: "profile image not found"})
    }
    res.status (200).send ({user});
  } catch (error) {
    console.error("Error fetchig profile image:", error);
    res.status(500).send({message: "Internal server Error", error: error.message})
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId =  req.user.userId;
    const user = await userModel.findById(userId);
    if(!user) {
      return res.status(404).send({message: "user image not found"})
    }
    res.status (200).send ({user});
  } catch (error) {
    console.error("Error fetchig user:", error);
    res.status(500).send({message: "Internal server Error", error: error.message})
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await userModel.findById(userId);
    if (!user || !user.profileImg) {
      return res.status(404).send({ message: "Profile image not found" });
    }
    const publicId = user.profileImg;
    await removeFromCloudinary(publicId);
    await userModel.updateOne({ _id: userId }, { $unset: { profileImg: 1 } });
    res.status(200).send({ message: "Profile image deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile image:", error);
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};


// /:id = /123
//
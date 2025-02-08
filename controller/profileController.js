const {
  uploadToCloudinary,
  removeFromCloudinary,
} = require("../config/cloudinary");
const profileModel = require("../models/profile");
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
    console.log('request', req.params)
    const user = await userModel.findById(userId);
    console.log('user', user)
    if(!user || !user.profileImg) {
      return res.status(404).send({message: "profile image not found"})
    }
    res.status (200).send ({profileImg: user.profileImg});
  } catch (error) {
    console.error("Error fetchig profile image:", error);
    res.status(500).send({message: "Internal server Error", error: error.message})
  }
};

exports.deleteImg = async (req, res) => {
  try {
    const user = await profileModel.findOne({ _id: req.params.id });
    const publicId = user.publicId;
    await removeFromCloudinary(publicId);
    const deleteImg = await profileModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          imageUrl: "",
          publicId: "",
        },
      }
    );
    res.status(200).send("profile image deleted sucessfully");
  } catch (error) {
    res.status(400).send(error);
  }
};


// /:id = /123
//
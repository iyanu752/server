const {
  uploadToCloudinary,
  removeFromCloudinary,
} = require("../config/cloudinary");
const profileModel = require("../models/profile");
const userModel = require("../models/user");

exports.uploadImg = async (req, res) => {
  try {
    const data = await uploadToCloudinary(req.file.path, "user-profiles");
    const userId = req.user.userId;
    const savedImg = await userModel.updateOne(
      { _id: userId },
      {
        $set: {
          profileImg: data.url,
        },
      }
    );
    res
      .status(200)
      .send({ message: "profile updated with sucess", data: savedImg });
  } catch (error) {
    console.log("error", error);
    res.status(404).send(error);
  }
};

exports.getImage = async (req, res) => {
  try {
    const user = await profileModel.findOne({ _id: req.params.id });

    if (!user || !user.imageUrl) {
      return res.status(404).json({ message: "Profile image not found" });
    }

    res.status(200).json({ imageUrl: user.imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
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

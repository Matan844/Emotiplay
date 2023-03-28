const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Video = require('./models/Video');
const videoRoutes = require("./routers/videoRoutes");
const ratingRoutes = require("./routers/ratingRoutes");
const emotionRoutes = require("./routers/emotionRoutes");
const userRoutes = require("./routers/userActionRoutes");
const checkID = require("./routers/userActionRoutes")
const dotenv = require("dotenv");
const cloudinary = require('cloudinary').v2;

dotenv.config();
mongoose
  .connect(
    "mongodb+srv://emotiplay:emotiplay@cluster0.mqbcnqd.mongodb.net/test",
    {}
  )
  .then(() => {
    console.log("connection to data base successed");
  })
  .catch((error) => {
    console.log("error");
    console.log(error);
  });


cloudinary.config({
  cloud_name: 'dsgdoguhb',
  api_key: '936228414444438',
  api_secret: 'k5CQqGPMR2HA5PUwegiZQwfp1HM'
});

// delete unused videos from Cloudinary
async function deleteUnusedVideos() {
  try {
    const videos = await Video.find(); // get all videos from MongoDB
   
    const cloudinaryResources = await cloudinary.api.resources({ // get all Cloudinary resources
      type: 'upload',
      format: 'mp4',
      resource_type: 'video'
    });
    const cloudinaryLinks = cloudinaryResources.resources.map((resource) => { // get an array of Cloudinary links
      return resource.secure_url
    });
    const usedLinks = videos.map((video) => { // get an array of used video links from MongoDB
      return video.cloudinaryLink;
    });

    const unusedLinks = cloudinaryLinks.filter((link) => { // get an array of unused Cloudinary links
      return usedLinks.includes(link);
    });

    unusedLinks.forEach(async (link) => { // delete unused Cloudinary resources
      const publicId = link.split('/').slice(-1)[0].split('.')[0];
      console.log(`Deleting ${publicId}`);});
    
      // cloudinary.uploader.destroy(publicId , {resource_type: 'video'});
  } catch (err) {
    console.log('Error deleting unused videos', err);
  }
}
deleteUnusedVideos(); // call the function to delete unused videos when the script is run

const app = express();
app.use(express.json());
app.use(cors());

app.use("/video", videoRoutes);
app.use("/rate", ratingRoutes);
app.use("/emotion", emotionRoutes);
app.use("/user", userRoutes);
// app.get('/login', login)

app.listen(8639, () => console.log("listening on port 8639"));

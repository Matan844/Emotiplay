const express = require('express');
const router = express.Router();
const { addVideo, allVideos, deleteFromCloudinary, changeStatus ,deleteVideo  } = require('../controllers/videoController');

router.post('/addVideo', addVideo)
router.post('/deleteVideo', deleteVideo)
router.get('/allVideos', allVideos)
router.put('/changeStatus/:videoId', changeStatus)

module.exports = router;
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const videoRoutes = require('./routers/videoRoutes')
const ratingRoutes = require('./routers/ratingRoutes')
const { register, login, rateVideo, rateQuality2, rateQuality3, rateQuality4, rateQuality5, correctAnswer, similiarAnswer, randomAnswer, isAppropriate } = require('./controller')



mongoose.connect('mongodb+srv://emotiplay:emotiplay@cluster0.mqbcnqd.mongodb.net/test', {})
    .then(() => { console.log('hacked in successfully') })
    .catch(error => {
        console.log('error');
        console.log(error)
    })
const app = express()
app.use(express.json())
app.use(cors())


app.use('/video', videoRoutes);
app.use('/rate', ratingRoutes)
// app.get('/login', login)

// video relatedj

// app.put('/answerVIdeo/:id/correct', correctAnswer)
// app.put('/answerVIdeo/:id/similiar', similiarAnswer)
// app.put('/answerVIdeo/:id/random', randomAnswer)
// app.put('/isappropriateVIdeo/:id', isAppropriate)


app.listen(8639, () => console.log('emotions'))

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const SocketServer = require('./socketServer');


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);


io.on('connection', (socket)=>{
    SocketServer(socket);
});

// Port
const PORT = process.env.port || 5000;

// Mongo
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://admin:RvZetzfl04aNUtRf@travel-social-network.sweoh.mongodb.net/travel-social-network?retryWrites=true&w=majority";





// Router
app.use('/post', require('./Routers/post.router'));
app.use('/user', require('./Routers/user.router'));
app.use('/comment', require('./Routers/comment.router'));
app.use('/tour', require('./Routers/tour.router'));
app.use('/location', require('./Routers/location.router'));
app.use('/province', require('./Routers/province.router'));
app.use('/service', require('./Routers/service.router'));



//connect MongoDB
mongoose.connect(MONGO_URL, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to mongodb");
    }).catch(err => {
        console.log(err);
    })

http.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
})

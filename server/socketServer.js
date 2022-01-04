let users = [];

const SocketServer = (socket) =>{
    //connect
    socket.on('joinUser', id =>{
        users.push({id,socketId: socket.id});
        // console.log("connect socketId " + socket.id);
        // console.log({users});
    })

    //disconnect
    socket.on('disconnect',() =>{
        users = users.filter(user => user.socketId !== socket.id);
        // console.log("disconnect socketid: "+ socket.id);
        // console.log({users})
    })

    //like
    socket.on('likePost',newPost =>{
        // console.log(newPost);
        // let clients = [];
        
        // newPost.likes.forEach(element => {
        //     users.forEach(user =>{
        //         if(user.id == element._id) clients.push(user);
        //     })
        // });
        //all user online be update
        if(users.length > 0){
            users.forEach(user =>{
                socket.to(user.socketId).emit('likeToClient',newPost);
            })
        }
    })

    // unlike
    socket.on('unlikePost',newPost =>{
        if(users.length >0){
            users.forEach(user =>{ 
                socket.to(user.socketId).emit('unlikeToClient',newPost);
            })
        }
    })

    //comment Post
    socket.on('createCommentPost',newPost=>{
        // console.log(newPost);
        if(users.length >0){
            users.forEach(user =>{ 
                socket.to(user.socketId).emit('createCommentPostToClient',newPost);
            })
        }
    })

    //Delete comment Post
    socket.on('deleteCommentPost', newPost=>{
        // console.log(newPost);
        if(users.length >0){ 
            users.forEach(user =>{
                socket.to(user.socketId).emit('deleteCommentPostToClient', newPost)
            })
        }
    })

    //Follow
    socket.on('follow',newUser =>{
        const user = users.filter(user => user.id === newUser._id);
        if(user) {
            // console.log(user[0].socketId);
            socket.to(user[0].socketId).emit('followToClient',newUser);
        }
        
    })

    //unfollow
    socket.on('unfollow', newUser=>{
        const user = users.filter(user => user.id === newUser.user);
        if(user){
            socket.to(user[0].socketId).emit('unfollowToClient',newUser.user)
        }
    })
}

module.exports = SocketServer;
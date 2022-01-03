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
        console.log(newPost);
        if(users.length >0){
            users.forEach(user =>{ 
                socket.to(user.socketId).emit('createCommentPostToClient',newPost);
                
            })
        }
    })
}

module.exports = SocketServer;
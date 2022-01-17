let users = [];

const SocketServer = (socket) => {
    //connect
    socket.on('joinUser', id => {
        users.push({ id, socketId: socket.id });
    })

    //disconnect
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
    })

    //like
    socket.on('like', data => {
        //all user online be update
        if (users.length > 0) {
            users.forEach(user => {
                socket.to(user.socketId).emit('likeToClient', data);
            })
        }
    })

    // unlike
    socket.on('unlike', data => {
        if (users.length > 0) {
            users.forEach(user => {
                socket.to(user.socketId).emit('unlikeToClient', data);
            })
        }
    })

    //comment Post
    socket.on('createComment', data => {
        // console.log(newPost);
        if (users.length > 0) {
            users.forEach(user => {
                socket.to(user.socketId).emit('createCommentToClient', data);
            })
        }
    })

    //Delete comment Post
    socket.on('deleteComment', data => {
        // console.log(newPost);
        if (users.length > 0) {
            users.forEach(user => {
                socket.to(user.socketId).emit('deleteCommentToClient', data)
            })
        }
    })

    //Follow
    socket.on('follow', data => {
        const user = users.filter(user => user.id === data.id);
        if (user.length > 0) {
            socket.to(user[0].socketId).emit('followToClient', data);
        }
    })

    //unfollow
    socket.on('unfollow', data => {
        const user = users.filter(user => user.id === data.id);
        if (user.length > 0) {
            socket.to(user[0].socketId).emit('unfollowToClient', data);
        }
    })

    //create notify
    socket.on('createNotify', data => {
        // console.log("socket server")
        const clients = users.filter(user => data.recipients.includes(user.id))
        // console.log(clients)
        if (clients.length > 0) {
            clients.forEach(user => {
                socket.to(user.socketId).emit('createNotifyToClient', data)
            })
        }
    })

    //delete notify 
    socket.on('deleteNotify', data => {
        const clients = users.filter(user => data.recipients.includes(user.id))
        if (clients.length > 0) {
            clients.forEach(user => {
                socket.to(user.socketId).emit('deleteNotifyToClient', data);
            })
        }
    })

    //add message
    socket.on('addMessage', data => {
        const user = users.filter(user => user.id === data.recipient);
        if (user.length > 0) {
            socket.to(user[0].socketId).emit('addMessageToClient', data);
        }
    })
}

module.exports = SocketServer;
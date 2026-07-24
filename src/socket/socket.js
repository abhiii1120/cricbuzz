let ioInstance = null;

export function initSocket(io){
    ioInstance = io;

    io.on('connection',(socket) => {
        console.log('a user connected');
    })
}
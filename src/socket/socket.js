import logger from "../config/logger.js";

let ioInstance = null;

export function initSocket(io){
    ioInstance = io;

    io.on('connection',(socket) => {
        logger.info('a user connnected');
        socket.emit("connected");

        socket.on("client:connected",(data) => {
            logger.info(data)
        })
    })
}
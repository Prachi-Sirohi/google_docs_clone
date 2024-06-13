

import { Server } from "socket.io";
import mongoose from "mongoose";
import { getDocument, updateDocument } from "./controller/document-controller.js";
import http from "http"; // Importing http module for creating an HTTP server

const PORT = 3005;
const server = http.createServer(); // Creating an HTTP server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    socket.on('get-document', async documentId =>{
        const document  =
         await getDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        })

        socket.on('save-document', async data =>{ 
            await updateDocument(documentId, data);
        })
    });
});

server.listen(PORT, () => {
    console.log(`Socket.IO server is running on port ${PORT}`);
});

//connection
const dbURI = 'mongodb://127.0.0.1:27017/google-docs';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

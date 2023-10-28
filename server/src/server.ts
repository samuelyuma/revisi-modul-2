import express from 'express';
import payload from 'payload';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import multer from 'multer';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
    res.redirect('/admin');
});

payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
});

const connection = process.env.MONGODB_CONNECTION;
const databaseName = process.env.MONGODB_DATABASE;
let database;

MongoClient.connect(connection, (error, client) => {
    if (error) {
        console.error("Kesalahan saat menghubungkan ke MongoDB:", error);
        return;
    }
    database = client.db(databaseName);
    console.log("connect yaww");
});
app.listen(3000, () => {
    console.log("Payload Admin Panel running on port 3000");
});

app.get('/api/todo/GetNotes', (request, response) => {
    database.collection("todocollection").find({}).toArray((error, result) => {
        response.send(result);
    });
});

app.post('/api/todo/AddNotes', multer().none(), (request, response) => {
    database.collection("todocollection").count({}, function (error, index) {
        database.collection("todocollection").insertOne({
            id: (index).toString(),
            desc: request.body.newNotes
        }, (error, result) => {
            if (error) {
                response.status(500).json({ message: "Internal Server Error" });
                return;
            }
            response.json("sukses bang");
        });
    });
});

app.delete('/api/todo/DeleteNotes', (request, response) => {
    database.collection("todocollection").deleteOne({
        id: request.query.id
    }, (error, result) => {
        if (error) {
            response.status(500).json({ message: "Internal Server Error" });
            return;
        }
        response.json("terhapus mang");
    });
});


app.patch('/api/todo/UpdateNotes/:id', multer().none(), (request, response) => {
    const noteId = request.params.id;
    const updatedNote = request.body.updatedNote;

    database.collection("todocollection").updateOne(
        { id: noteId },
        { $set: { desc: updatedNote } },
        (error, result) => {
            if (error) {
                response.status(500).json({ message: "Internal Server Error" });
                return;
            }
            response.json("Catatan berhasil diperbarui");
        }
    );
});
import express from 'express';
import color from 'colors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import path from 'path';

const mongoURI = 'mongodb+srv://fuadnafiz98:fuad1998@mongodb-ilfpw.mongodb.net/test?retryWrites=true&w=majority';

const app = express();

app.use(express.static(path.join(__dirname, '/build')));

app.use(bodyParser.json());

const withDB = async (operation, res) => {
  try {
    const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('production');
    await operation(db);
    client.close();
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
};

app.post('/api/blogs/:name/upvote', async (req, res) => {
  
  withDB(async (db) => {
    const blogName = req.params.name;
    const blogInfo = await db.collection('blogs').findOne({ name: blogName });
    await db.collection('blogs').updateOne({ name: blogName }, {
      '$set': {
        upvotes: blogInfo.upvotes + 1
      },
    });
    const updateBlogInfo = await db.collection('blogs').findOne({ name: blogName });
    res.status(200).json(updateBlogInfo);
  }, res);
});

  app.post('/api/blogs/:name/add-comment', (req, res) => {
    const { username, comment } = req.body;
    const blogName = req.params.name;
    /**
      in es6 no need to write
      {
        username : username,
        comment: comment
      }
      */
    withDB(async (db) => {
      const blogInfo = await db.collection('blogs').findOne({ name: blogName });
      await db.collection('blogs').updateOne({ name: blogName }, {
        '$set': {
          comments: blogInfo.comments.concat({ username, comment })
        }
      });
      const updateBlogInfo = await db.collection('blogs').findOne({ name: blogName });
      res.status(200).json(updateBlogInfo);
    }, res);
  });
  
  app.get('/api/blogs/:name', async (req, res) => {
    withDB(async (db) => {
      const blogName = req.params.name;
      const blogInfo = await db.collection('blogs').findOne({ name: blogName });
      res.status(200).json(blogInfo);
    }, res);
  });

app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname + '/build/index.html'));
})
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('connection successful'.red.bold))
//   .catch (err => console.log(err));

app.listen(8000, () => console.log('server running at port :: 8000'.green.bold));
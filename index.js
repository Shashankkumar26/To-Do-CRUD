const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv= require('dotenv').config();
const app = express();
const path = require('path');
app.use(cors());
app.use(bodyParser.json());
const port = process.env.port || 5000;

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;


// Connect to MongoDB
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.9fjmlcj.mongodb.net/To-do-List`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error while connecting to MongoDB", error);
  });

// Task Model
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 50,
  },
  description: {
    type: String,
    minLength: 3,
    maxLength: 200,
  },
  status: {
    type: String,
    enum: ['pending', 'working', 'complete'],
    default: 'pending',
  },
});

const Task = mongoose.model('Task', taskSchema);

// Route to add a new task
app.post('/add', async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = new Task({
      title,
      description,
      status,
    });

    const savedTask = await task.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error saving Task in MongoDB' });
  }
});

// Route to update a task
app.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status },
      { new: true } // Return the updated task in the response
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task in MongoDB' });
  }
});
app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully', deletedTask });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting task from MongoDB' });
    }
  });

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks from MongoDB' });
  }
});


// Start the server
app.use(express.static(path.join(__dirname, "./frontend/build")))
app.get("*" ,(req,res)=>{
  res.sendFile(
    path.join(__dirname,"./frontend/build/index.html"),
    function(err){
      res.status(500).send(err);
    }
  )
})
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

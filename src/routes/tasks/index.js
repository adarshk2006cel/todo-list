const { Router } = require('express');
const randomString = require('randomstring');

// import a custom schema from models
const taskSchema = require('../../models/tasks');

const MainRouter = Router();

MainRouter.route('/')
  .get(async (req, res) => {
    const { status, sort } = req.query;
    const filter = {};
    const sortOptions = {};

    if (status) {
      filter.status = status;
    }
    if (sort) {
      if (sort.status) {
        sortOptions.status = sort.status === "1" ? 1 : -1;
      }
      if (sort.createdAt) {
        sortOptions.createdAt = sort.createdAt === "1" ? 1 : -1;
      }
      if (sort.updatedAt) {
        sortOptions.updatedAt = sort.updatedAt === "1" ? 1 : -1;
      }
      if (sort.title) {
        sortOptions.title = sort.title === "1" ? 1 : -1;
      }
    }

    try {
      const data = await taskSchema.find(filter).sort(sortOptions);
      res.json(data)
    }
    catch (error) {
      res.status(500).json({ message: error.message })
    }
  })
  .post(async (req, res) => {
    let body = req.body;
    let newTask = new taskSchema({
      title: body.title,
      description: body.description,
    });
    try {
      const dataToSave = await newTask.save();
      res.status(200).json(dataToSave);
    }
    catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

MainRouter.route('/:id')
  .get(async (req, res) => {
    try {
      const task = await taskSchema.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const updatedTask = await taskSchema.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedTask = await taskSchema.findByIdAndDelete(req.params.id);
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(deletedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

MainRouter.route('/random')
  .post(async (req, res) => {
    const title = randomString.generate({
      length: 10,
      charset: 'alphabetic',
    });
    const description = randomString.generate({
      length: 25,
      charset: 'alphabetic',
    });
    const status = ['Pending', 'In Progress', 'Completed'];
    const randomStatus = status[Math.floor(Math.random() * status.length)];

    const newTask = new taskSchema({
      title,
      description,
      status: randomStatus,
    });

    try {
      const dataToSave = await newTask.save();
      res.status(200).json(dataToSave);
    }
    catch (error) {
      res.status(400).json({ message: error.message });
    }
  })

module.exports = MainRouter;

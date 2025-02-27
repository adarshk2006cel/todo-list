const { Router } = require('express');
const { v4 } = require('uuid');

// import a custom schema from models
const todoSchema = require('../../models/todo');

const MainRouter = Router();

//make a list of todos
let todos = [
  { id: 1, title: 'Learn JavaScript', completed: true },
  { id: 2, title: 'Learn React', completed: false },
  { id: 3, title: 'Learn Node', completed: false },
];

MainRouter.route('/')
  .get(async (req, res) => {
    try {
      const data = await todoSchema.find();
      res.json(data)
    }
    catch (error) {
      res.status(500).json({ message: error.message })
    }
  })
  .post(async (req, res) => {
    let body = req.body;
    let newTodo = new todoSchema({
      id: v4(),
      title: body.title,
      completed: body.completed,
    });
    try {
      const dataToSave = await newTodo.save();
      res.status(200).json(dataToSave);
    }
    catch (error) {
      res.status(400).json({ message: error.message });
    }
    // todos.push(newTodo);
    // res.json(todos);
  });

// MainRouter.get('/', (req, res) => {
//   res.json(todos);
// });

MainRouter.get('/:id', (req, res) => {
  res.json(todos.find((todo) => todo.id === Number(req.params.id)));
});

// MainRouter.post('/', (req, res) => {
//   let body = req.body;
//   // console.log('body', body);
//   let newTodo = {
//     id: uuid.v4(),
//     title: body.title,
//     completed: body.completed,
//   };
//   todos.push(newTodo);
//   res.json(todos);
// });

module.exports = MainRouter;
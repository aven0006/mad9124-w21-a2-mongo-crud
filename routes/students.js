const Student = require('../models/Student');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const students = await Student.find();

  res.send({ data: students });
});

router.post('/', async (req, res) => {
  let attributes = req.body;

  delete attributes._id;

  const newStudent = new Student(attributes);

  await newStudent.save();
  res.status(201).send({ data: newStudent });
});

router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  
  if (!student) {
    throw new Error('Resource not found');
  }

  res.send({ data: student });
});

router.patch('/:id', async (req, res) => {
  const { _id, ...theRest } = req.body;
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      _id: req.params.id,
      ...theRest
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!student) {
    throw new Error('Resource not found');
  }

  res.send({ data: student });
});

router.put('/:id', async (req, res) => {
  const { _id, ...theRest } = req.body;
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      _id: req.params.id,
      ...theRest
    },
    {
      new: true,
      overwrite: true,
      runValidators: true
    }
  );

  if (!student) {
    throw new Error('Resource not found');
  }

  res.send({ data: student });
});

router.delete('/:id', async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);

  if (!student) {
    throw new Error('Resource not found');
  }

  res.send({ data: student });
});

module.exports = router;

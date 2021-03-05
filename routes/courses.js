const Course = require('../models/Course');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const courses = await Course.find();

  res.send({ data: courses });
});

router.post('/', async (req, res) => {
  let attributes = req.body;

  delete attributes._id;

  const newCourse = new Course(attributes);

  await newCourse.save();
  res.status(201).send({ data: newCourse });
});

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id).populate('students');
  
  if (!course) {
    throw new Error('Resource not found');
  }

  res.send({ data: course });
});

router.patch('/:id', async (req, res) => {
  const { _id, ...theRest } = req.body;
  const course = await Course.findByIdAndUpdate(
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

  if (!course) {
    throw new Error('Resource not found');
  }

  res.send({ data: course });
});

router.put('/:id', async (req, res) => {
  const { _id, ...theRest } = req.body;
  const course = await Course.findByIdAndUpdate(
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

  if (!course) {
    throw new Error('Resource not found');
  }

  res.send({ data: course });
});

router.delete('/:id', async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course) {
    throw new Error('Resource not found');
  }

  res.send({ data: course });
});

module.exports = router;

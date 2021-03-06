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
  try {
    const course = await Course.findById(req.params.id).populate('students');
    
    if (!course) {
      throw new Error('Resource not found');
    }
  
    res.send({ data: course });
  } catch (error) {
    sendResourceNotFound(req, res);
  }
});

router.patch('/:id', async (req, res) => {
  try {
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
  } catch (error) {
    sendResourceNotFound(req, res);
  }
});

router.put('/:id', async (req, res) => {
  try {
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
  } catch (error) {
    sendResourceNotFound(req, res);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndRemove(req.params.id);
  
    if (!course) {
      throw new Error('Resource not found');
    }
  
    res.send({ data: course });
  } catch (error) {
    sendResourceNotFound(req, res);
  }
});

function sendResourceNotFound(req, res) {
  res.status(404).send({
    errors: [
      {
        status: '404',
        title: 'Resource does not exist',
        description: `We could not find a course with id: ${req.params.id}`
      }
    ]
  });
}

module.exports = router;

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
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      throw new Error('Resource not found');
    }
  
    res.send({ data: student });
  } catch (error) {
    sendResourceNotFound(req, res);
  }
});

router.patch('/:id', async (req, res) => {
  try {
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
  } catch (error) {
    sendResourceNotFound(req, res);
  }
});

router.put('/:id', async (req, res) => {
  try {
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
  } catch (error) {
    sendResourceNotFound(req, res);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id);
  
    if (!student) {
      throw new Error('Resource not found');
    }
  
    res.send({ data: student });
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
        description: `We could not find a student with id: ${req.params.id}`
      }
    ]
  });
}

module.exports = router;

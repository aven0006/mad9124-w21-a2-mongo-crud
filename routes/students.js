import express from 'express';
import sanitizeBody from '../middleware/sanitizeBody.js';
import Student from '../models/Student.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
  
    res.send({ data: students });
  } catch (error) {
    validateStatusError(req, res, error);
  }
});

router.post('/', sanitizeBody, async (req, res) => {
  try {
    let attributes = req.sanitizedBody;
  
    delete attributes._id;
  
    const newStudent = new Student(attributes);
  
    await newStudent.save();
    res.status(201).send({ data: newStudent });
  } catch (error) {
    validateStatusError(req, res, error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      throw new Error('Resource not found');
    }
  
    res.send({ data: student });
  } catch (error) {
    validateStatusError(req, res, error);
  }
});

router.patch('/:id', sanitizeBody, async (req, res) => {
  try {
    const { _id, ...theRest } = req.sanitizedBody;
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
    validateStatusError(req, res, error);
  }
});

router.put('/:id', sanitizeBody, async (req, res) => {
  try {
    const { _id, ...theRest } = req.sanitizedBody;
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
    validateStatusError(req, res, error);
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
    validateStatusError(req, res, error);
  }
});

function validateStatusError(req, res, error) {
  if (error.name === 'ValidationError') {
    return res.status(422).send({
      errors: [
        {
          status: '422',
          title: 'Validation error',
          description: `${error.message}`
        }
      ]
    });
  }

  sendResourceNotFound(req, res);
}

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

export default router;

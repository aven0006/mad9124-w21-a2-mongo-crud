import express from 'express';
import sanitizeBody from '../middleware/sanitizeBody.js';
import Course from '../models/Course.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
  
    res.send({ data: courses });
  } catch (error) {
    validateStatusError(req, res, error);
  }
});

router.post('/', sanitizeBody, async (req, res) => {
  try {
    let attributes = req.sanitizedBody;
  
    delete attributes._id;
  
    const newCourse = new Course(attributes);
  
    await newCourse.save();
    res.status(201).send({ data: newCourse });
  } catch (error) {
    validateStatusError(req, res, error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('students');
    
    if (!course) {
      throw new Error('Resource not found');
    }
  
    res.send({ data: course });
  } catch (error) {
    validateStatusError(req, res, error);
  }
});

router.patch('/:id', sanitizeBody, async (req, res) => {
  try {
    const { _id, ...theRest } = req.sanitizedBody;
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
    validateStatusError(req, res, error);
  }
});

router.put('/:id', sanitizeBody, async (req, res) => {
  try {
    const { _id, ...theRest } = req.sanitizedBody;
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
    validateStatusError(req, res, error);
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
        description: `We could not find a course with id: ${req.params.id}`
      }
    ]
  });
}

export default router;

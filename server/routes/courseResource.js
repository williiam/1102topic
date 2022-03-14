import express from 'express';

import { createResource, getCourseResource } from '../controllers/courseResource.js';

const router = express.Router();
import auth from "../middleware/auth.js";
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
router.post('/', createResource);
router.post('/get', getCourseResource);
// router.get('/search', getBooksBySearch);
// router.post('/', getCourse);
// router.get('/dump', dumpCourse);

// router.post('/', auth,  createCourse);
// router.patch('/:id', auth, updateBook);
// router.delete('/:id', auth, deleteBook);
// router.patch('/:id/likeBook', auth, likeBook);
// router.post('/:id/commentBook', commentBook);

export default router;
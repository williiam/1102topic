import express from 'express';

import { dumpDepartment } from '../controllers/department.js';

const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
 
router.post('/dumpDepartment', dumpDepartment);

export default router;
import express from "express";
const router = express.Router();

import { signin, signup, googleSignIn, oauth, updateNickName, updateLike } from "../controllers/user.js";
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/googlesignin", googleSignIn);
router.post("/oauth", oauth);
router.post("/nickname", updateNickName);
router.post("/like", updateLike);

export default router;
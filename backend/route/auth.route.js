import express from "express";
import { login ,signin,signup,logout,authCheck} from "../Controller/auth.controller.js";
import { protectRoute} from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

router.post("/login", login);
router.post("/logout", logout);

router.get("/authCheck",protectRoute,authCheck);

export default router;
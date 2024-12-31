import express from 'express';
import { getTrendingTv } from "../Controller/tvs.controller.js";
import { getTvTrailers } from '../Controller/tvs.controller.js';
import { getTvdetails } from '../Controller/tvs.controller.js';
import { getSimilarTv } from '../Controller/tvs.controller.js';
import { getTvsbyCategory } from '../Controller/tvs.controller.js';


const router = express.Router();

router.get("/trending",getTrendingTv);
router.get("/:id/trailers",getTvTrailers);
router.get("/:id/details",getTvdetails);
router.get("/:id/similar",getSimilarTv);
router.get("/:category",getTvsbyCategory);

export default router;
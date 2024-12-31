import express from 'express';
import { getTrendingMovies } from "../Controller/movies.controller.js";
import { getMovieTrailers } from '../Controller/movies.controller.js';
import { getMoviedetails } from '../Controller/movies.controller.js';
import { getSimilarMovies } from '../Controller/movies.controller.js';
import { getMoviesbyCategory } from '../Controller/movies.controller.js';


const router = express.Router();

router.get("/trending",getTrendingMovies);
router.get("/:id/trailers",getMovieTrailers);
router.get("/:id/details",getMoviedetails);
router.get("/:id/similar",getSimilarMovies);
router.get("/:category",getMoviesbyCategory);

export default router;
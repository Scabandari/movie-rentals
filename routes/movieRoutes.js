const express = require('express');
const router = express.Router();
const movie_controller = require('../controllers/movieController');
// const mongoose = require('mongoose');

router.post('/create', movie_controller.movie_create);

router.get('/', movie_controller.movie_list);

router.get('/:movieId/detail', movie_controller.movie_detail);

module.exports = router;



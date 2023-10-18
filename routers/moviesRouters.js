const express = require('express');
const router = express.Router();
const moviesController = require('../controller/moviesController');

// Rute untuk mendapatkan detail movie berdasarkan ID
router.get('/:id', moviesController.getMovie);

// Rute untuk mendapatkan semua movies
router.get('/', moviesController.getAllMovies);

// Rute untuk membuat movie baru
router.post('/', moviesController.createMovie);

// Rute untuk mengupdate movie berdasarkan ID
router.put('/:id', moviesController.updateMovie);

// Rute untuk menghapus movie berdasarkan ID
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;

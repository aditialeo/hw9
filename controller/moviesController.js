
const moviesRepository = require('../services/moviesServices');

const getMovie = async (req, res) => {
    try {
        const movies = await moviesService.get();
        res.status(200).json({
            status: 'success',
            data: movies,
        });
       } catch {(error => {
        res.status(500).json({message: 'Internal server error', error});
       });
     }
};

const getAllMovies = async (req, res) => {
   try {
    const movies = await moviesService.getAll();
    res.status(200).json({
        status: 'success',
        data: movies,
    });
   } catch {(error => {
    res.status(500).json({message: 'Internal server error', error});
   });
 }
};

const createMovie = async (req, res) => {
    try {
    const movies = await moviesService.create();
    res.status(200).json({
        status: 'success',
        data: movies,
    });
}
catch {(error => {
    res.status(500).json({message: 'Internal server error', error});
   });
 }
};

const updateMovie = async (req, res) => {
    try {
        const movies = await moviesService.updateMovie();
        res.status(200).json({
            status: 'success',
            data: movies,
        });
    }
    catch {(error => {
        res.status(500).json({message: 'Internal server error', error});
       });
     }
};

const deleteMovie = async (req, res) => {
    try {
        const movies = await moviesService.deleteMovie(id);
        res.status(200).json({
            status: 'success',
            data: movies,
        });
    }
    catch {(error => {
        res.status(500).json({message: 'Internal server error', error});
       });
     }
};

module.exports = {
    getMovie,
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie
};

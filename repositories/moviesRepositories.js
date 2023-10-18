
const moviesModel = require('../models/moviesModel');

const find = (id) => {
    return moviesModel.getMoviesSpecific(id);
}

const findAll = () => {
    return moviesModel.getMovies();
}

const create = (req) => {
    return moviesModel.addMovies(req);
}

const update = (req) => {
    return moviesModel.updateMovies(req);
}

const del = (id) => {
    return moviesModel.deleteMovies(id); 
}

module.exports = {
    find,
    findAll,
    create,
    update,
    del
};








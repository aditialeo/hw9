const express = require('express');


const moviesRepositories = require('../repositories/moviesRepositories');

const get = (id) => {
    return moviesRepositories.find(id);
}

const getAll = () => {
    return moviesRepositories.findAll();
}

const addNew = (req) => {
    return moviesRepositories.create(req);
}

const patch = (req) => {
    return moviesRepositories.update(req);
}

const del = (id) => {
    return moviesRepositories.del(id);
}

module.exports = {
    get,
    getAll,
    addNew,
    patch,
    del
};

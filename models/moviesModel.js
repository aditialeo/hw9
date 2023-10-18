const pool = require("../database");

const getMovies = (req) => {
    return new Promise((resolve, reject) => {
        const page = req.query.page;
        const limit = req.query.limit;

        if (!page || !limit) {
            pool.query('SELECT * FROM movies', (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            });
        } else {
            const offset = (page - 1) * limit;
            pool.query('SELECT * FROM movies LIMIT $1 OFFSET $2', [limit, offset], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            });
        }
    });
};

const getMoviesSpecific = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM movies WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
};

const addMovies = (req) => {
    return new Promise((resolve, reject) => {
        const { id, title, genres, year } = req.body;

        if (!id || !title || !genres || !year) {
            reject('id, title, genres, and year are required fields.');
            return;
        }
        pool.query(
            'INSERT INTO movies ("id", "title", "genres", "year") VALUES ($1, $2, $3, $4)',
            [id, title, genres, year],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.rows);
                }
            }
        );
    });
};

const updateMovies = (req) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE movies SET title=$1, genres=$2, year=$3 WHERE id=$4',
            [req.body.title, req.body.genres, req.body.year, req.params.id],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.rows);
                }
            }
        );
    });
};

const deleteMovies = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM movies WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.rows);
            }
        });
    });
};

module.exports = {
    getMovies,
    getMoviesSpecific,
    addMovies,
    updateMovies,
    deleteMovies
};

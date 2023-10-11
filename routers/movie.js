
/**
 *  @swagger
 * 
 * /movie:
 *   get:
 *     summary: Mendapatkan detail movie
 *     description: Mendapatkan detail movie dengan menampilkan seluruh data movie.
 *     parameters:
 *       - id: id
 *         title: title
 *         genres: genre
 *         year: tahun
 *    
 *     responses:
 *       200:
 *         description: Sukses mendapatkan detail pengguna.
 *       404:
 *         description: Pengguna tidak ditemukan.
 *       505:
 *          description: server eror
 * 
 */

/**
 * @swagger
 * /movie/{id}:
 *   get:
 *     summary: Mendapatkan detail pengguna berdasarkan ID
 *     description: Mendapatkan detail pengguna berdasarkan ID pengguna.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID pengguna yang akan ditemukan.
 *         type: integer
 *     responses:
 *       200:
 *         description: Sukses mendapatkan detail pengguna berdasarkan ID.
 *       404:
 *         description: Pengguna tidak ditemukan.
 */

/**
 * @swagger
 * /movie/{id}:
 *   put:
 *     summary: Memperbarui pengguna berdasarkan ID
 *     description: Memperbarui informasi pengguna berdasarkan ID pengguna.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID pengguna yang akan diperbarui.
 *         type: integer
 *       - name: user
 *         in: body
 *         required: true
 *         description: Objek pengguna yang berisi data pembaruan.
 *     responses:
 *       200:
 *         description: Sukses memperbarui pengguna.
 *       400:
 *         description: Permintaan tidak valid.
 *       404:
 *         description: Pengguna tidak ditemukan.
 */

/**
 * @swagger
 * /movie:
 *   post:
 *     summary: Membuat pengguna baru
 *     description: Membuat pengguna baru dalam sistem.
 *     parameters:
 *       - id: id
 *         title: title
 *         genres: genre
 *         year: tahun
 *     responses:
 *       201:
 *         description: Sukses membuat pengguna baru.
 *       400:
 *         description: Permintaan tidak valid.
 */

/**
 * @swagger
 * /movie/{id}:
 *   delete:
 *     summary: Menghapus pengguna berdasarkan ID
 *     description: Menghapus pengguna berdasarkan ID pengguna.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID pengguna yang akan dihapus.
 *         type: integer
 *     responses:
 *       204:
 *         description: Sukses menghapus pengguna.
 *       404:
 *         description: Pengguna tidak ditemukan.
 */

const express = require('express');
const router = express.Router();
const pool = require("../database");
const auth = require("../middleware/auth.js");

router.get('/',(req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;

  const offset = (page - 1)*limit

  if (!page || !limit) {
      pool.query('SELECT * FROM movies', (error, results) => {
          if (error) {
              throw error
          }
          res.json(results.rows)
      })
  } else {
      pool.query('SELECT * FROM movies LIMIT $1 OFFSET $2', [limit, offset], (error, results) => {
          if (error) {
              console.error(error);
              return res.status(500).json({ message: 'Internal server error' });
          }
          res.json(results.rows)
      })
  }
})

//get by id
router.get('/:id', (req, res) => {
  pool.query(`SELECT * FROM movies WHERE id = $1`,[req.params.id] ,(error, results) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
      }
      res.json(results.rows)
  })
})

//post router
router.post('/', async (req, res, next) => {
  try {
      const maxIdQueryResult = await pool.query('SELECT MAX(id) FROM users');
      const maxId = maxIdQueryResult.rows[0].max || 0; // Use 0 if there are no existing users

      await pool.query('INSERT INTO movies ("title", "genres", "year") VALUES ($1, $2, $3)', [req.body.title, req.body.genres, req.body.year]);

      res.status(201).json({
          status: 'success',
          message: 'Movie successfully added!',
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });;
  }
});

//put id
router.put('/:id', (req, res) => {
  pool.query('UPDATE movies SET title=$1, genres=$2, year=$3 WHERE id=$4', [req.body.title, req.body.genres, req.body.year, req.params.id], (error, results) => {
          if (error) {
              console.error(error);
              return res.status(500).json({ message: 'Internal server error' });
          }
          res.status(201).json({
              status: 'success',
              message: 'Movie ' + req.body.title + ' successfully updated',
          });
      }
  );
});

//delete
router.delete('/:id', (req, res) => {
  pool.query(`DELETE FROM movies WHERE id = $1`,[req.params.id] , (error, results) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(201).json({
          status: 'success',
          message: 'movie successfully delete!'
      })
  })
})





module.exports = router;

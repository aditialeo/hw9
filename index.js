const express = require("express");
const userRouter = require("./routers/user");
const movieRouter = require("./routers/movie.js");

//pemanggilan dari controller hw 10
const movies = require("./routers/moviesRouters");

const multer = require("./utils/multer.js");

const path = require("path");
const PORT = 3000;
const app = express();


app.use(express.json());
 
//app use untuk mvc
app.use('/movies',movies)

//app andpoint uppload
app.put("/contact/upload", multer().single('photo'), (req,res)=> {
    const file = req.file.path;

    console.log(file);
    if(!file){
        return res.status(400).json({
            status: false,
            message: "No file selected",
        });
    }

    res.send(file);
});

//menampilkan foto yg sudah di uppload
app.use("/upload", express.static(path.join(__dirname, "upload")));


//SWAGGER
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "Middleware Project API Documentation",
          version: "0.1.0",
          description: "This documentation made with swagger. The API itself are made with Express JS",
      },
      servers: [
          {
              url: 'http://localhost:3000',
          }
      ]
  },
  apis: ['./routers/*']
}

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


//router
app.use("/user", userRouter);
app.use("/movie", movieRouter);

app.listen(PORT, () => console.log("server running"));

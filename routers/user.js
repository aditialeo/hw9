/**
* @swagger
* components:
*   schemas:
*       Users:
*           type: object
*           required: 
*               - email
*               - gender
*               - password
*               - role
*           properties:
*               id:
*                   type: integer
*                   description: the unique code of the users
*               email:
*                   type: string
*                   description: the email of the users
*               gender:
*                   type: string
*                   description: the gender of the users
*               password:
*                   type: string 
*                   description: the user's password
*               role:
*                   type: string
*                   description: the role of the users
*           example:
*               id: 6     
*               email: loak5@nifty.com
*               gender: Female
*               password: 46sy8hp1eJ
*               role: Estimator
*/

/**
* @swagger
* tags:
*   name: Users
*   description: The users API documentation
* /users:
*   get:
*       summary: Query all list of users account *require authorization
*       tags: [Users]
*       requestBody:
*           required: false
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Users'
*       responses:
*           200:
*               description: All users queried. 
*               content: 
*                   application/json: 
*                       schema:
*                           $ref: '#/components/schemas/Users'
*           500:
*               description: Internal server error
*
* /users/login:
*   post:
*       summary: Login an existing user account
*       tags: [Users]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Users'
*       responses:
*           200:
*               description: User successfully logged in. 
*               content: 
*                   application/json:  
*                       schema:
*                           $ref: '#/components/schemas/Users'
*           500:
*               description: Internal server error
*
* /users/register:
*   post:
*       summary: Register a new user account
*       tags: [Users]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Users'
*       responses:
*           200:
*               description: Account registered, kindly log in with the new account
*           500:
*               description: Internal server error
/users/verify/{token}:
*   post:
*       summary: Register a new user account
*       tags: [Users]
*       parameters:
*           - in: path
*             name: token
*             schema:
*               type: string
*             required: true
*             description: The code that acquired from login.
*       responses:
*           200:
*               description: Verification successful. You can use full features!
*           500:
*               description: Internal server error
*
*
*/

const {register, login} = require("../controller/user.js");

const router = require('express').Router();

router.post("/register", register);
router.post("/login", login);


module.exports = router;
const jwt = require('jsonwebtoken');
const signToken = (data) => {
  const token = jwt.sign(data, 'bebas' , { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  const data = jwt.verify(token, 'bebas');
  return data;
};


module.exports = { signToken, verifyToken };

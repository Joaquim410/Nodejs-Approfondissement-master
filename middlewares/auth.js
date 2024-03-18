const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const User = require("../api/users/user.model"); 
const config = require("../config");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "Token not found";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);

    // Récupérer l'utilisateur complet à partir de l'ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw 'User not found';
    }

    // Ajouter l'utilisateur à l'objet req
    req.user = user.toObject();
    delete req.user.password; 

    next();
  } catch (error) {
    next(new UnauthorizedError(error.message));
  }
};
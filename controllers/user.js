const bcrypt = require('bcrypt');

const User = require('../models/User');
const Agency = require('../models/Agency');

const { createToken, validateToken, handleError } = require('../utils/');

const DUMMY = { id: '123', agencyName: 'Bekk' };

const createUser = async (req, res, next) => {
  const { email, password, agencySanityId } = req.body;

  // Dummy sanity check
  if (DUMMY.id !== agencySanityId) {
    res.status(401).send('Agency not found');
  } else {
    try {
      const { _id: agencyId } = await Agency.create(DUMMY);

      // Trenger noe her som tar hensyn til at oppretting av bruker feiler

      const { _id: userId } = await User.create({
        email,
        password,
        agency: agencyId
      });

      res.json({
        token: createToken({ userId, agencyId })
      });
    } catch (err) {
      handleError(err, next);
    }
  }
};

const authenticate = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send('User not found');
    } else if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).send('Incorrect password');
    } else {
      res.send({
        token: createToken({ userId: user._id, agencyId: user.agency })
      });
    }
  } catch (err) {
    handleError(err, next);
  }
};

const authorize = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.sendStatus(401);
  } else {
    try {
      const decodedToken = await validateToken(authorization);
      req.decodedToken = decodedToken;
      next();
    } catch (err) {
      res.sendStatus(401);
    }
  }
};

module.exports = {
  createUser,
  authenticate,
  authorize
};

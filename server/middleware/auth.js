import jwt from 'jsonwebtoken';

// Tarkistetaan Authorization-headerista löytyvä Bearer-token ja tallennetaan tokenin käyttäjätiedot req.user-objektiin.
export const auth = (req, res, next) => {
  const header = req.header('Authorization');

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Tämä middleware sallii pyynnön vain käyttäjälle, jolla on admin-oikeudet. Jos käyttäjä ei ole admin, palautetaan 403 Forbidden.
export const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access denied' });
  }

  next();
};
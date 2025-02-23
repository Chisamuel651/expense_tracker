const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    //! get token from header
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split( ' ')[1];
    // console.log(token);
    const verifyToken = jwt.verify(token, 'samuelKey', (err, decoded) => {
        if(err){
            return false
        }else{
            return decoded;
        }
    });

    if(verifyToken){
        //! save the uer into the req obj
        req.user = verifyToken.id;
        next();
    }else{
        const err = new Error('Token expired, login again');
        next(err);
    }

    
}

module.exports = isAuthenticated;
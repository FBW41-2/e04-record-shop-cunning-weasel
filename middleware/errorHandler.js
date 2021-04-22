const errorHandler = (err, req, res, next) => {
    res.json({error: err, message});
    next();
};

module.exports = errorHandler;
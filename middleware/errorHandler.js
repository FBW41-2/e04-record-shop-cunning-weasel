exports.errorHandler = (err, req, res, next) => {
    res.json({error: err, message});
};


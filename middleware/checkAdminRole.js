module.exports = (req, res, next) => {
    if (req.user.role === "Admin") {
        next();
    } else {
        next({message: "You silly wombat, you ain't Admin!"});
    }
};

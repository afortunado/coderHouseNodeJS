export const checkRole = (requiredRoles) => (req, res, next) => {
    const user = req.user;
    if (user && requiredRoles.includes(user.role)) {
        next();
    } else {
        res.status(400).json({ message: 'You have not access permission.' });
    }
};

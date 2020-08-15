function notFound(req, res, next) {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

function errorHandler(error, req, res, next) {
    const status_code = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(status_code);
    res.json({
        status: status_code,
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? "production stack :P" : error.stack,
    });
}

module.exports = {
    notFound,
    errorHandler,
};
function errorHandler(err, req, res, next) {
    let name = err.name || '';
    let status, error;

    switch (name) {
        case 'SequelizeValidationError':
            status = 400;
            error = err.errors.map(el => el.message).join(' ');
            break;
        default:
            status = 500;
            error = 'Internal server error';
            break;
        }
        res.status(status).json({error});
    }
    module.exports = errorHandler
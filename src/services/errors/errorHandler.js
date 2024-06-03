import { CustomError } from "./errors.js"

function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        console.error(err.code, err.message)
        res.status(err.status).json({
            error: err.code,
            message: err.message
        });
    } else {
        console.error(err);
        res.status(500).json({
            error: 'INTERNAL_SERVER_ERROR',
            message: 'Ocurrió un error interno en el servidor.'
        });
    }
}

export { errorHandler };

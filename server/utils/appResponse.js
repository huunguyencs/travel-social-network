const appResponse = (req, res, next) => {
    req.responseData = (statusCode, data) => {
        req.status(statusCode).json(data);
    }

    req.success = (data) => {
        req.responseData(200, data);
    }

    req.created = (data) => {
        req.responseData(201, data);
    }

    req.deleted = (data) => {
        req.responseData(204, data);
    }

    req.unauthorized = () => {
        req.responseData(401, { success: false, message: 'Xác thực không thành công!' })
    }

    req.forbidden = () => {
        req.responseData(403, { success: false, message: 'Không được phép!' })
    }

    req.notFound = (message) => {
        req.responseData(404, { success: false, message: message })
    }

    req.error = (err) => {
        req.responseData(500, { success: false, message: err.message });
    }

    next();
}

module.exports = appResponse;
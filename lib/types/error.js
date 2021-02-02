const { badRequest, notFound, serviceUnavailable } = require('../utils/httpStatusCodes');
const messages = require('../messages/error');

class GenericError extends Error {
    constructor(message, code, data) {
        super();

        this.genericMessage = message;

        if (this.constructor === GenericError) {
            throw new TypeError('Abstract class "GenericError" cannot be instantiated directly.');
        }

        this.name = this.constructor.name;
        this.code = code;
        this.data = data;

        Error.captureStackTrace(this, this.constructor);
    }
}

class ServiceUnavailable extends GenericError {
    constructor(message = messages.SERVICE_UNAVAILABLE.message,
        code = messages.SERVICE_UNAVAILABLE.code,
        data) {
        super(message, code, data);

        this.httpStatus = serviceUnavailable;
    }
}

class NotFound extends GenericError {
    constructor(message = messages.NOT_FOUND.message,
        code = messages.NOT_FOUND.code,
        data) {
        super(message, code, data);

        this.httpStatus = notFound;
    }
}

class BadRequest extends GenericError {
    constructor(message = messages.BAD_REQUEST.message,
        code = messages.BAD_REQUEST.code,
        data) {
        super(message, code, data);

        this.httpStatus = code;
    }
}

class DatabaseError extends GenericError {
    constructor(message = messages.DB_CONNECTION.message,
        code = messages.DB_CONNECTION.code,
        data) {
        super(message, code, data);

        this.httpStatus = -999;
    }
}

class CacheStoreError extends GenericError {
    constructor(message = messages.DB_CONNECTION.message,
        code = messages.DB_CONNECTION.code,
        data) {
        super(message, code, data);

        this.httpStatus = -999;
    }
}


module.exports = {
    GenericError,
    ServiceUnavailable,
    NotFound,
    BadRequest,
    DatabaseError,
    CacheStoreError,
};

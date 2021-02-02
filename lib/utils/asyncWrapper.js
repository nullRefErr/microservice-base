const responseFormatter = require('./responseFormatter');

class AsyncWrapper {
    constructor({ err, req, res, next }) {
        this.Request = req;
        this.Response = res;
        this.Next = next;
        this.Error = err;
    }

    asyncHandler(promise) {
        promise
            .then((data) => {
                const { result, status } = responseFormatter({ data });
                return this.Response
                    .status(status)
                    .json(result);
            }).catch((error) => this.Next(error));
    }

    errorHandler() {
        const { result, status } = responseFormatter({ error: this.Error });
        return this.Response
            .status(status)
            .json(result);
    }
}

module.exports = AsyncWrapper;

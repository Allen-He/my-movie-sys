"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHelper {
    static sendError(error, res) {
        let err;
        if (Array.isArray(error)) {
            err = error.join(';');
        }
        else {
            err = error;
        }
        res.send({
            err,
            data: null
        });
    }
    static sendData(data, res) {
        res.send({
            err: '',
            data
        });
    }
    static sendDataByPagination(data, res) {
        if (data.errors.length > 0) {
            this.sendError(data.errors, res);
        }
        else {
            res.send({
                err: '',
                data: data.data,
                total: data.total
            });
        }
    }
}
exports.default = ResponseHelper;

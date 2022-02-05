"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MovieService_1 = __importDefault(require("../services/MovieService"));
const ResponseHelper_1 = __importDefault(require("./ResponseHelper"));
const movieRouter = express_1.default.Router();
movieRouter.get('/extra', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield MovieService_1.default.getExtraInfo();
    ResponseHelper_1.default.sendData(result, res);
}));
movieRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const moiveId = req.params.id;
        const result = yield MovieService_1.default.findById(moiveId);
        ResponseHelper_1.default.sendData(result, res);
    }
    catch (err) {
        ResponseHelper_1.default.sendData(null, res);
    }
}));
movieRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield MovieService_1.default.find(req.query);
    ResponseHelper_1.default.sendDataByPagination(result, res);
}));
movieRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield MovieService_1.default.add(req.body);
    if (Array.isArray(result)) {
        ResponseHelper_1.default.sendError(result, res);
    }
    else {
        ResponseHelper_1.default.sendData(result, res);
    }
}));
movieRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieId = req.params.id;
        const result = yield MovieService_1.default.edit(movieId, req.body);
        if (result.length > 0) {
            ResponseHelper_1.default.sendError(result, res);
        }
        else {
            ResponseHelper_1.default.sendData(true, res);
        }
    }
    catch (err) {
        ResponseHelper_1.default.sendError('电影id不正确', res);
    }
}));
movieRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieId = req.params.id;
        yield MovieService_1.default.delete(movieId);
        ResponseHelper_1.default.sendData(true, res);
    }
    catch (err) {
        ResponseHelper_1.default.sendError('电影id不正确', res);
    }
}));
exports.default = movieRouter;

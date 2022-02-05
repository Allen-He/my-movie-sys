"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const MovieRouter_1 = __importDefault(require("./routers/MovieRouter"));
const UploadRouter_1 = __importDefault(require("./routers/UploadRouter"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const app = (0, express_1.default)();
app.use((0, connect_history_api_fallback_1.default)());
app.use('/upload', express_1.default.static('public/upload'));
app.use('/', express_1.default.static('public/client'));
app.use(express_1.default.json());
app.use('/api/movie', MovieRouter_1.default);
app.use('/api/upload', UploadRouter_1.default);
app.listen(3000, () => {
    console.log('正在监听3000端口');
});

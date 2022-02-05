"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const ResponseHelper_1 = __importDefault(require("./ResponseHelper"));
const storage = multer_1.default.diskStorage({
    destination: path_1.default.resolve(__dirname, '../../public/upload'),
    filename(req, file, cb) {
        const uniqName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        const extName = path_1.default.extname(file.originalname);
        cb(null, `${uniqName}${extName}`);
    },
});
const inclueExtNames = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 1024 * 1024,
    },
    fileFilter(req, file, cb) {
        const extName = path_1.default.extname(file.originalname);
        if (inclueExtNames.includes(extName)) {
            cb(null, true);
        }
        else {
            cb(new Error('文件类型不正确，仅支持上传图片'));
        }
    }
}).single('imgFile');
const UploadRouter = express_1.default.Router();
UploadRouter.post('/', (req, res) => {
    upload(req, res, err => {
        var _a;
        if (err) {
            ResponseHelper_1.default.sendError(err.message, res);
        }
        else {
            const imgUrl = `/upload/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
            ResponseHelper_1.default.sendData(imgUrl, res);
        }
    });
});
exports.default = UploadRouter;

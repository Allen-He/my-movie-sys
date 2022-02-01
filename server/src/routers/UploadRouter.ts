import express from "express";
import multer from "multer";
import path from "path"
import ResponseHelper from "./ResponseHelper";

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../../public/upload'),
  filename(req, file, cb) {
    const uniqName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const extName = path.extname(file.originalname);
    cb(null, `${uniqName}${extName}`);
  },
});
const inclueExtNames = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // 文件大小限制为1MB
  },
  fileFilter(req, file, cb) {
    const extName = path.extname(file.originalname);
    if(inclueExtNames.includes(extName)) {
      cb(null, true);
    }else {
      cb(new Error('文件类型不正确，仅支持上传图片'));
    }
  }
}).single('imgFile');

const UploadRouter = express.Router();

UploadRouter.post('/', (req, res) => {
  upload(req, res, err => {
    if(err) {
      ResponseHelper.sendError(err.message, res);
    }else {
      const imgUrl = `/upload/${req.file?.filename}`;
      ResponseHelper.sendData(imgUrl, res);
    }
  })
});

export default UploadRouter;

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
const db_1 = require("../db");
const Movie_1 = __importDefault(require("../entities/Movie"));
const SearchCondition_1 = __importDefault(require("../entities/SearchCondition"));
class MovieService {
    static add(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieObj = Movie_1.default.transform(movie);
            const errors = yield movieObj.validateThis();
            if (errors.length > 0) {
                return errors;
            }
            return yield db_1.MovieModel.create(movieObj);
        });
    }
    static edit(id, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieObj = Movie_1.default.transform(movie);
            const errors = yield movieObj.validateThis(true);
            if (errors.length > 0) {
                return errors;
            }
            yield db_1.MovieModel.updateOne({ _id: id }, movie);
            return [];
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.MovieModel.deleteOne({ _id: id });
            return res.deletedCount !== 0;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.MovieModel.findById(id);
        });
    }
    static find(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const conditionObj = SearchCondition_1.default.transform(condition);
            const errors = yield conditionObj.validateThis();
            if (errors.length > 0) {
                return {
                    total: 0,
                    data: [],
                    errors
                };
            }
            const { key, page, limit } = conditionObj;
            const movies = yield db_1.MovieModel.find({
                name: { $regex: new RegExp(key) }
            }).skip((page - 1) * limit).limit(limit).sort({ name: 1 });
            const total = yield db_1.MovieModel.find({
                name: { $regex: new RegExp(key) }
            }).countDocuments();
            return {
                total,
                data: movies,
                errors: []
            };
        });
    }
    static getExtraInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                types: ['喜剧', '爱情', '动作', '枪战', '犯罪', '惊悚', '恐怖', '悬疑', '动画', '家庭', '奇幻', '魔幻', '科幻', '战争', '青春'],
                areas: ['华语', '香港地区', '美国', '欧洲', '韩国', '日本', '泰国', '印度', '其它'],
            };
        });
    }
}
exports.default = MovieService;

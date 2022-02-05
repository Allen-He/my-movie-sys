"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
class Movie extends BaseEntity_1.default {
    constructor() {
        super(...arguments);
        this.isComing = false;
        this.isHot = false;
        this.isClassic = false;
    }
    static transform(plainObject) {
        return super.BaseTransform(Movie, plainObject);
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '电影名称不能为空' }),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], Movie.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '电影类型不能为空' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: '电影类型至少有一个' }),
    (0, class_validator_1.IsArray)({ message: '电影类型必须为数组' }),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], Movie.prototype, "types", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '上映地区不能为空' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: '上映地区至少有一个' }),
    (0, class_validator_1.IsArray)({ message: '上映地区必须为数组' }),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], Movie.prototype, "areas", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '电影时长不能为空' }),
    (0, class_validator_1.Min)(30, { message: '电影时长最短为30分钟' }),
    (0, class_validator_1.Max)(300, { message: '电影时长最长为300分钟' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], Movie.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '“是否即将上映”不能为空' }),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], Movie.prototype, "isComing", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '“是否热映”不能为空' }),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], Movie.prototype, "isHot", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '“是否为经典”不能为空' }),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], Movie.prototype, "isClassic", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], Movie.prototype, "desc", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], Movie.prototype, "poster", void 0);
exports.default = Movie;

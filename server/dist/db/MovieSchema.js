"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
    name: String,
    types: [String],
    areas: [String],
    duration: Number,
    isComing: Boolean,
    isHot: Boolean,
    isClassic: Boolean,
    desc: String,
    poster: String
}, {
    versionKey: false,
});
exports.default = mongoose_1.default.model('Movie', movieSchema);

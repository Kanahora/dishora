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
Object.defineProperty(exports, "__esModule", { value: true });
class Mongo {
    constructor(params) {
        var _a;
        this.model = params.model;
        this.query = params.query;
        this.cache = (_a = params.cache) !== null && _a !== void 0 ? _a : null;
        this.key = this.cache ? JSON.stringify(params.query) : null;
    }
    delete() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.model.findOneAndDelete(this.query);
            (_a = this.cache) === null || _a === void 0 ? void 0 : _a.delete(this.key);
            return data;
        });
    }
    /**
     * Find a document or an array of documents similar to [Model.findOne](https://mongoosejs.com/docs/api.html#model_Model-findOne). Passing in a parameter will return an array of documents that matches the filter similar to [Model.find](https://mongoosejs.com/docs/api.html#model_Model-find).
     * @example
     * new Mongo({ id: "123" }).findOne();
     * new Mongo().find({ isHuman: true });
    */
    find(filter) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            if (filter)
                result = yield this.model.find(filter);
            else {
                result = (_c = (_b = (_a = this.cache) === null || _a === void 0 ? void 0 : _a.get(this.key)) !== null && _b !== void 0 ? _b : yield this.model.findOne(this.query)) !== null && _c !== void 0 ? _c : yield this.model.create(this.query);
                if (!((_d = this.cache) === null || _d === void 0 ? void 0 : _d.get(this.key)))
                    (_e = this.cache) === null || _e === void 0 ? void 0 : _e.set(this.key, result);
            }
            return result;
        });
    }
    update(query) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.model.findOneAndUpdate(this.query, query);
            (_a = this.cache) === null || _a === void 0 ? void 0 : _a.set(this.key, data);
            return data;
        });
    }
}
exports.default = Mongo;
//# sourceMappingURL=mongo.js.map
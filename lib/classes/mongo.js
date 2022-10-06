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
        this.query = params.query;
        this.sQuery = JSON.stringify(this.query);
        this.model = params.model;
        this.cache = params.cache;
    }
    ;
    find() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let data = this.cache.get(this.sQuery);
            if (!data) {
                data = (_a = yield this.model.findOne(this.query)) !== null && _a !== void 0 ? _a : yield new this.model(this.query).save();
                this.cache.set(this.sQuery, data);
            }
            return data;
        });
    }
    update(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.model.findOneAndUpdate(this.query, query, { upsert: true, new: true });
            this.cache.set(this.sQuery, data);
            return data;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.model.findOneAndDelete(this.query);
            this.cache.delete(this.sQuery);
            return data;
        });
    }
}
exports.default = Mongo;
//# sourceMappingURL=mongo.js.map
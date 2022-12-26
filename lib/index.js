"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = exports.createModel = exports.Mongo = exports.Event = exports.Command = exports.Client = void 0;
const client_1 = __importDefault(require("./classes/client"));
exports.Client = client_1.default;
const command_1 = __importDefault(require("./classes/command"));
exports.Command = command_1.default;
const event_1 = __importDefault(require("./classes/event"));
exports.Event = event_1.default;
const mongo_1 = __importDefault(require("./classes/mongo"));
exports.Mongo = mongo_1.default;
const mongoose_1 = require("mongoose");
Object.defineProperty(exports, "createModel", { enumerable: true, get: function () { return mongoose_1.model; } });
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return mongoose_1.Schema; } });
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandBuilder = exports.Collection = exports.Mongo = exports.Event = exports.Command = exports.Client = void 0;
const client_1 = __importDefault(require("./classes/client"));
exports.Client = client_1.default;
const command_1 = __importDefault(require("./classes/command"));
exports.Command = command_1.default;
const event_1 = __importDefault(require("./classes/event"));
exports.Event = event_1.default;
const mongo_1 = __importDefault(require("./classes/mongo"));
exports.Mongo = mongo_1.default;
const discord_js_1 = require("discord.js");
Object.defineProperty(exports, "Collection", { enumerable: true, get: function () { return discord_js_1.Collection; } });
Object.defineProperty(exports, "SlashCommandBuilder", { enumerable: true, get: function () { return discord_js_1.SlashCommandBuilder; } });
//# sourceMappingURL=index.js.map
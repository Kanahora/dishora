"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Discord = __importStar(require("discord.js"));
const path = __importStar(require("path"));
const distube_1 = __importDefault(require("distube"));
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = require("fs");
const command_1 = __importDefault(require("./command"));
const event_1 = __importDefault(require("./event"));
const discord_js_1 = require("discord.js");
class Client extends Discord.Client {
    constructor(options) {
        super(options);
        this.commands = new Discord.Collection();
        this.events = new Discord.Collection();
        this.distube = null;
        if (options.music) {
            this.distube = new distube_1.default(this, {
                leaveOnStop: false,
                leaveOnFinish: true,
                emitNewSongOnly: true,
                emitAddListWhenCreatingQueue: false,
                emitAddSongWhenCreatingQueue: false
            });
        }
        ;
    }
    ;
    init(version) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.register(`${path.dirname(require.main.filename)}/${(_b = (_a = this.options.directories) === null || _a === void 0 ? void 0 : _a.commands) !== null && _b !== void 0 ? _b : "commands"}`);
            yield this.register(`${path.dirname(require.main.filename)}/${(_d = (_c = this.options.directories) === null || _c === void 0 ? void 0 : _c.events) !== null && _d !== void 0 ? _d : "events"}`);
            // Attempt connection to MongoDB 
            yield this.mongo();
            // Successful discord login
            this.once("ready", function (client) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (client.commands.size)
                        yield client.loadSlashCommands(version);
                    console.log(`Successfully logged in as \u001b[32m${client.user.tag}\u001b[0m!`);
                });
            });
            yield this.login(this.options.token);
        });
    }
    ;
    mongo() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.options.mongo)
                return;
            yield mongoose_1.default.connect(this.options.mongo);
            console.log("Connected to \u001b[32mMongoDB\u001b[0m!");
        });
    }
    ;
    register(dir) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const folder = yield fs_1.promises.readdir(path.join(dir)).catch(() => []);
            for (const file of folder) {
                const stat = yield fs_1.promises.lstat(path.join(dir, file));
                if (stat.isDirectory())
                    this.register(path.join(dir, file));
                else if (file.endsWith('.ts') || file.endsWith('.js')) {
                    const data = yield Promise.resolve().then(() => __importStar(require(`${path.join(dir, file)}`)));
                    const module = (_a = data.default) !== null && _a !== void 0 ? _a : data;
                    if (module instanceof command_1.default)
                        this.commands.set(module.data.name, module);
                    else if (module instanceof event_1.default) {
                        if (!module.music)
                            this.on(module.event, module.on.bind(null, this));
                        else
                            this.distube.on(module.event, module.on.bind(null, this));
                    }
                    ;
                }
                ;
            }
            ;
        });
    }
    ;
    loadSlashCommands(version) {
        return __awaiter(this, void 0, void 0, function* () {
            // Clearing application commands
            console.log(" - Clearing existing \u001b[34;1mapplication (/) commands\u001b[0m...");
            const rest = new discord_js_1.REST({ version }).setToken(this.options.token);
            console.log(" - Previous \u001b[34;1mapplication (/) commands \u001b[0mhave been cleared! Reloading now...");
            // Reloading application commands
            const commands = this.commands.map(command => command.data);
            yield rest.put(discord_js_1.Routes.applicationCommands(this.user.id), { body: commands });
            console.log(" - Successfully reloaded \u001b[34;1mapplication (/) commands\u001b[0m!");
        });
    }
}
exports.default = Client;
;
//# sourceMappingURL=client.js.map
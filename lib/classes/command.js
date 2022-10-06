"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Command {
    constructor(query) {
        var _a;
        this.data = query.data;
        this.cooldown = (_a = query.cooldown) !== null && _a !== void 0 ? _a : null;
        this.cooldowns = this.cooldown ? new discord_js_1.Collection() : null;
        this.run = query.run;
    }
    ;
}
exports.default = Command;
;
//# sourceMappingURL=command.js.map
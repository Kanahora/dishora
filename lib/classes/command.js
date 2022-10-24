"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Command {
    constructor(query) {
        var _a;
        for (const prop in query)
            this[prop] = (_a = query[prop]) !== null && _a !== void 0 ? _a : null;
        this.cooldowns = this.cooldown ? new discord_js_1.Collection() : null;
    }
    ;
}
exports.default = Command;
;
//# sourceMappingURL=command.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Event {
    constructor(query) {
        var _a;
        this.event = query.event;
        this.music = (_a = query.music) !== null && _a !== void 0 ? _a : false;
        this.on = query.on;
    }
    ;
}
exports.default = Event;
;
//# sourceMappingURL=event.js.map
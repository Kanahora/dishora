import * as Discord from "discord.js";
import type { DisTubeEvents } from "distube";
import { EventConstructor, EventOn } from "../typings/types";

export default class Event implements EventConstructor {
    public event: keyof Discord.ClientEvents | keyof DisTubeEvents;
    public music?: boolean;
    public on: EventOn;
    constructor(query: EventConstructor) {
        this.event = query.event;
        this.music = query.music ?? false;
        this.on = query.on;
    };
};
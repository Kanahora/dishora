import type { ClientEvents } from "discord.js";
import type { DisTubeEvents } from "distube";
import { EventConstructor, On } from "../typings/types";

export default class Event<T extends keyof DisTubeEvents | keyof ClientEvents> implements EventConstructor<T> {
    public event: T;
    public music?: boolean;
    public on: On<T>;
    constructor(query: EventConstructor<T>) {
        this.event = query.event;
        this.music = query.music ?? false;
        this.on = query.on;
    };
};
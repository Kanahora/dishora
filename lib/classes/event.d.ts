import type { ClientEvents } from "discord.js";
import type { DisTubeEvents } from "distube";
import { EventConstructor, On } from "../typings/types";
export default class Event<T extends keyof DisTubeEvents | keyof ClientEvents> implements EventConstructor<T> {
    event: T;
    music?: boolean;
    on: On<T>;
    constructor(query: EventConstructor<T>);
}

import * as Discord from "discord.js";
import type { DisTubeEvents } from "distube";
import { EventConstructor, EventOn } from "../typings/types";
export default class Event implements EventConstructor {
    event: keyof Discord.ClientEvents | keyof DisTubeEvents;
    music?: boolean;
    on: EventOn;
    constructor(query: EventConstructor);
}

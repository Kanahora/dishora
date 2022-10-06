import * as Discord from "discord.js";
import DisTube from "distube";
import { ClientConstructor, ClientOptions } from "../typings/types";
import Command from "./command";
import Event from "./event";
export default class Class extends Discord.Client implements ClientConstructor {
    commands: Discord.Collection<string, Command>;
    events: Discord.Collection<string, Event>;
    options: ClientOptions;
    distube?: DisTube;
    constructor(options: ClientOptions);
    init(): Promise<void>;
    private mongo;
    private register;
}

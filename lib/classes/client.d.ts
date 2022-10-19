import * as Discord from "discord.js";
import DisTube, { DisTubeEvents } from "distube";
import { ClientConstructor, ClientOptions } from "../typings/types";
import Command from "./command";
import Event from "./event";
export default class Client extends Discord.Client implements ClientConstructor {
    commands: Discord.Collection<string, Command>;
    events: Discord.Collection<string, Event<keyof Discord.ClientEvents | keyof DisTubeEvents>>;
    options: ClientOptions;
    distube?: DisTube;
    constructor(options: ClientOptions);
    init(version: string): Promise<void>;
    private mongo;
    private register;
    loadSlashCommands(version: string): Promise<void>;
}

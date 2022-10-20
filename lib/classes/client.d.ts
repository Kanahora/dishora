import Discord, { Collection, ClientEvents, IntentsBitField } from "discord.js";
import DisTube, { DisTubeEvents } from "distube";
import { ClientConstructor, ClientOptions } from "../typings/types";
import Command from "./command";
import Event from "./event";
export default class Client extends Discord.Client implements ClientConstructor {
    commands: Collection<string, Command>;
    events: Collection<string, Event<keyof ClientEvents | keyof DisTubeEvents>>;
    options: Omit<ClientOptions, "intents"> & {
        intents: IntentsBitField;
    };
    distube?: DisTube;
    constructor(options: ClientOptions);
    init(version: string): Promise<void>;
    private mongo;
    private register;
    loadSlashCommands(version: string): Promise<void>;
}

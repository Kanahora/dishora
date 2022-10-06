import * as Discord from "discord.js";
import * as path from "path";
import DisTube, { DisTubeEvents } from "distube";
import mongoose from "mongoose";
import { promises as fs } from "fs";
import { ClientConstructor, ClientOptions } from "../typings/types";
import Command from "./command";
import Event from "./event";

export default class Class extends Discord.Client implements ClientConstructor {
    public commands: Discord.Collection<string, Command> = new Discord.Collection();
    public events: Discord.Collection<string, Event> = new Discord.Collection();
    public options: ClientOptions;
    public distube?: DisTube = null;
    constructor(options: ClientOptions) {
        super(options);
        if (options.music) {
            this.distube = new DisTube(this, {
                leaveOnStop: false,
                leaveOnFinish: true,
                emitNewSongOnly: true,
                emitAddListWhenCreatingQueue: false,
                emitAddSongWhenCreatingQueue: false
            });
        };
    };
    public async init(): Promise<void> {
        if (this.options.directories?.commands) await this.register(`${path.dirname(require.main.filename)}/${this.options.directories.commands}`);
        if (this.options.directories?.events) await this.register(`${path.dirname(require.main.filename)}/${this.options.directories.events}`)
        await this.mongo();
        await this.login(this.options.token);
    };
    private async mongo(): Promise<void> {
        if (!this.options.mongo) return;
        console.log("Connecting to MongoDB.");
        await mongoose.connect(this.options.mongo);
        console.log("Connected to MongoDB.");
    };
    private async register(dir: string) {
        const folder = await fs.readdir(path.join(dir));
        for (const file of folder) {
            const stat = await fs.lstat(path.join(dir, file));
            if (stat.isDirectory()) this.register(path.join(dir, file));
            else if (file.endsWith('.ts') || file.endsWith('.js'))  {
                const data = await import(`${path.join(dir, file)}`);
                const module = data.default ?? data;
                if (module instanceof Command) this.commands.set(module.data.name, module);
                else if (module instanceof Event) {
                    if (!module.music) this.on(module.event as keyof Discord.ClientEvents, module.on.bind(null, this));
                    else this.distube.on(module.event as keyof DisTubeEvents, module.on.bind(null, this));
                };
            };
        };
    };
};
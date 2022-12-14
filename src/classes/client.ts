import Discord, { Collection, ClientEvents, IntentsBitField } from "discord.js";
import path from "path";
import DisTube, { DisTubeEvents } from "distube";
import mongoose from "mongoose";
import { promises as fs } from "fs";
import { ClientConstructor, ClientOptions } from "../typings/types";
import Command from "./command";
import Event from "./event";
import { REST, Routes } from "discord.js";

export default class Client extends Discord.Client implements ClientConstructor {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event<keyof ClientEvents | keyof DisTubeEvents>> = new Collection();
    public options: Omit<ClientOptions, "intents"> & { intents: IntentsBitField; };
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
    public async init(version: string) {
        await this.register(`${path.dirname(require.main.filename)}/${this.options.directories?.commands ?? "commands"}`);
        await this.register(`${path.dirname(require.main.filename)}/${this.options.directories?.events ?? "events"}`);
        // Attempt connection to MongoDB 
        await this.mongo();
        // Successful discord login
        this.once("ready", async function (client) {
            if (this.commands.size) await this.loadSlashCommands(version);
            console.log(`Successfully logged in as \u001b[32m${client.user.tag}\u001b[0m!`);
        });
        await this.login(this.options.token);
    };
    private async mongo() {
        if (!this.options.mongo) return;
        await mongoose.connect(this.options.mongo);
        console.log("Connected to \u001b[32mMongoDB\u001b[0m!");
    };
    private async register(dir: string) {
        const folder = await fs.readdir(path.join(dir)).catch(() => []);
        for (const file of folder) {
            const stat = await fs.lstat(path.join(dir, file));
            if (stat.isDirectory()) this.register(path.join(dir, file));
            else if (file.endsWith('.ts') || file.endsWith('.js')) {
                const data = await import(`${path.join(dir, file)}`);
                const module = data.default ?? data;
                if (module instanceof Command) this.commands.set(module.data.name, module);
                else if (module instanceof Event) {
                    if (!module.music) this.on(module.event as keyof ClientEvents, module.on.bind(null, this));
                    else this.distube.on(module.event as keyof DisTubeEvents, module.on.bind(null, this));
                };
            };
        };
    };
    public async loadSlashCommands(version: string) {
        // Clearing application commands
        console.log(" - Clearing existing \u001b[34;1mapplication (/) commands\u001b[0m...");
        const rest = new REST({ version }).setToken(this.options.token);
        console.log(" - Previous \u001b[34;1mapplication (/) commands \u001b[0mhave been cleared! Reloading now...");
        // Reloading application commands
        const commands = this.commands.map(command => command.data);
        await rest.put(Routes.applicationCommands(this.user.id), { body: commands });
        console.log(" - Successfully reloaded \u001b[34;1mapplication (/) commands\u001b[0m!");
    }
};
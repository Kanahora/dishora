import Discord, { Collection, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, ChatInputCommandInteraction, ClientEvents } from "discord.js";
import Client from "../classes/client";
import Command from "../classes/command";
import type { DisTubeEvents, DisTube } from "distube";
import { FilterQuery, Model, Document } from "mongoose";
export interface ClientConstructor {
    commands: Collection<string, Command>;
    options: ClientOptions;
    distube?: DisTube;
}
export interface ClientOptions extends Discord.ClientOptions {
    mongo?: string;
    music?: boolean;
    directories?: ClientOptionDirectories;
    token: string;
}
interface ClientOptionDirectories {
    commands?: string;
    events?: string;
}
export interface CommandConstructor {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
    cooldown?: number;
    cooldowns?: Collection<string, number>;
    run: CommandRun;
}
export interface CommandInteraction extends ChatInputCommandInteraction<"cached"> {
    client: Client;
}
export interface CommandRun {
    (interaction: CommandInteraction): any;
}
export interface EventConstructor {
    event: keyof ClientEvents | keyof DisTubeEvents;
    music?: boolean;
    on: EventOn;
}
export interface EventOn {
    (client: Client, ...args: any[]): any;
}
export interface MongoConstructor {
    query: FilterQuery<unknown>;
    model: Model<unknown, unknown, unknown, {}, any>;
    cache: Collection<string, Document>;
}
export {};

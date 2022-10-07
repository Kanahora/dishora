import Discord, {
    Collection,
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
    ChatInputCommandInteraction,
    ClientEvents
} from "discord.js";
import Client from "../classes/client";
import Command from "../classes/command";
import type { DisTubeEvents, DisTube } from "distube";
import { FilterQuery, Model, Document } from "mongoose";

// #region Client
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
// #endregion

// #region Command
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
    (interaction: CommandInteraction);
}
// #endregion

// #region Event
export interface EventConstructor {
    event: keyof ClientEvents | keyof DisTubeEvents;
    music?: boolean;
    on: EventOn;
}
export interface EventOn {
    (client: Client, ...args: any[]);
}
// #endregion

// #region Mongo
export interface MongoConstructor {
    query: FilterQuery<unknown>;
    model: MongoModel;
    cache: Collection<string, Document>;
}
export type MongoCache = Collection<string, Document>;
export type MongoModel = Model<any> | Model<unknown, unknown, unknown, {}, any>;
// #endregion
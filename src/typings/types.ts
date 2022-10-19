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
    run: Run;
}
export interface Run {
    (interaction: ChatInputCommandInteraction<"cached">);
}
// #endregion

// #region Event
export interface EventConstructor<T extends keyof DisTubeEvents | keyof ClientEvents> {
    event: T;
    music?: boolean;
    on: On<T>;
}
export interface On<T extends keyof DisTubeEvents | keyof ClientEvents> {
    (client: Client, ...args: DisTubeEvents[T & keyof DisTubeEvents] | ClientEvents[T & keyof ClientEvents]);
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
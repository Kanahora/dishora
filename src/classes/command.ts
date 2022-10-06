import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, Collection } from "discord.js";
import { CommandConstructor, CommandRun } from "../typings/types";

export default class Command implements CommandConstructor {
    public data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
    public cooldown?: number;
    public cooldowns?: Collection<string, number>;
    public run: CommandRun;
    constructor(query: CommandConstructor) {
        this.data = query.data;
        this.cooldown = query.cooldown ?? null;
        this.cooldowns = this.cooldown ? new Collection() : null;
        this.run = query.run;
    };
};
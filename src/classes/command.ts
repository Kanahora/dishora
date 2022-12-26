import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, Collection } from "discord.js";
import { CommandConstructor, Run } from "../typings/types";

export default class Command implements CommandConstructor {
    public data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
    public cooldown?: number;
    public cooldowns?: Collection<string, number>;
    public run: Run;
    constructor(query: CommandConstructor) {
        for (const prop in query) this[prop] = query[prop] ?? null;
        this.cooldowns = this.cooldown ? new Collection() : null;
    };
};
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, Collection } from "discord.js";
import { CommandConstructor, CommandRun } from "../typings/types";
export default class Command implements CommandConstructor {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
    cooldown?: number;
    cooldowns?: Collection<string, number>;
    run: CommandRun;
    constructor(query: CommandConstructor);
}

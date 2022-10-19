import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, Collection } from "discord.js";
import { CommandConstructor, Run } from "../typings/types";
export default class Command implements CommandConstructor {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
    cooldown?: number;
    cooldowns?: Collection<string, number>;
    run: Run;
    constructor(query: CommandConstructor);
}

import { FilterQuery, Document, Model, UpdateQuery } from "mongoose";
import { Collection } from "discord.js";
import { MongoConstructor } from "../typings/types";
export default class Mongo implements MongoConstructor {
    query: FilterQuery<unknown>;
    private sQuery;
    model: Model<unknown, unknown, unknown, {}, any>;
    cache: Collection<string, Document>;
    constructor(params: MongoConstructor);
    find(): Promise<Document<any, any, any>>;
    update(query: UpdateQuery<unknown>): Promise<Document<unknown, any, unknown> & Required<{
        _id: unknown;
    }>>;
    delete(): Promise<Document<unknown, any, unknown> & Required<{
        _id: unknown;
    }>>;
}

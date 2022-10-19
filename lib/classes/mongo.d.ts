import { FilterQuery, Model, UpdateQuery, Document } from "mongoose";
import { MongoCache, MongoConstructor } from "../typings/types";
export default class Mongo implements MongoConstructor {
    query: FilterQuery<unknown>;
    private sQuery;
    model: Model<unknown, unknown, unknown, {}, any>;
    cache: MongoCache;
    constructor(params: MongoConstructor);
    find(): Promise<Document>;
    update(query: UpdateQuery<unknown>): Promise<Document>;
    delete(): Promise<Document>;
}

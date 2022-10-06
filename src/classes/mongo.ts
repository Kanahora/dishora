import { FilterQuery, Document, Model, UpdateQuery } from "mongoose";
import { Collection } from "discord.js";
import { MongoConstructor } from "../typings/types";

export default class Mongo implements MongoConstructor {
    public query: FilterQuery<unknown>;
    private sQuery: string;
    public model: Model<unknown, unknown, unknown, {}, any>;
    public cache: Collection<string, Document>;
    constructor(params: MongoConstructor) {
        this.query = params.query;
        this.sQuery = JSON.stringify(this.query);
        this.model = params.model;
        this.cache = params.cache;
    };
    public async find() {
        let data = this.cache.get(this.sQuery);
        if (!data) {
            data = await this.model.findOne(this.query) ?? await new this.model(this.query).save();
            this.cache.set(this.sQuery, data);
        }
        return data;
    }
    public async update(query: UpdateQuery<unknown>) {
        const data = await this.model.findOneAndUpdate(this.query, query, { upsert: true, new: true });
        this.cache.set(this.sQuery, data);
        return data;
    }
    public async delete() {
        const data = await this.model.findOneAndDelete(this.query);
        this.cache.delete(this.sQuery);
        return data;
    }
}
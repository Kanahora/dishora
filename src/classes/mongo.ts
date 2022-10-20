// import { FilterQuery, Model, UpdateQuery, Document, HydratedDocument } from 'mongoose';
/*import { MongoCache, MongoConstructor } from "../typings/types";

export default class Mongo implements MongoConstructor {
    public query: FilterQuery<unknown>;
    private sQuery: string;
    public model: Model<unknown, unknown, unknown, {}, any>;
    public cache: MongoCache;
    constructor(params: MongoConstructor) {
        this.query = params.query;
        this.sQuery = JSON.stringify(this.query);
        this.model = params.model;
        this.cache = params.cache;
    };
    public async find(): Promise<Document> {
        let data = this.cache.get(this.sQuery);
        if (!data) {
            data = await this.model.findOne(this.query) ?? await new this.model(this.query).save();
            this.cache.set(this.sQuery, data);
        }
        return data;
    }
    public async update(query: UpdateQuery<unknown>): Promise<Document> {
        const data = await this.model.findOneAndUpdate(this.query, query, { upsert: true, new: true });
        this.cache.set(this.sQuery, data);
        return data;
    }
    public async delete(): Promise<Document> {
        const data = await this.model.findOneAndDelete(this.query);
        this.cache.delete(this.sQuery);
        return data;
    }
}*/
import { FilterQuery, HydratedDocument, Model, UpdateQuery } from "mongoose";
import { Cache, MongoConstructor } from "../typings/types";

export default class Mongo<T> implements MongoConstructor<T> {
    public cache?: Cache<T>;
    public model: Model<T>;
    public query: FilterQuery<T>;
    private key?: string;
    constructor(params: MongoConstructor<T>) {
        this.model = params.model;
        this.query = params.query;
        this.cache = params.cache ?? null;
        this.key = this.cache ? JSON.stringify(params.query) : null;
    }
    public async delete() {
        const data = await this.model.findOneAndDelete(this.query);
        this.cache?.delete(this.key);
        return data;
    }
    /** 
     * Find a document or an array of documents similar to [Model.findOne](https://mongoosejs.com/docs/api.html#model_Model-findOne). Passing in a parameter will return an array of documents that matches the filter similar to [Model.find](https://mongoosejs.com/docs/api.html#model_Model-find). 
     * @example
     * new Mongo({ id: "123" }).findOne();
     * new Mongo().find({ isHuman: true });
    */
    public async find(filter?: FilterQuery<T>) {
        let result: HydratedDocument<T> | HydratedDocument<T>[];
        if (filter) result = await this.model.find(filter);
        else {
            result = this.cache?.get(this.key) ?? await this.model.findOne(this.query) ?? await this.model.create(this.query);
            if (!this.cache?.get(this.key)) this.cache?.set(this.key, result as HydratedDocument<T>);
        }
        return result;
    }
    public async update(query: UpdateQuery<T>): Promise<HydratedDocument<T>> {
        const data = await this.model.findOneAndUpdate(this.query, query);
        this.cache?.set(this.key, data);
        return data;
    }
}
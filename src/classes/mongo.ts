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
    /** 
     * Deletes a single document similar to [db.collection.findOneAndDelete()](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndDelete/). 
     * @example new Mongo({ query: { id: "123" }, model: ... }).delete();
    */
    public async delete(): Promise<HydratedDocument<T>> {
        const data = await this.model.findOneAndDelete(this.query);
        this.cache?.delete(this.key);
        return data;
    }
    /** 
     * Find a document or an array of documents similar to [db.collection.findOne()](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/). Passing in a parameter will return an array of documents that matches the filter similar to [db.collection.find()](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/). 
     * @example
     * new Mongo({ query: { isHuman: true }, model: ... }).findOne();
     * new Mongo({ model: ... }).find({ isHuman: true });
    */
    public async find(filter?: FilterQuery<T>): Promise<HydratedDocument<T> | HydratedDocument<T>[]> {
        let result: HydratedDocument<T> | HydratedDocument<T>[];
        if (filter) result = await this.model.find(filter);
        else {
            result = this.cache?.get(this.key) ?? await this.model.findOne(this.query) ?? await new this.model(this.query).save() as HydratedDocument<T>;
            this.cache?.set(this.key, result as HydratedDocument<T>);
        }
        return result;
    }
    /**
     * Updates a single document similar to [db.collection.finOneAndUpdate()](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate/).
     * @example new Mongo({ query: { id: "123" }, model: ... }).update({ isHuman: false });
     */
    public async update(query: UpdateQuery<T>): Promise<HydratedDocument<T>> {
        const data = await this.model.findOneAndUpdate(this.query, query, { upsert: true, new: true });
        this.cache?.set(this.key, data);
        return data;
    }
}
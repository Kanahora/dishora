import { FilterQuery, HydratedDocument, Model, UpdateQuery } from "mongoose";
import { Cache, MongoConstructor } from "../typings/types";
export default class Mongo<T> implements MongoConstructor<T> {
    cache?: Cache<T>;
    model: Model<T>;
    query: FilterQuery<T>;
    private key?;
    constructor(params: MongoConstructor<T>);
    /**
     * Deletes a single document similar to [db.collection.findOneAndDelete()](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndDelete/).
     * @example new Mongo({ query: { id: "123" }, model: ... }).delete();
    */
    delete(): Promise<HydratedDocument<T, {}, {}>>;
    /**
     * Find a document or an array of documents similar to [db.collection.findOne()](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/). Passing in a parameter will return an array of documents that matches the filter similar to [db.collection.find()](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/).
     * @example
     * new Mongo({ query: { isHuman: true }, model: ... }).findOne();
     * new Mongo({ model: ... }).find({ isHuman: true });
    */
    find(filter?: FilterQuery<T>): Promise<HydratedDocument<T, {}, {}> | HydratedDocument<T, {}, {}>[]>;
    /**
     * Updates a single document similar to [db.collection.finOneAndUpdate()](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate/).
     * @example new Mongo({ query: { id: "123" }, model: ... }).update({ isHuman: false });
     */
    update(query: UpdateQuery<T>): Promise<HydratedDocument<T>>;
}
